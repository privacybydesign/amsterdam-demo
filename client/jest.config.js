module.exports = {
    collectCoverageFrom: ['src/**/*.{js,ts,tsx}'],
    coverageDirectory: '<rootDir>/coverage',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/src/test/fileMock.ts',
        '\\.(css)$': '<rootDir>/src/test/styleMock.ts',
        '@privacybydesign/yivi-css': '<rootDir>/src/test/styleMock.ts',
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
    },
    // react-markdown v10 and its unified/remark/mdast/micromark/unist/hast ecosystem ship
    // pure ESM, which jest cannot require untransformed. Allow babel-jest to transform them.
    transformIgnorePatterns: [
        '/node_modules/(?!(' +
            [
                'react-markdown',
                'vfile',
                'vfile-message',
                'unist-util-[^/]+',
                'unified',
                'bail',
                'is-plain-obj',
                'trough',
                'remark-[^/]+',
                'mdast-util-[^/]+',
                'micromark[^/]*',
                'decode-named-character-reference',
                'character-entities[^/]*',
                'property-information',
                'hast-util-[^/]+',
                'hastscript',
                'space-separated-tokens',
                'comma-separated-tokens',
                'ccount',
                'escape-string-regexp',
                'markdown-table',
                'zwitch',
                'longest-streak',
                'html-url-attributes',
                'trim-lines',
                'devlop',
                'estree-util-is-identifier-name',
                'style-to-object',
                'style-to-js',
                'inline-style-parser',
                'web-namespaces'
            ].join('|') +
            ')/)'
    ]
};
