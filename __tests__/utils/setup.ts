import { afterAll, beforeAll } from '@jest/globals';
import Router from '../../src/connections/router';
import State from '../../src/tools/state.js'

beforeAll(async () => {
  State.router = new Router()

  State.router.init()
})

afterAll(() => {
  State.router.close()
});
