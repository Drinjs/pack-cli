const WebpackConfig = require('../config/WebpackConfig')

class SingletonWebpackFactroy extends WebpackConfig {
    constructor() {
      if (!SingletonWebpackFactroy.instance) {
        super()
        SingletonWebpackFactroy.instance = this;
      }
      return SingletonWebpackFactroy.instance;
    }
}

module.exports = SingletonWebpackFactroy
