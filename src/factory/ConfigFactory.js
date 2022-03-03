const WatchConfig = require('../config/WatchConfig')
const ExternalConfig = require('../config/ExternalConfig')
const PluginConfig = require('../config/PluginConfig')
const WebapckConfig = require('../config/WebpackConfig')

const configMap = new Map()
class ConfigFactory {
    static {
        configMap.set('watch', new WatchConfig())
        configMap.set('plugin', new PluginConfig())
        configMap.set('external', new ExternalConfig())
        configMap.set('webpack', new WebapckConfig())
        console.log('static configFactory: ', configMap)
    }

    static getConfig(type) {
        return configMap.get(type)
    }

    static setConfig(type, item) {
        const configInstance = configMap.get(type)
        configInstance.config = item
        configInstance.webpackConfig = {
            type,
            value: item
        }
    }
}

console.log(ConfigFactory)
module.exports = ConfigFactory
