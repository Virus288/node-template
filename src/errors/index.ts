// eslint-disable-next-line max-classes-per-file
export class FullError extends Error {
  code = '000';
  status = 500;
}

export class InternalError extends FullError {
  constructor() {
    super('InternalError');
    this.message = 'Internal error. Try again later';
    this.name = 'InternalError';
    this.code = '001';
    this.status = 500;
  }
}

export class NotFoundError extends FullError {
  constructor() {
    super('NotFoundError');
    this.message = 'Resource not found';
    this.name = 'NotFoundError';
    this.code = '002';
    this.status = 404;
  }
}

export class Unauthorized extends FullError {
  constructor() {
    super('Unauthorized');
    this.message = 'User not logged in';
    this.name = 'Unauthorized';
    this.code = '003';
    this.status = 401;
  }
}

export class IncorrectRoutes extends FullError {
  constructor(routes: string[]) {
    super('IncorrectRoutes');
    this.message = routes.length > 1 ? `Routes ${routes.join(', ')} are incorrect` : `Route ${routes[0]} is incorrect`;
    this.name = 'IncorrectRoutes';
    this.code = '004';
    this.status = 400;
  }
}

export class NoRoutesChanged extends FullError {
  constructor() {
    super('NoRoutesChanged');
    this.message = 'Received req to change routes but provided data was the same as existing';
    this.name = 'NoRoutesChanged';
    this.code = '005';
    this.status = 400;
  }
}

export class IncorrectSecurity extends FullError {
  constructor(routes: string[]) {
    super('IncorrectSecurity');
    this.message =
      routes.length > 1
        ? `Routes ${routes.join(', ')} have incorrect security`
        : `Route ${routes[0]} have incorrect security`;
    this.name = 'IncorrectSecurity';
    this.code = '007';
    this.status = 400;
  }
}

export class IncorrectMethods extends FullError {
  constructor(routes: string[]) {
    super('IncorrectMethods');
    this.message =
      routes.length > 1
        ? `Routes ${routes.join(', ')} have incorrect methods`
        : `Route ${routes[0]} have incorrect method`;
    this.name = 'IncorrectMethods';
    this.code = '008';
    this.status = 400;
  }
}

export class IncorrectPath extends FullError {
  constructor(route: string) {
    super('IncorrectPath');
    this.message = `Route ${route} is incorrect`;
    this.name = 'IncorrectPath';
    this.code = '009';
    this.status = 400;
  }
}

export class MissingProcessPlatform extends FullError {
  constructor() {
    super('MissingProcessPlatform');
    this.message = 'process.platform is missing';
    this.name = 'MissingProcessPlatform';
    this.code = '010';
    this.status = 400;
  }
}

export class BadMessage extends FullError {
  constructor() {
    super('BadMessage');
    this.message = 'Received undefined message from broker. Is broker broken ?';
    this.name = 'BadMessage';
    this.code = '011';
    this.status = 400;
  }
}

export class MissingService extends FullError {
  constructor() {
    super('MissingService');
    this.message = 'Received message targeted to non existing broker. Did something die ?';
    this.name = 'MissingService';
    this.code = '012';
    this.status = 400;
  }
}

export class UserNotYetInitialized extends FullError {
  constructor() {
    super('UserNotYetInitialized');
    this.message = 'Requested sending message but user has no id nor temp id';
    this.name = 'UserNotYetInitialized';
    this.code = '013';
    this.status = 400;
  }
}

export class NoDataProvided extends FullError {
  constructor(target: string) {
    super('NoDataProvided');
    this.message = `${target} not provided`;
    this.name = 'NoDataProvided';
    this.code = '014';
    this.status = 400;
  }
}
