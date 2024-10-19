import post from './post/router.js';
import type { Router } from 'express';

/**
 * Initialize routes for user router.
 * @param router Express router.
 */
export default function initTestRoutes(router: Router): void {
  const prefix = '/test';

  router.use(prefix, post.router);
}
