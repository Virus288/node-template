import type { JestConfigWithTsJest } from 'ts-jest';
import { defaults } from 'jest-config';

const config: JestConfigWithTsJest = {
  verbose: true,
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'js', 'ts', 'json'],
  testPathIgnorePatterns: ['build'],
  extensionsToTreatAsEsm: ['.ts'],
  preset: 'ts-jest/presets/default-esm',
  testMatch: ['**/*.test.ts'],
  testEnvironment: 'node',
  forceExit: false,
  clearMocks: true,
  testTimeout: 10000,
  passWithNoTests: true,
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: "tsconfig.json",
      },
    ],
  },
};

export default config;
