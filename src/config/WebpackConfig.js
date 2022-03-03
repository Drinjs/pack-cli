const Config = require('./Config')

class WebpackConfig extends Config {
    constructor(item) {
        super('webpack', item)
        this._webpackConfig = {}
    }

    get webpackConfig() {
        return this._webpackConfig
    }

    set webpackConfig(item) {
        this.options = item
        this._webpackConfig[item.type] = item.value
    }
}

module.exports = WebpackConfig;
