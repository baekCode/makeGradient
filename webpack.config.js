const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = env => ({
  mode     : env.mode,
  entry    : './src/index.tsx',
  output   : {
    path    : path.resolve(__dirname, 'dist'),
    filename: '[name].[id].js'
  },
  devServer: {
    contentBase       : path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    port              : 3030,
    hot               : true,
    publicPath        : '/',
    open              : true
  },
  resolve  : {
    extensions: ['.js', 'jsx', '.ts', '.tsx'],
    alias     : {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module   : {
    rules: [
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.css$/,
        use : ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test   : /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader : 'url-loader',
        options: {
          name : '[hash].[ext]',
          limit: 10000,
        },
      },
    ],
  },
  plugins  : [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html'
    }),
    new CleanWebpackPlugin()
  ],
});