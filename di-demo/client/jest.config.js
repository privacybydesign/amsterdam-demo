/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
    collectCoverageFrom: ['src/**/*.{js,ts,tsx}'],
    coverageDirectory: '<rootDir>/coverage',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testRegex: '.spec.(js|ts|tsx)$',
    transform: {
        '^.+\\.(js|jsx|mjs)$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest'
    }
};
