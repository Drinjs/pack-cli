const Pack = require('./core/Pack')

function prePack(mod, command) {
    return new Pack(mod, command)
}

function pack(mod, command) {
    const prepackInstance = prePack(mod, command);
    prepackInstance.doPack();
    // afterPack(mod, command);
}

module.exports = pack
