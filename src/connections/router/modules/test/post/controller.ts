import AbstractController from '../../../../../tools/abstractions/controller.js';
import type TestDto from './dto.js';
import type { ITestEntity } from './types';

export default class GetController extends AbstractController<TestDto, ITestEntity> {
  override async execute(data: TestDto): Promise<ITestEntity> {
    return new Promise<ITestEntity>((resolve) => {
      if (data.id) {
        return resolve({ test: `test${data.id}` });
      }

      return resolve({ test: 'test' });
    });
  }
}
