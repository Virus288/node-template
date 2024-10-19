import type { Locals } from 'express';

export interface IUserLocals extends Locals {
  reqId: string;

  [key: string]: unknown;
}
