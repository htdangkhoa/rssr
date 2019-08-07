const path = require('path');
const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';

const isDev = nodeEnv !== 'production';

let entry = [
  './src/app/index.js',
];

let plugins = [
  new webpack.DefinePlugin({
    __DEV__: JSON.stringify(isDev),
  })
];

if (isDev) {
  entry = [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    ...entry,
  ];

  plugins = [
    ...plugins,
    new webpack.HotModuleReplacementPlugin(),
  ]
}


module.exports = {
  mode: nodeEnv,
  devtool: isDev ? 'eval' : 'hidden-source-map',
  entry,
  output: {
    path: path.resolve(path.join(__dirname, 'dist')),
    filename: isDev ? 'bundle.js' : 'bundle.min.js',
    // publicPath: '/static/',
  },
  plugins,
  cache: !isDev,
  resolve: {
    extensions: ['.js'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ['babel'],
        include: __dirname,
      },
      {
        test: /\.css$/i,
        loader: [
          'style',
          'css',
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url',
            options: {
              limit: 10240,
              name: '[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ]
  },
  optimization: isDev ? {} : {
    minimizer: [
      new TerserWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        extractComments: false,
        terserOptions: {
          compress: {
            booleans: true,
            drop_console: true,
          },
          warnings: false,
          mangle: true,
        },
      }),
    ],
  },
  performance: { hints: false },
}