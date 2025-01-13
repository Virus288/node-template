import express from 'express';
import Log from 'simpl-loggar';
import Middleware from './middleware.js';
import AppRouter from './router.js';
import getConfig from '../../tools/configLoader.js';
import http from 'http';

export default class Router {
  private readonly _app: express.Express;
  private readonly _middleware: Middleware;
  private readonly _router: AppRouter;
  private _server: http.Server | undefined = undefined;

  constructor() {
    this._app = express();
    this._middleware = new Middleware();
    this._router = new AppRouter(this.app);
  }

  private get app(): express.Express {
    return this._app;
  }

  private get middleware(): Middleware {
    return this._middleware;
  }

  private get router(): AppRouter {
    return this._router;
  }

  private get server(): http.Server {
    return this._server!;
  }

  getServer(): http.Server {
    return this.server;
  }

  init(): void {
    Log.debug('Router', 'Initializing');

    this.initMiddleware();
    this.initDocumentation();
    this.initHealthCheck();
    this.initRouter();
    this.initFourOhFour();
    this.initServer();
    this.initErrHandler();
  }

  /**
   * Close server.
   */
  close(): void {
    Log.log('Server', 'Closing');
    if (!this.server) return;

    this.server.closeAllConnections();
    this.server.close();
  }

  /**
   * Initialize middleware.
   * @private
   */
  private initMiddleware(): void {
    this.middleware.generateMiddleware(this.app);
  }

  /**
   * Init swagger documentation.
   * @private
   */
  private initDocumentation(): void {
    this.router.generateDocumentation();
  }

  /**
   * Init 404.
   * @private
   */
  private initFourOhFour(): void {
    this.router.initFourOhFour();
  }

  /**
   * Init health check route.
   * @private
   */
  private initHealthCheck(): void {
    this.router.initHealh();
  }

  /**
   * Init err handler, catching errors in whole app.
   * @private
   */
  private initErrHandler(): void {
    this.middleware.generateErrHandler(this.app);
  }

  /**
   * Initialize basic routes.
   * @private
   */
  private initRouter(): void {
    this.router.initRoutes();
  }

  /**
   * Initialize server.
   * @private
   */
  private initServer(): void {
    this._server = http.createServer(this.app);

    if (process.env.NODE_ENV === 'test') return;

    const { port } = getConfig();

    this.server.listen(port, () => {
      Log.log('Server', `Listening on ${port}`);
    });
  }
}
