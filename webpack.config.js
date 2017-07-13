var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './index'
  ],
  devtool: 'eval',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [ 'file-loader?name=[name].[ext]' ]
      },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true
  }
};
