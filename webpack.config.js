var path = require('path');
var webpack = require('webpack');
var ToggableWatchPlugin = require('./toggablewatcher/plugin');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './toggablewatcher/client',
    './index'
  ],
  devtool: 'eval',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // {
      //   test: /\.html$/,
      //   use: [ 'file-loader?name=[name].[ext]' ]
      // },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ToggableWatchPlugin({
      forwardByDefault: true,
      withholdPaths: [
        '/home/martin/development/aframesandbox/toggablewatcher/subscene.html'
      ]
    })
  ],
  devServer: {
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: false,
      errorDetails: false,
      warnings: false,
      publicPath: false
    },
    hot: true
  }
};
