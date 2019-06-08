const path = require('path');
const Webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: {
    // app: './src/main.js',
    openlotr2: './src/www/index.js'
  },
  // target: 'node',
  node: {
    fs: 'empty',
    net: 'empty'
  },
  mode: 'development',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'openlotr2.bundle.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/www/index.html'),
        to: path.resolve(__dirname, 'build')
      }
    ])
  ]
};