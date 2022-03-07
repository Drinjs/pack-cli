const Config = require('./Config')

class WebpackConfig extends Config {
    constructor(item) {
        super('webpack', item)
        this._webpackConfig = item
    }

    get webpackConfig() {
        return this._webpackConfig
    }

    set webpackConfig(item) {
        // this.options = item
        const oldValue = this._webpackConfig[item.type]
        if(oldValue && Object.prototype.toString.call(oldValue) === '[object Object]') {
            this._webpackConfig[item.type] = { ...oldValue , ...item.value}
        } else {
            this._webpackConfig[item.type] = item.value
        }
    }
}

module.exports = WebpackConfig;
