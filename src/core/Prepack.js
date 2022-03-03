const ConfigFactory = require('../factory/ConfigFactory')

class Prepack {
    constructor(mod, command) {
        this._mod = mod
        this._command = command
        this.initPlugin(mod)
        this.initConfig(command)
    }

    initConfig(command) {
        const options = command.options
        for(let option of options) {
            const key = option.long.slice(2)
            ConfigFactory.setConfig(key, command[key])
        }
    }

    initPlugin(mod) {
        debugger
        ConfigFactory.setConfig('plugin', mod)
    }

    // preWebpackConfig() {
    //     return ConfigFactory.getConfig('webpack')
    // }
}

module.exports = Prepack
