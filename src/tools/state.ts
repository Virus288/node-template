import Log from 'simpl-loggar';
import type Router from '../connections/router/index.js';
import type { IState } from '../types/index.js';

class State implements IState {
  private _router: Router | null = null;
  private _alive: boolean = false;

  get router(): Router {
    return this._router as Router;
  }

  set router(value: Router) {
    this._router = value;
  }

  get alive(): boolean {
    return this._alive;
  }

  set alive(val: boolean) {
    this._alive = val;
  }

  kill(): void {
    this.router.close();

    Log.log('Server', 'Server closed');
  }
}

export default new State();
