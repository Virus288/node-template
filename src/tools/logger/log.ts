import chalk from 'chalk';
import errLogger from './logger';
import ELogTypes from '../../enums/logs';

export default class Log {
  static error(target: string, message: unknown): void {
    console.info(chalk.red(target));
    console.info(chalk.red(message));
    Log.saveLog(message, ELogTypes.Error);
  }

  static warn(target: string, message: unknown): void {
    console.info(chalk.yellow(target));
    console.info(chalk.yellow(message));
    Log.saveLog(message, ELogTypes.Warn);
  }

  static log(target: string, message: unknown): void {
    console.info(chalk.blue(target));
    console.info(chalk.blue(message));
    Log.saveLog(message, ELogTypes.Log);
  }

  static trace(target: string, message: unknown): void {
    console.trace(chalk.yellowBright(target));
    console.info(chalk.yellowBright(message));
    Log.saveLog(message, ELogTypes.Log);
  }

  private static saveLog(message: unknown, type: ELogTypes): void {
    const mess = typeof message !== 'string' ? JSON.stringify(message) : message;

    if (process.env.NODE_ENV === 'production' && !process.env.DEBUG_PROD) {
      return;
    }

    switch (type) {
      case ELogTypes.Warn:
        errLogger.warn(mess);
        return;
      case ELogTypes.Error:
        errLogger.error(mess);
        return;
      case ELogTypes.Log:
      default:
        errLogger.info(mess);
        return;
    }
  }
}
