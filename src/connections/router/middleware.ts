import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import Log from 'simpl-loggar';
import * as errors from '../../errors/index.js';
import getConfig from '../../tools/configLoader.js';
import type { IFullError } from '../../types/index.js';
import type { IResponse } from '../../types/requests.js';
import type { Express } from 'express';
import { randomUUID } from 'crypto';

export default class Middleware {
  static setNoCache(_req: express.Request, res: express.Response, next: express.NextFunction): void {
    res.set('cache-control', 'no-store');
    next();
  }

  generateMiddleware(app: Express): void {
    app.use(express.json({ limit: '10kb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(
      cors({
        origin: getConfig().corsOrigin,
        credentials: true,
      }),
    );

    const helmetDirectives = helmet.contentSecurityPolicy.getDefaultDirectives();
    const allowedUrls = getConfig().corsOrigin;
    app.use(
      helmet({
        contentSecurityPolicy: {
          useDefaults: false,
          directives: {
            ...helmetDirectives,
            'form-action': ["'self'", ...allowedUrls],
            'script-src': ["'self'"],
            'default-src': ["'self'", 'data:'],
            'frame-ancestors': ["'self'", ...allowedUrls],
            'frame-src': ["'self'", ...allowedUrls],
            'connect-src': ["'self'", ...allowedUrls],
          },
        },
      }),
    );

    app.use((_req: express.Request, res, next: express.NextFunction) => {
      res.header('Content-Type', 'application/json;charset=UTF-8');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    // This is set here, so this route will not be logged anywhere
    app.get('/favicon.ico', (_req, res) => {
      res.status(404).send();
    });

    // Log new req
    app.use((req, _res, next) => {
      try {
        const logBody: Record<string, string | Record<string, string>> = {
          method: req.method,
          path: req.path,
          ip: req.ip as string,
        };

        if (req.query) logBody.query = JSON.stringify(req.query);
        if (
          req.body !== undefined &&
          typeof req.body === 'object' &&
          Object.keys(req.body as Record<string, string>).length > 0
        ) {
          logBody.body = req.body as Record<string, string>;

          // Hide password in logs
          if (logBody.body.password) {
            logBody.body.password = '***';
          }
        }

        Log.log('New req', logBody);
        next();
      } catch (err) {
        Log.error('Middleware validation', err);
      }
    });

    // Measure req time
    app.use((req: express.Request, res: IResponse, next: express.NextFunction) => {
      res.locals.reqId = randomUUID();
      Log.time(res.locals.reqId);

      res.once('finish', () => {
        Log.endTime(res.locals.reqId, { path: req.originalUrl, method: req.method });
      });

      next();
    });
  }

  generateErrHandler(app: Express): void {
    app.use(
      (err: express.Errback | IFullError, req: express.Request, res: express.Response, _next: express.NextFunction) => {
        Log.error('Caught new generic error', `Caused by ${req.ip ?? 'unknown ip'}`, JSON.stringify(err));
        const error = err as IFullError;

        if (error.message.includes('is not valid JSON')) {
          Log.error('Middleware', 'Received req is not of json type', error.message, error.stack);
          const { message, name, status } = new errors.IncorrectDataType();
          res.status(status).json({ message, name });
          return;
        }
        if (error.name === 'SyntaxError') {
          Log.error('Middleware', 'Generic err', error.message, error.stack);
          const { message, code, name, status } = new errors.InternalError();
          res.status(status).json({ message, code, name });
          return;
        }
        if (error.code !== undefined) {
          const { message, code, name, status } = error;
          res.status(status).json({ message, code, name });
          return;
        }

        Log.error('Middleware', 'Generic err', error.message, error.stack);
        const { message, code, name, status } = new errors.InternalError();
        res.status(status).json({ message, code, name });
      },
    );
  }
}
