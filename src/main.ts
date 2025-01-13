import Log from 'simpl-loggar';
import Router from './connections/router/index.js';
import Liveness from './tools/liveness.js';
import State from './tools/state.js';
import type { IFullError } from './types/index.js';

class App {
  private _liveness: Liveness | undefined;

  private get liveness(): Liveness | undefined {
    return this._liveness;
  }

  private set liveness(val: Liveness | undefined) {
    this._liveness = val;
  }

  init(): void {
    try {
      this.handleInit();
    } catch (err) {
      const { stack, message } = err as IFullError | Error;
      Log.error('Server', 'Err while initializing app', message, stack);

      this.close();
    }
  }

  private close(): void {
    State.alive = false;
    State.kill();

    this.liveness?.close();
  }

  @Log.decorateSyncTime('Server started')
  private handleInit(): void {
    const router = new Router();

    State.router = router;

    router.init();

    Log.log('Server', 'Server started');

    this.liveness = new Liveness();
    this.liveness.init();
    this.listenForSignals();

    State.alive = true;
  }

  private listenForSignals(): void {
    process.on('SIGTERM', () => {
      Log.log('Server', 'Received signal SIGTERM. Gracefully closing');
      this.close();
    });
    process.on('SIGINT', () => {
      Log.log('Server', 'Received signal SIGINT. Gracefully closing');
      this.close();
    });
  }
}

const app = new App();
app.init();
