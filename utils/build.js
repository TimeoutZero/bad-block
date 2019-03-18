var webpack = require("webpack"),
    config = require("../webpack.config");

delete config.chromeExtensionBoilerplate;
webpack(
  // @ts-ignore
  config,
  function (err) { if (err) throw err; }
);
