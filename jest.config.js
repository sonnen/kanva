module.exports = {
  collectCoverageFrom: [
    '<rootDir>/packages/*/src/**/*.{ts,tsx}',
    '!<rootDir>/packages/*/src/**/index.{ts,tsx}',
  ],
  testMatch: [
    '<rootDir>/packages/*/src/**/*.(spec|test).ts',
  ],
  transform: {
    '^.+\\.(js|jsx|json)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
  ],
  coverageDirectory: '<rootDir>/reports/coverage',
  coverageReporters: ['json', 'lcov'],
  cacheDirectory: '.jest/cache',
};
