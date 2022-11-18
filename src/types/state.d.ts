import Router from '../router';

export interface IState {
  Router: Router;
}

export interface IConfigInterface {
  httpPort: number;
  corsOrigin: string;
}
