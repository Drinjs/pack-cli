const Config = require('./Config')

class ExternalConfig extends Config {
    constructor(item) {
        super('external', item)
        this._webpackConfig = null
    }

    get webpackConfig() {
        return this._webpackConfig
    }

    set webpackConfig(item) {
        this._webpackConfig = item
    }
}

module.exports = ExternalConfig;
