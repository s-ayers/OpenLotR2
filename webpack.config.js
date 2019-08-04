const path = require('path');
const Webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: {
    // app: './main.ts',
    openlotr2: './src/renderer/index.ts'
  },
  // target: 'node',
  node: {
    fs: 'empty',
    net: 'empty'
  },
  mode: 'development',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'openlotr2.bundle.js',
    publicPath: '/renderer/'
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
      },
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.ts$/,
        include: path.resolve(__dirname),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.tsx$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(ico)$/,
        include: path.resolve(__dirname, 'src/renderer'),
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]'
          }
        }]
      }
    ]
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyWebpackPlugin([
      // {
      //   from: path.resolve(__dirname, 'src/www/index.html'),
      //   to: path.resolve(__dirname, 'dist')
      // },
      {
        from: path.resolve(__dirname, 'src/renderer'),
        to: path.resolve(__dirname, 'dist/renderer')
      },
      {
        from: path.resolve('doc/_build/singlehtml'),
        to: path.resolve('dist/docs')
      }
    ])
  ]
};