import type { IUserLocals } from './user';
import type express from 'express';

export type IResponse = express.Response<unknown, IUserLocals>;
