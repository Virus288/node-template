import type { JestConfigWithTsJest } from 'ts-jest';
import defaultConfig from './jest.config.default';

const config: JestConfigWithTsJest = {
  ...defaultConfig,
  roots: ['./unit'],
};

export default config;
