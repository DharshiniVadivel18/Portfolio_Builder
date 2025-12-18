module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Update entry point to use index.jsx
      webpackConfig.entry = webpackConfig.entry.replace(/index\.js$/, 'index.jsx');
      return webpackConfig;
    },
  },
};