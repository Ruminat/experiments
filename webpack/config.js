const path = require("path");

const getPlugins = require("./getPlugins");
const getRules = require("./getRules");
const getOptimization = require("./getOptimization");

module.exports = (env) => {
  return {
    mode: env.production ? "production" : "development",
    entry: "./src/index.ts",
    output: getOutput(),
    devtool: "source-map",
    devServer: {
      static: "./dist",
    },
    plugins: getPlugins(),
    module: { rules: getRules() },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    optimization: getOptimization(),
  };
};

function getOutput() {
  return {
    filename: "[name].[contenthash].js",
    path: getDistDir(),
    clean: true,
    publicPath: "/",
  };
}

function getDistDir() {
  return path.resolve(__dirname, "..", "dist");
}
