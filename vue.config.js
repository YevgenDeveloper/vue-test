const path = require("path");

module.exports = {
  publicPath: '/vue-test/dist',
  chainWebpack: config => {
    const apiClient = "mock";
    config.resolve.alias.set(
      "api-client",
      path.resolve(__dirname, `src/api/${apiClient}`)
    );
  }
};
