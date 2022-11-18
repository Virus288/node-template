import devConfig from '../../config/devConfig.json';
import prodConfig from '../../config/prodConfig.json';
import type * as types from '../types';

/**
 * Load config from json files
 */
export default function getConfig(): types.IConfigInterface {
  switch (process.env.NODE_ENV) {
    case 'dev':
    case 'test':
      return devConfig;
    case 'prod':
      return prodConfig;
    default:
      throw new Error('No config files');
  }
}
