class Config {
    constructor(key, val) {
        this.packs = key
        this._config = val
        this._options = {}
    }

    get config() {
        return this._config
    }

    set config(item) {
        this._config = item
    }

    get options() {
        return this._options
    }

    set options(item) {
        this._options[item.type] = item.value
    }
}

module.exports = Config
