/**
 * Global config for the main Vue app. ES7 not supported here.
 * See docs for all config options: https://cli.vuejs.org/config
 */
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

// Get app mode: production, development or test
const mode = process.env.NODE_ENV || 'production';

// Format for progress bar, shown while app building
const progressFormat =
  '\x1b[1m\x1b[36mBuilding Dashy\x1b[0m ' +
  '[\x1b[1m\x1b[32m:bar\x1b[0m] :percent (:elapsed seconds)';

// Webpack Config
const configureWebpack = {
  mode,
  module: {
    rules: [{ test: /.svg$/, loader: 'vue-svg-loader' }],
  },
  plugins: [new ProgressBarPlugin({ format: progressFormat })],
};

// Application pages
const pages = {
  dashy: {
    entry: 'src/main.js',
    filename: 'index.html',
  },
};

// Export the main Vue app config
module.exports = {
  publicPath,
  pwa,
  integrity,
  configureWebpack,
  pages,
  chainWebpack: config => {
    config.module.rules.delete('svg');
  },
};
