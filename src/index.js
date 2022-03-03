const Prepack = require('./core/Prepack')
const Dopack = require('./core/Prepack')

function prePack(mod, command) {
    return new Prepack(mod, command)
}

function doPack() {
    // Dopack()
}

function pack(mod, command) {
    const prepackInstance = prePack(mod, command);
    // console.log(prepackInstance.preWebpackConfig().webpackConfig)
    doPack(mod, command);
    // afterPack(mod, command);
}

module.exports = pack
