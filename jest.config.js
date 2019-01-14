module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/node_modules/',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/**/*.d.ts',
  ],
  testMatch: [
    '<rootDir>/src/**/*.(spec|test).ts',
  ],
  transform: {
    '^.+\\.(js|jsx|json)$': '<rootDir>/../../node_modules/babel-jest',
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
