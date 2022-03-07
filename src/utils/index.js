const chalk = require('chalk') 
const ora = require('ora')

class PackHanlder {
    static errorHandler(msg) {
        console.log(chalk.red('Error packer: ', msg))
    }

    static warnHandler(msg) {
        console.warn(chalk.orange('Warn packer: ', msg))
    }

    static oraHandler(plugins) {
        const spinner = ora(`Building module: ${plugins.toString() || 'All Modules'}\n`).start()
        return spinner
    }
}

moudule.exports = {
    PackHanlder
}