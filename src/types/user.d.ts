import * as enums from '../enums';
import express from 'express';

export interface IUsersTokens {
  userId: string | undefined;
  tempId: string;
  validated: boolean;
  newToken?: string;
  type: enums.USER_TYPES;
}

export interface ILocalUser extends express.Response {
  locals: IUsersTokens;
}
