/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
    collectCoverageFrom: ['src/**/*.{js,ts,tsx}'],
    coverageDirectory: '<rootDir>/coverage',
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/src/test/fileMock.ts',
        '\\.(css)$': '<rootDir>/src/test/styleMock.ts',
        ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' })
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testRegex: '.spec.(js|ts|tsx)$',
    transform: {
        '^.+\\.(js|jsx|mjs)$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest'
    }
};
