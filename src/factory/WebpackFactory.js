const WebpackConfig = require('../config/WebpackConfig')
const webpackBaseConfig = require('./config/webpackBaseConfig')
class SingletonWebpackFactroy extends WebpackConfig {
    constructor() {
      if (!SingletonWebpackFactroy.instance) {
        super(webpackBaseConfig)
        SingletonWebpackFactroy.instance = this;
      }
      return SingletonWebpackFactroy.instance;
    }
}

module.exports = SingletonWebpackFactroy
