const WatchConfig = require('../config/WatchConfig')
const ExternalConfig = require('../config/ExternalConfig')
const PluginConfig = require('../config/PluginConfig')
const WebpackFactory = require('./WebpackFactory')

const configMap = new Map()
class ConfigFactory {
    static {
        configMap.set('watch', new WatchConfig())
        configMap.set('plugin', new PluginConfig())
        configMap.set('external', new ExternalConfig())
        configMap.set('webpack', new WebpackFactory())
    }

    static getConfig(type) {
        return configMap.get(type)
    }

    static setConfig(type, item) {
        let configInstance = configMap.get(type)
        if(!configInstance) {
            configInstance = configMap.get('webpack')
        }
        configInstance.config = item
        configInstance.webpackConfig = {
            type,
            value: item
        }
    }
}

module.exports = ConfigFactory
