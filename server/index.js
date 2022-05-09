const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const history = require('connect-history-api-fallback');

const PORT = 3000;

const app = express();
const getConfig = require("../webpack/config.js");

const webpackEnv = { production: false };
const config = getConfig(webpackEnv);
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
const wdm = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
});

app.use(history());
app.use(wdm);

// MrBar answer.
// app.use((req, res, next) => {
//   // if (!/(\.(?!html)\w+$|__webpack.*)/.test(req.url)) {
//     req.url = '/' // this would make express-js serve index.html
//   // }
//   next()
// })

// app.use(require("webpack-hot-middleware")(compiler, {
//   log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
// }))

app.listen(PORT, () => {
  console.log(`The app is available at http://localhost:${PORT}\n`);
});
