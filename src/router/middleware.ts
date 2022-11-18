import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { InternalError } from '../errors';
import getConfig from '../tools/configLoader';
import errLogger from '../tools/logger/logger';
import Log from '../tools/logger/log';
import type * as types from '../types';

export default class Middleware {
  generateMiddleware(app: Express): void {
    app.use(express.json({ limit: '1mb' }));
    app.use(cookieParser());
    app.use(
      cors({
        origin: getConfig().corsOrigin,
        credentials: true,
      }),
    );

    app.use(function (_req: express.Request, res: types.ILocalUser, next: express.NextFunction) {
      res.header('Content-Type', 'application/json;charset=UTF-8');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
  }

  generateErrHandler(app: Express): void {
    app.use((err: express.Errback, req: express.Request, res: types.ILocalUser, next: express.NextFunction) => {
      Log.error('Middleware', 'Generic err');
      Log.log('Middleware', err);
      errLogger.error('Caught new generic error').error(`Caused by ${req.ip}`).error(JSON.stringify(err));
      const { message, code, name, status } = new InternalError();
      res.status(status).json({ message, code, name });
      next();
    });
  }
}
