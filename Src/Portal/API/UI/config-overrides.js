
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config, env) {
  //do stuff with the webpack config...

  config.plugins.push(new MonacoWebpackPlugin({
    // available options are documented at https://github.com/microsoft/monaco-editor/blob/main/webpack-plugin/README.md#options
    languages: ['json','plaintext']
  }));
  return config;
}