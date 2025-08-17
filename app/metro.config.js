const path = require('path');

module.exports = {
  resolver: {
    extraNodeModules: {
      tslib: path.resolve(__dirname, 'node_modules/tslib'),
    },
  },
};
