const path = require('path');
const _filename = path.resolve(__filename);

module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    "docs/**/*.{js,jsx}",
    "!**/node_modules/**"  
],


  testEnvironment: 'jsdom',
};

