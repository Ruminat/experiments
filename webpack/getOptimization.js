module.exports = function getOptimization() {
  return {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      minChunks: 2,
      minSize: 128,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          minChunks: 1,
          chunks: "all",
        },
      },
    },
  };
}
