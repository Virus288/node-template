import TestDto from './dto.js';
import TestEntity from './entity.js';
import AbstractRouter from '../../../../../tools/abstractions/router.js';
import type { ITestDto } from './types.js';
import type express from 'express';

export default class UserRouter extends AbstractRouter<TestEntity, ITestDto> {
  override async execute(req: express.Request): Promise<TestEntity> {
    const dto = new TestDto(req.body as ITestDto);

    const data = await this.controller.execute(dto);

    return new TestEntity(data);
  }
}
