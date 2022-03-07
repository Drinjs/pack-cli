const Config = require('./Config')
const SingletonWebpackFactroy = require('../factory/WebpackFactory')

class WatchConfig extends Config {
    constructor(item) {
        super('watch', item);
        this.watchConfig = null
    }

    get webpackConfig() {
        return this._webpackConfig
    }

    set webpackConfig(item) {
        // 开启watch模式
        if(this.config) {
            const webpackInstance = new SingletonWebpackFactroy()
            webpackInstance.webpackConfig = item
        }
    }
}

module.exports = WatchConfig;
