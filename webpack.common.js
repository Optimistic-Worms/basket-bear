const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const entryApp = process.env.HOT ? ['react-hot-loader/patch', './client/src/index.jsx', 'webpack-hot-middleware/client'] : ['react-hot-loader/patch', './client/src/index.jsx'];

module.exports = {
  entry: {
    app: entryApp
  },
  module: {
    rules: [
/*       {
        enforce: "pre",
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          emitError: false,
          failOnWarning: false
        }
      },*/
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','react']
          }
        }
      },
      {
      test: /\.html$/,
      exclude: /node_modules/,
      loader: 'html-loader',
      query: {
        interpolate: 'require'
      }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','react']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
        'style-loader',
        'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|json|xml|ico|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',
              publicPath: '/'
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname + '/dist'),
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      inject: false,
      title: 'Shopping',
      template: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, './client/components/user/sw.js'),
    })
  ],
}