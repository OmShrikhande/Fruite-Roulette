const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

// Start from Expo's default Metro config to ensure correct asset handling
const config = getDefaultConfig(__dirname);

// Preserve your custom module resolution for tslib
config.resolver = config.resolver || {};
config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules || {}),
  tslib: path.resolve(__dirname, 'node_modules/tslib'),
};

module.exports = config;
