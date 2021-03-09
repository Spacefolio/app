const { O_DIRECT } = require("constants");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
require("dotenv").config();
var webpack = require("webpack");
var Chart = require('chart.js');


module.exports = {
  mode: "development",
  entry: ["@babel/polyfill", "./src/index.jsx"],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },

      {
        test: /\.jsx$/,
        use: "babel-loader",
      },
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|jp2|webp)$/,
        loader: "file-loader",
        options: {
          name: "images/[name].[ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|otf)$/,
        loader: "url-loader?limit=100000",
      },

      {
        test: /\.(tsv|dsv)$/,
        loader: "dsv-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new webpack.DefinePlugin({
      API_DOMAIN: JSON.stringify(
        process.env.NODE_ENV == "DEVELOPMENT"
          ? "http://192.168.1.134:4000"
          : "/api"
      ),
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
  externals: {},
};
