/// <reference path="../node_modules/@types/webpack-dev-server/index.d.ts" />

import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration, NormalModuleReplacementPlugin } from "webpack";
const { join } = require('path');
const path = join(__dirname, '..', '/assets');

const config: Configuration = {
  entry: "./index.tsx",
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    publicPath: '/',
    path
  },
  mode: 'development',

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".mjs", ".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: 'tsconfig.json'
        }
      },
      // Avoid "require is not defined" errors
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [
          join(process.cwd(), 'node_modules'),
          join(process.cwd(), '..', 'node_modules')
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new NormalModuleReplacementPlugin(/type-graphql$/, (result: any) => {
      result.request = result.request.replace(/type-graphql/, "type-graphql/browser-shim");
    })
  ],
  devServer: {
    historyApiFallback: true
  }
};

export default config;
