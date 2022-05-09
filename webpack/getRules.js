module.exports = function getRules() {
  return [
    ...getScriptsRules(),
    ...getStylesRules(),
    ...getResourcesRules(),
  ];
}

function getScriptsRules() {
  return [
    {
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/,
    }
  ];
}

function getStylesRules() {
  return [
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    }
  ];
}

function getResourcesRules() {
  return [
    {
      test: /\.(png|jpg|jpeg|svg|gif)$/i,
      type: "asset/resource",
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    },
  ];
}
