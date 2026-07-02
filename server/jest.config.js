/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: '.',
    roots: ['<rootDir>/src'],
    setupFiles: ['<rootDir>/jest.setup.js'],
    // Compile tests with a tsconfig that includes the test files and explicitly
    // pulls in the jest global type defs (the base tsconfig excludes tests and,
    // with baseUrl set, TS 6 does not auto-discover @types for them).
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.spec.json'
            }
        ]
    },
    // Mirror the path aliases declared in tsconfig.json so imports resolve under Jest.
    moduleNameMapper: {
        '^@config/(.*)$': '<rootDir>/src/config/$1',
        '^@api/(.*)$': '<rootDir>/src/api/$1',
        '^@loaders/(.*)$': '<rootDir>/src/loaders/$1',
        '^@services/(.*)$': '<rootDir>/src/services/$1',
        '^@typedefs/(.*)$': '<rootDir>/src/typedefs/$1',
        '^@test/(.*)$': '<rootDir>/src/test/$1'
    }
};
