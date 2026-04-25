// Babel config for the Expo app.
// Keeps the project simple — only the default Expo preset is needed.
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
