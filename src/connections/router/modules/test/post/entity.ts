import type { ITestEntity } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     ITestEntity:
 *       type: object
 *       properties:
 *         test:
 *           type: string
 *       required:
 *         - test
 */
export default class TestEntity implements ITestEntity {
  readonly test: string;

  constructor(data: ITestEntity) {
    this.test = data.test;
  }
}
