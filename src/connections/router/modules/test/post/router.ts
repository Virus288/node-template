import GetController from './controller.js';
import Router from './index.js';
import handleErr from '../../../../../errors/handler.js';
import limitRate from '../../../utils.js';
import type * as types from '../../../../../types/index.js';

const service = new Router(new GetController());

/**
 * @openapi
 * /:
 *   post:
 *     tags:
 *       - test
 *     description: Test route
 *     security: []
 *     requestBody:
 *       description: Request body for testing
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ITestDto'
 *     responses:
 *       200:
 *         description: Success. Get test callback.
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/NoDataProvidedError'
 *                 - $ref: '#/components/schemas/MissingArgError'
 *                 - $ref: '#/components/schemas/IncorrectArgError'
 */
service.router.post('/', limitRate, async (req, res) => {
  try {
    const data = await service.execute(req);
    res.status(200).send({ data });
  } catch (err) {
    handleErr(err as types.IFullError, res);
  }
});

export default service;
