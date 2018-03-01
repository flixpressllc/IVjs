'use strict';
var path = require('path');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = {
  entry: {
    lib: ['scripts/lib/index.ts'],
  },

  context: path.join(process.cwd(), 'src'),

  output: {
    path: path.join(process.cwd(), 'build'),
    filename: 'scripts/[name].[hash].js',
    // library: 'IV',
    libraryTarget: 'window'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        enforce: 'pre',
        test: /\.ts$/,
        loader: 'tslint-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        }),
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      chunksSortMode: 'dependency',
      inject: 'head',
    }),

    new ExtractTextPlugin({
      filename: 'css/[name].[hash].css',
      disable: !isProd,
    }),

    new CopyWebpackPlugin([{ from: 'public' }]),
  ],

  resolve: {
    modules: ['node_modules', path.resolve(process.cwd(), 'src')],
    extensions: ['.ts', '.js', 'scss'],
  },

  devServer: {
    contentBase: path.join(process.cwd(), 'dist'),
    clientLogLevel: 'info',
    port: 8080,
    host: '0.0.0.0',
    inline: true,
    historyApiFallback: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 500,
    },
  },

  devtool: 'source-map',
};
