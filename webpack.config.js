// https://serverless-stack.com/chapters/add-support-for-es6-es7-javascript.html
const serverlessWebpack = require('serverless-webpack');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  entry: serverlessWebpack.lib.entries,
  target: 'node',
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  externals: [webpackNodeExternals()],
  // Run babel on all .js files and skip those in node_modules
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/
      }
    ]
  }
};
