import type Router from '../connections/router/index.js';

export interface IState {
  router: Router;
  alive: boolean;
}
