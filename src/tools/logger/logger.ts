import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import * as errors from '../../errors/index.js';

let path = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
const cache = process.platform === 'win32' ? 'AppData/Roaming/' : '.cache';
const name = process.env.APP_NAME ?? process.env.npm_package_name;
path += `/${cache}/${name!}/`;

if (!path) throw new errors.MissingProcessPlatformError();
const levels = ['error', 'warn', 'info'];

const errLogger = winston.createLogger({
  transports: levels.map((l) => {
    return new DailyRotateFile({
      level: l,
      filename: `${path}logs/errors-%DATE%.log`,
      json: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf((info) => `[${info.timestamp as string}] ${info.level}: ${info.message as string}`),
      ),
      datePattern: 'yyyy-MM-DD',
      maxFiles: 30,
      handleExceptions: true,
      handleRejections: true,
    });
  }),
});

export default errLogger;
