import Router from './router';
import State from './tools/state';
import errLogger from './tools/logger/logger';
import Log from './tools/logger/log';

class App {
  private router: Router | undefined;

  init(): void {
    try {
      this.router = new Router();
      State.Router = this.router;
      this.router.init();
    } catch (err) {
      Log.log('Server', 'Err while initializing app');
      Log.log('Server', JSON.stringify(err));
      errLogger.error(err);
      errLogger.error(JSON.stringify(err));

      State.Router.close();
    }
  }
}

const app = new App();
app.init();
