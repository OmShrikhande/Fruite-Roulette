module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      require.resolve('expo-router/babel'),
      // Reanimated plugin must be listed last
      'react-native-reanimated/plugin',
    ],
  };
};