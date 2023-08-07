/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  "collectCoverage": true,
  "coverageReporters": ["html"],
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': `${__dirname}/src/assets/css/__mock__/fileMock.tsx`,
    ".(css|sass|scss)$": "identity-obj-proxy",
  },
};
