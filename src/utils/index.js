const chalk = require('chalk') 
class PackHanlder {
    constructor(msg, type) {
        this.msg = msg
        this.type = type
    }

    errorHandler() {
        console.log(chalk.red('Error packer: ', this.msg))
    }

    warnHandler() {
        console.warn(chalk.orange('Warn packer: ', this.msg))
    }

    handler() {
        if(this.type === 'error') {
            this.errorHandler()
        }

        if(this.type === 'warn') {
            this.warnHandler()
        }
    }
}

moudule.exports = {
    PackHanlder
}