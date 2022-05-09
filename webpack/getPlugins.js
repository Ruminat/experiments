const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function getPlugins() {
  return [
    new HtmlWebpackPlugin({ title: "Page Title" }),
  ];
}
