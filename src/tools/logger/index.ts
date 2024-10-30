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

  static decorateError<This, Args extends unknown[], Return>(targetMessage: string, ...messages: unknown[]) {
    return function (
      target: (this: This, ...args: Args) => Return | Promise<Return>,
      _context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return | Promise<Return>>,
    ): (this: This, ...args: Args) => Promise<Return> {
      return async function (this: This, ...args: Args): Promise<Return> {
        // Borked rule in this example
        // eslint-disable-next-line no-invalid-this
        const result = await target.apply(this, args);

        messages.forEach((m) => {
          Log.buildLog(() => chalk.red(`Log.ERROR: ${targetMessage}`), enums.ELogTypes.Error, m);
        });
        return result;
      };
    };
  }

  static decorateSyncError<This, Args extends unknown[], Return>(targetMessage: string, ...messages: unknown[]) {
    return function (
      target: (this: This, ...args: Args) => Return,
      _context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
    ): (this: This, ...args: Args) => Return {
      return function (this: This, ...args: Args): Return {
        // Borked rule in this example
        // eslint-disable-next-line no-invalid-this
        const result = target.apply(this, args);

        messages.forEach((m) => {
          Log.buildLog(() => chalk.red(`Log.ERROR: ${targetMessage}`), enums.ELogTypes.Error, m);
        });
        return result;
      };
    };
  }

  static warn(target: string, ...messages: unknown[]): void {
    messages.forEach((m) => {
      Log.buildLog(() => chalk.yellow(`Log.WARN: ${target}`), enums.ELogTypes.Warn, m);
    });
  }

  static decorateWarn<This, Args extends unknown[], Return>(targetMessage: string, ...messages: unknown[]) {
    return function (
      target: (this: This, ...args: Args) => Return | Promise<Return>,
      _context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return | Promise<Return>>,
    ): (this: This, ...args: Args) => Promise<Return> {
      return async function (this: This, ...args: Args): Promise<Return> {
        // Borked rule in this example
        // eslint-disable-next-line no-invalid-this
        const result = await target.apply(this, args);

        messages.forEach((m) => {
          Log.buildLog(() => chalk.yellow(`Log.WARN: ${targetMessage}`), enums.ELogTypes.Warn, m);
        });
        return result;
      };
    };
  }

  static decorateSyncWarn<This, Args extends unknown[], Return>(targetMessage: string, ...messages: unknown[]) {
    return function (
      target: (this: This, ...args: Args) => Return,
      _context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
    ): (this: This, ...args: Args) => Return {
      return function (this: This, ...args: Args): Return {
        // Borked rule in this example
        // eslint-disable-next-line no-invalid-this
        const result = target.apply(this, args);

        messages.forEach((m) => {
          Log.buildLog(() => chalk.yellow(`Log.WARN: ${targetMessage}`), enums.ELogTypes.Warn, m);
        });
        return result;
      };
    };
  }

  static log(target: string, ...messages: unknown[]): void {
    messages.forEach((m) => {
      Log.buildLog(() => chalk.blue(`Log.LOG: ${target}`), enums.ELogTypes.Log, m);
    });
  }

  static decorateLog<This, Args extends unknown[], Return>(targetMessage: string, ...messages: unknown[]) {
    return function (
      target: (this: This, ...args: Args) => Return | Promise<Return>,
      _context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return | Promise<Return>>,
    ): (this: This, ...args: Args) => Promise<Return> {
      return async function (this: This, ...args: Args): Promise<Return> {
        // Borked rule in this example
        // eslint-disable-next-line no-invalid-this
        const result = await target.apply(this, args);

        messages.forEach((m) => {
          Log.buildLog(() => chalk.blue(`Log.LOG: ${targetMessage}`), enums.ELogTypes.Log, m);
        });
        return result;
      };
    };
  }

  static decorateSyncLog<This, Args extends unknown[], Return>(targetMessage: string, ...messages: unknown[]) {
    return function (
      target: (this: This, ...args: Args) => Return,
      _context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
    ): (this: This, ...args: Args) => Return {
      return function (this: This, ...args: Args): Return {
        // Borked rule in this example
        // eslint-disable-next-line no-invalid-this
        const result = target.apply(this, args);

        messages.forEach((m) => {
          Log.buildLog(() => chalk.blue(`Log.LOG: ${targetMessage}`), enums.ELogTypes.Log, m);
        });
        return result;
      };
    };
  }

  static debug(target: string, ...messages: unknown[]): void {
    messages.forEach((m) => {
      Log.buildLog(() => chalk.magenta(`Log.Debug: ${target}`), enums.ELogTypes.Debug, m);
    });
  }

  static decorateDebug<This, Args extends unknown[], Return>(targetMessage: string, ...messages: unknown[]) {
    return function (
      target: (this: This, ...args: Args) => Promise<Return>,
      _context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Promise<Return>>,
    ): (this: This, ...args: Args) => Promise<Return> {
      return async function (this: This, ...args: Args): Promise<Return> {
        // Borked rule in this example
        // eslint-disable-next-line no-invalid-this
        const result = await target.apply(this, args);

        messages.forEach((m) => {
          Log.buildLog(() => chalk.magenta(`Log.Debug: ${targetMessage}`), enums.ELogTypes.Debug, m);
        });
        return result;
      };
    };
  }

  static decorateSyncDebug<This, Args extends unknown[], Return>(targetMessage: string, ...messages: unknown[]) {
    return function (
      target: (this: This, ...args: Args) => Return,
      _context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
    ): (this: This, ...args: Args) => Return {
      return function (this: This, ...args: Args): Return {
        // Borked rule in this example
        // eslint-disable-next-line no-invalid-this
        const result = target.apply(this, args);

        messages.forEach((m) => {
          Log.buildLog(() => chalk.magenta(`Log.Debug: ${targetMessage}`), enums.ELogTypes.Debug, m);
        });
        return result;
      };
    };
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

  static decorateTime<This, Args extends unknown[], Return>(targetMessage: string, ...messages: unknown[]) {
    return function (
      target: (this: This, ...args: Args) => Return | Promise<Return>,
      _context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return | Promise<Return>>,
    ): (this: This, ...args: Args) => Promise<Return> {
      return async function (this: This, ...args: Args): Promise<Return> {
        const start = Date.now();

        messages.forEach((m) => {
          Log.buildLog(() => chalk.bgBlue(`Log.TIME: ${targetMessage}`), enums.ELogTypes.Log, m);
        });

        // Borked rule in this example
        // eslint-disable-next-line no-invalid-this
        const result = await target.apply(this, args);

        Log.buildLog(
          () => chalk.bgBlue(`Log.TIME: ${targetMessage}`),
          enums.ELogTypes.Log,
          `Time passed: ${((Date.now() - start) / 1000).toFixed(2)}s`,
        );
        return result;
      };
    };
  }

  static decorateSyncTime<This, Args extends unknown[], Return>(targetMessage: string, ...messages: unknown[]) {
    return function (
      target: (this: This, ...args: Args) => Return,
      _context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
    ): (this: This, ...args: Args) => Return {
      return function (this: This, ...args: Args): Return {
        const start = Date.now();

        messages.forEach((m) => {
          Log.buildLog(() => chalk.bgBlue(`Log.TIME: ${targetMessage}`), enums.ELogTypes.Log, m);
        });

        // Borked rule in this example
        // eslint-disable-next-line no-invalid-this
        const result = target.apply(this, args);

        Log.buildLog(
          () => chalk.bgBlue(`Log.TIME: ${targetMessage}`),
          enums.ELogTypes.Log,
          `Time passed: ${((Date.now() - start) / 1000).toFixed(2)}s`,
        );
        return result;
      };
    };
  }

  static trace(target: string, ...messages: unknown[]): void {
    console.trace(chalk.yellowBright(target));
    messages.forEach((m) => {
      Log.buildLog(() => chalk.yellowBright(`Log.TRACE: ${target}`), enums.ELogTypes.Log, m);
    });
  }

  static decorateTrace<This, Args extends unknown[], Return>(targetMessage: string, ...messages: unknown[]) {
    return function (
      target: (this: This, ...args: Args) => Return | Promise<Return>,
      _context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return | Promise<Return>>,
    ): (this: This, ...args: Args) => Promise<Return> {
      return async function (this: This, ...args: Args): Promise<Return> {
        console.trace(chalk.yellowBright(target));
        messages.forEach((m) => {
          Log.buildLog(() => chalk.yellowBright(`Log.TRACE: ${targetMessage}`), enums.ELogTypes.Log, m);
        });

        // Borked rule in this example
        // eslint-disable-next-line no-invalid-this
        const result = target.apply(this, args);
        return result;
      };
    };
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
