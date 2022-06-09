require('dotenv').config();

const path = require('path');
const HtmlWebpPlugin = require('html-webpack-plugin');

//Preferi usar o dotenv ao env
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', 'jsx', '.json'],
  },
  devServer: {
    static: path.resolve(__dirname, 'public'),
  },
  plugins: [
    new HtmlWebpPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
