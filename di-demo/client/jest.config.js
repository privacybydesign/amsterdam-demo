module.exports = {
    collectCoverageFrom: ['src/**/*.{js,ts,tsx}'],
    coverageDirectory: '<rootDir>/coverage',
    moduleNameMapper: {
        '^@config(.*)$': '<rootDir>/src/config$1',
        '^@app(.*)$': '<rootDir>/src/app$1'
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testRegex: '.spec.(js|ts|tsx)$',
    transform: {
        '^.+\\.(js|jsx|mjs)$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest'
    }
};
