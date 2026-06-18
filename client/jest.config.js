module.exports = {
    collectCoverageFrom: ['src/**/*.{js,ts,tsx}'],
    coverageDirectory: '<rootDir>/coverage',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/src/test/fileMock.ts',
        '\\.(css)$': '<rootDir>/src/test/styleMock.ts',
        '^@config/(.*)$': '<rootDir>/src/config/$1',
        '^@app/(.*)$': '<rootDir>/src/app/$1',
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@pages/(.*)$': '<rootDir>/src/pages/$1',
        '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '^@services/(.*)$': '<rootDir>/src/services/$1',
        '^@test/(.*)$': '<rootDir>/src/test/$1'
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testRegex: 'src/.+\\.spec\\.(js|ts|tsx)$',
    transform: {
        '^.+\\.(js|jsx|mjs|ts|tsx)$': 'babel-jest'
    }
};
