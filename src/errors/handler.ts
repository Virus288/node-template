import Log from '../tools/logger/index.js';
import type * as types from '../types/index.js';
import type express from 'express';

const handleErr = (err: types.IFullError, res: express.Response): void => {
  Log.error('Error', err.message, err.stack);

  const { message, code, name, status } = err;
  res.status(!status ? 500 : status).send({
    error: {
      message,
      code,
      name,
    },
  });
};

export default handleErr;
