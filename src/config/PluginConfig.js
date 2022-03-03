const Config = require('./Config')

class PluginConfig extends Config {
    constructor(item) {
        super('plugins', item)
        this._webpackConfig = null
    }

    get webpackConfig() {
        return this._webpackConfig
    }

    set webpackConfig(item) {
        this._webpackConfig = item
    }
}

module.exports = PluginConfig;
