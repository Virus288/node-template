import chalk from 'chalk';
import errLogger from './logger.js';
import * as enums from '../../enums/index.js';

/**
 * Log passed data and save it in local files.
 */
export default class Log {
  private static _counter: { target: string; start: number }[] = [];

  private static get counter(): { target: string; start: number }[] {
    return this._counter;
  }

  private static set counter(val: { target: string; start: number }[]) {
    this._counter = val;
  }

  private static getDate(): string {
    const date = new Date();
    const h = date.getHours().toString().length === 1 ? `0${date.getHours()}:` : `${date.getHours()}:`;
    const m = date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}:` : `${date.getMinutes()}:`;
    const s = date.getSeconds().toString().length === 1 ? `0${date.getSeconds()}` : `${date.getSeconds()}`;
    return `${h}${m}${s}`;
  }

  static error(target: string, ...messages: unknown[]): void {
    messages.forEach((m) => {
      Log.buildLog(() => chalk.red(`Log.ERROR: ${target}`), enums.ELogTypes.Error, m);
    });
  }

  static warn(target: string, ...messages: unknown[]): void {
    messages.forEach((m) => {
      Log.buildLog(() => chalk.yellow(`Log.WARN: ${target}`), enums.ELogTypes.Warn, m);
    });
  }

  static log(target: string, ...messages: unknown[]): void {
    messages.forEach((m) => {
      Log.buildLog(() => chalk.blue(`Log.LOG: ${target}`), enums.ELogTypes.Log, m);
    });
  }

  static debug(target: string, ...messages: unknown[]): void {
    messages.forEach((m) => {
      Log.buildLog(() => chalk.magenta(`Log.Debug: ${target}`), enums.ELogTypes.Debug, m);
    });
  }

  static trace(target: string, ...messages: unknown[]): void {
    console.trace(chalk.yellowBright(target));
    messages.forEach((m) => {
      Log.buildLog(() => chalk.yellowBright(`Log.TRACE: ${target}`), enums.ELogTypes.Log, m);
    });
  }

  static time(target: string, ...messages: unknown[]): void {
    Log.counter.push({ target, start: Date.now() });
    messages.forEach((m) => {
      Log.buildLog(() => chalk.bgBlue(`Log.TIME: ${target}`), enums.ELogTypes.Log, m);
    });
  }

  static endTime(target: string, ...messages: unknown[]): void {
    const localTarget = Log.counter.filter((e) => e.target === target);
    if (localTarget.length === 0) {
      Log.buildLog(() => chalk.bgBlue(`Log.TIME: ${target}`), enums.ELogTypes.Log, 'Could not find time start');
    } else {
      Log.counter = Log.counter.filter((e) => e.target !== localTarget[0]!.target && e.start !== localTarget[0]!.start);
      Log.buildLog(
        () => chalk.bgBlue(`Log.TIME: ${target}`),
        enums.ELogTypes.Log,
        `Time passed: ${((Date.now() - localTarget[0]!.start) / 1000).toFixed(2)}s`,
      );
    }

    messages.forEach((m) => {
      Log.buildLog(() => chalk.bgBlue(`Log.TIME: ${target}`), enums.ELogTypes.Log, m);
    });
  }

  private static buildLog(color: () => string, type: enums.ELogTypes, message: unknown): void {
    console.info(`[${chalk.gray(Log.getDate())}] ${color()} ${Log.toString(message)}`);
    Log.saveLog(message, type);
  }

  private static saveLog(message: unknown, type: enums.ELogTypes): void {
    const mess = typeof message !== 'string' ? JSON.stringify(message, null, 2) : message;

    switch (type) {
      case enums.ELogTypes.Warn:
        errLogger.warn(mess);
        return;
      case enums.ELogTypes.Error:
        errLogger.error(mess);
        return;
      case enums.ELogTypes.Log:
      default:
        errLogger.info(mess);
    }
  }

  private static toString(message: unknown): string {
    return typeof message !== 'string' ? JSON.stringify(message, null, 2) : message;
  }
}
