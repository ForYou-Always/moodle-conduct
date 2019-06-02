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

/*const getLoaders = function () {
  const loaders = {};
  
//Development Enviornment Loaders
  
  loaders.development = [{
    loader: 'babel-loader',
    test: /\.js$/,
    query: {
      cacheDirectory: true,
      presets: ['es2015', 'stage-0', 'react'],
    },
    include: [
      path.resolve(__dirname, 'src/main/js'),
      ],
  }, {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader',
    }),
  }, {
    test: /\.less$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'less-loader'],
    }),
  }];
  
//Production Enviornment Loaders
  
  loaders.production = [{
    loader: 'babel-loader',
    test: /\.js$/,
    query: {
      cacheDirectory: true,
      presets: ['es2015', 'stage-0', 'react'],
    },
    include: [
      path.resolve(__dirname, 'src/main/js'),
      ],
  }, {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader',
    }),
  }, {
    test: /\.less$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'less-loader'],
    }),
  }];
  
  return loaders[process.env.NODE_ENV];
};*/

/*const getPlugins = function () {
  const plugins = {};
  const defaultPlugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    ];
  
  plugins.development = defaultPlugins.slice(0);
  plugins.development.push(new ExtractTextPlugin('bundle.css'));
  plugins.development.push(new webpack.NoEmitOnErrorsPlugin());
  plugins.development.push(new HtmlWebpackPlugin());
  
  plugins.production = defaultPlugins.slice(0);
  plugins.production.push(new ExtractTextPlugin('bundle.[hash].css'));
  plugins.production.push(new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    sourceMap: true,
  }));
  plugins.production.push(new HtmlWebpackPlugin({
    template: './src/main/resources/static/html-template/asset-main.html',
    filename: '../asset-main.html',
  }));
  return plugins[process.env.NODE_ENV];
};*/

/*module.exports = {
    entry: ['./src/main/js/index.js'],
    output: getOutput(),
    module: {
      noParse: [/autoit.js/],
      rules: getLoaders(),
    },
    node: {
      fs: 'empty',
    },
    devtool: getDevTool(),
    plugins: getPlugins(),
};*/


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

/*[
  { test: /\.css$/, exclude: /node_modules/, loader: 'style!css' },
  { test: /\.json$/, loader: 'json-loader' },
  { test: /\.jsx$/, loaders: ['react-hot', 'babel-loader'], include: path.join(__dirname, 'app') },
  { test: /\.es6$/, exclude: /node_modules/, loader: 'babel-loader?stage=0&optional=runtime'},
  { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?stage=0&optional=runtime'},
  { test: /\.scss$/, exclude: /node_modules/, loaders: ExtractTextPlugin('style-loader', 'css-loader!sass-loader') }
]*/

/*loaders: [
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
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader',
    }),
  }, {
    test: /\.less$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'less-loader'],
    }),
  }
  ]*/

/*[
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
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: {
        loader: "css-loader",
        options: {
          sourceMap: true
        }
      }
    }),
  }, {
    test: /\.less$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: {
        loader: ['css-loader', 'less-loader'],
        options: {
          sourceMap: true
        }
      }
    }),
  }
  ]*/

/*var path = require('path');

module.exports = {
    entry: './src/main/js/index.js',
    devtool: 'sourcemaps',
    cache: true,
    debug: true,
    output: {
      path: __dirname,
      filename: './src/main/resources/static/built/bundle.js'
    },
    module: {
      loaders: [
        {
          test: path.join(__dirname, '.'),
          exclude: /(node_modules)/,
          loader: 'babel',
          query: {
            cacheDirectory: true,
            presets: ['es2015', 'react']
          }
        }
        ]
    }
};*/