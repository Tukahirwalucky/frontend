const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          "http": require.resolve("stream-http"),
          "https": require.resolve("https-browserify"),
          "assert": require.resolve("assert"),
          "os": require.resolve("os-browserify"),
          "url": require.resolve("url"),
          "buffer": require.resolve("buffer"),
          "process": require.resolve("process/browser"),
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        }),
      ],
    },
  },
};
