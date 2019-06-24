module.exports = {
  clearMocks: true,
  collectCoverage: true,
  setupFiles: ['./src/setupTests.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  verbose: true,
  collectCoverageFrom: ['src/**/*.js*'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    '/src/index.js',
    'src/__test__/',
    'src/assets/',
  ],
  testPathIgnorePatterns: ['/cypress/'],
};
