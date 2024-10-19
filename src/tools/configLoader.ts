import Log from './logger/index.js';
import type * as types from '../types/index.js';
import fs from 'fs';

/**
 * Validate if config includes all required keys.
 * @param config {types.IConfigInterface} Config.
 * @returns {void} Void.
 */
const preValidate = (config: types.IConfigInterface): void => {
  const configKeys = ['port', 'corsOrigin', 'myAddress'];
  configKeys.forEach((k) => {
    if (config[k as keyof types.IConfigInterface] === undefined || config[k as keyof types.IConfigInterface] === null)
      throw new Error(`Config is incorrect. ${k} is missing in config or is set to undefined`);
  });
};

/**
 * Load config from json files.
 * @returns Config loaded from file.
 * @throws Error that no config was found.
 */
export default function getConfig(): types.IConfigInterface {
  Log.log('Config loader', `Getting config for env ${process.env.NODE_ENV}`);
  let config: Partial<types.IConfigInterface> = {};

  switch (process.env.NODE_ENV) {
    case 'testDev':
      config = JSON.parse(fs.readFileSync('./config/testConfig.json').toString()) as types.IConfigInterface;
      break;
    case 'development':
    case 'test':
      config = JSON.parse(fs.readFileSync('./config/devConfig.json').toString()) as types.IConfigInterface;
      break;
    case 'production':
      config = JSON.parse(fs.readFileSync('./config/prodConfig.json').toString()) as types.IConfigInterface;
      break;
    default:
      throw new Error('No config files');
  }

  preValidate(config as types.IConfigInterface);
  return config as types.IConfigInterface;
}
