const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const context = require('./src/config')


module.exports = {
  entry: '',
  context: context.workspacePath,
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          compress: {
            drop_console: true,
            ecma: 6
          }
        },
        extractComments: true,
      }),
      
    ]
  }
};