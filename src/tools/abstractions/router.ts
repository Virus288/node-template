import express from 'express';
import type AbstractController from './controller.js';

export default abstract class AbstractRouter<T, U> {
  private readonly _router: express.Router;
  private readonly _controller: AbstractController<U, T>;

  constructor(controller: AbstractController<U, T>) {
    this._router = express.Router();
    this._controller = controller;
  }

  get router(): express.Router {
    return this._router;
  }

  protected get controller(): AbstractController<U, T> {
    return this._controller;
  }

  async execute(_req: express.Request): Promise<T> {
    return new Promise((resolve) => {
      resolve(undefined as T);
    });
  }
}
