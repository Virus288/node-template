import * as types from '../types';

const handleErr = (err: types.IFullError, res: types.ILocalUser): void => {
  if (process.env.NODE_END !== 'prod') console.trace(err);
  const { message, code, name, status } = err;
  !status
    ? res.status(500).json({
        message,
        code,
        name,
      })
    : res.status(status).json({ message, code, name });
};

export default handleErr;
