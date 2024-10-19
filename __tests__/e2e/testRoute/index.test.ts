import { describe, expect, it } from '@jest/globals';
import supertest from 'supertest'
import State from '../../../src/tools/state.js'
import { ITestDto, ITestEntity } from '../../../src/connections/router/modules/test/post/types.js';
import { FourOhFour, IncorrectArgTypeError } from '../../../src/errors/index.js';
import { IFullError } from '../../../src/types/errors.js';

describe('Generic tests', () => {
  const sampleTestBody: ITestDto = {
    id: '2'
  }

  describe('Should throw', () => {
    describe('No data', () => {
      it(`No route`, async () => {
        const target = new FourOhFour()

        const res = await supertest(State.router.getServer())
          .post('/tests')
          .send(sampleTestBody);

        const reqBody = res.body as { error: IFullError };

        expect(reqBody.error.message).toEqual(target.message);
      });
    });

    describe('Incorrect data', () => {
      it(`Id is not string`, async () => {
        const target = new IncorrectArgTypeError(`id should be a string`)

        const res = await supertest(State.router.getServer())
          .post('/test')
          .send({ ...sampleTestBody, id: 2 });

        const reqBody = res.body as { error: IFullError };

        expect(reqBody.error.message).toEqual(target.message);
      });
    })
  });

  describe('Should pass', () => {
    it(`Get data`, async () => {
      const res = await supertest(State.router.getServer())
        .post('/test')
        .send(sampleTestBody);

      const reqBody = res.body as { data: ITestEntity };

      expect(reqBody.data.test).toEqual(`test${sampleTestBody.id}`);
    });
  })
});
