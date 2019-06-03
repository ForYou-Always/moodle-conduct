const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const HtmlWebpackPlugin = require('html-webpack-plugin');

//const mode = process.env.NODE_ENV;
const mode = 'development';

const getOutput = function () {
  const outputs = {
      development: {
        path: path.join(__dirname, './src/main/resources/static/built'),
        filename: '[name].js',
//        filename: 'bundle.js',
        publicPath: 'built/',
      },
      production: {
        path: path.join(__dirname, './src/main/resources/static/built'),
        filename: 'bundle.[hash].js',
        publicPath: 'built/',
      },
  };
  return outputs[mode];
};

const getDevTool = function () {
  const devTools = {
      development: 'source-map',
      production: '',
  };
  return devTools[mode];
};

var path = require('path');

module.exports = {
    entry: {bundle: './src/main/js/index.js', login: './src/main/js/login.js' },
    cache: true,
    debug: true,
    output: getOutput(),
    devtool: getDevTool(),
    module: {
      loaders: [
        { 
          test: /\.jsx$/,
          exclude: /(node_modules)/,
          loaders: ['babel-loader']
        },
        {
          test: path.join(__dirname, '.'),
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            presets: ['es2015', 'stage-0', 'react']
          }
        }, {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader'],
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: {
              loaders: ['style-loader', 'css-loader'],
              options: {
                sourceMap: true
              }
            }
          }),
        }, {
          test: /\.less$/,
          loaders: ['less-loader', 'style-loader'],
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: {
              loaders: ['less-loader', 'style-loader'],
              options: {
                sourceMap: true,
                javascriptEnabled: true
              }
            }
          }),
        }
        ]
    }
};