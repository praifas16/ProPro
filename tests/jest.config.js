const path = require('path');
const _filename = path.resolve(__filename);

module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest",
    },
    testEnvironment: "jsdom",
    moduleNameMapper: {
      "\\.(css|less)$": "identity-obj-proxy",
    },
  };
  