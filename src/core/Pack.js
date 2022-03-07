const { PackHanlder } = require('../utils/index')
const ConfigFactory = require('../factory/ConfigFactory')
const WebpackFactory = require('../factory/WebpackFactory')
const fs = require('fs-extra')
const path = require('path')

class Pack {
    output = path.join(process.cwd(), './modules')
    entryDir = path.join(process.cwd(), './src/modules')
    constructor(mod, command) {
        this._mod = mod
        this._command = command
        this.webpackInstance = this.initWebpack()
        this.initPlugin(mod)
        this.initConfig(command)
    }

    initWebpack() {
        const webpackInstance = new WebpackFactory()
        return webpackInstance
    }

    initConfig(command) {
        const options = command.options
        for(let option of options) {
            const key = option.long.slice(2)
            ConfigFactory.setConfig(key, command[key])
        }
    }

    initPlugin(mod) {
        ConfigFactory.setConfig('plugin', mod)
    }

    mkdirOutput() {
        if(fs.existsSync(this.output)) {
            fs.mkdirSync(this.output)
        }
    }

    setMode() {
        const env = this._command.mode === 'dev' ? 'development' : 'production'
        ConfigFactory.setConfig('mode', env)
    }

    setEntry() {
        let files // 入口目录下所有文件 约定入口目录路径为 src/modules; 根据约定可提供统一的模板，通过shell.exec执行git.clone命令
        if(fs.existsSync(this.entryDir)) {
            PackHanlder.errorHandler('src/modules不存在！')
            process.exit()
        }

        if (!(files = fs.readdirSync(this.entryDir)).length) {
            PackHanlder.errorHandler('插件不存在')
            process.exit()
        }

        files.map(file => {
            const entryPath = path.join(this.entryDir, file)
            const stat = fs.statSync(entryPath)
            if(stat.isDirectory()) {
                if(!fs.existsSync(`${entryPath}/index.js`)) {
                    PackHanlder.errorHandler(`${entryPath} 目录下暂无index.js入口文件！`)
                    process.exit()
                }

                if(!fs.existsSync(`${entryPath}/component.json`)) {
                    PackHanlder.errorHandler(`${entryPath} 目录下暂无component.json配置文件！`)
                    process.exit()
                }

                const componentJson = fs.readJSONSync(path.join(entryPath, 'component.json'))

                if(!componentJson.id) {
                    PackHanlder.errorHandler(`${componentJson.name} 的 component.json id 字段为空，请维护该字段`)
                    process.exit()
                }


                ConfigFactory.setConfig('entry', {
                    [`${componentJson.name}_${component.version}`]:  `${entryPath}/index.js`
                })
            }
        })
        return res
    }

    doPack() {
        this.mkdirOutput()
        this.setMode()
        PackHanlder.oraHandler(this._mod)
        this.setEntry()
    }
}

module.exports = Pack
