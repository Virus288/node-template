import Validation from '../../../../../tools/validation.js';
import type { ITestDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     ITestDto:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           maxLength: 200
 */
export default class TestDto implements ITestDto {
  readonly id?: string;

  constructor(data: ITestDto) {
    this.id = data.id;

    this.validate();
  }

  private validate(): void {
    new Validation(this.id, 'id').isDefined().isString();
  }
}
