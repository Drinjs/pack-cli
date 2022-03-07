const Config = require('./Config')

const externalType = {
    NORMAL: 'normal', // 正常打包到 bundle 里
    EXTERNAL: 'external', // 外部扩展 比如 amd 直接使用 cdn
    WINDOW: 'window'
}

class ExternalConfig extends Config {
    constructor(item) {
        super('external', item)
        this._webpackConfig = null
    }

    get webpackConfig() {
        return this._webpackConfig
    }

    set webpackConfig(item) {
        // 开启watch模式
        if(this.config) {
            const webpackInstance = new SingletonWebpackFactroy()
            webpackInstance.webpackConfig = item
        }
    }

    getExternalConfig(type) {
        let config = {}
        if(type === externalType.EXTERNAL) {
            // 若打包到外链 配置对应的vue vuex element-ui到外链即可
            // root全局变量访问library
            // amd requirejs为代表的define require模式加载模块
            // tips: 需要webpackconfig.output指定libraryTarget: umd 
            config = {
                vue: {
                    root: 'Vue',
                    commonjs: 'vue',
                    commonjs2: 'vue',
                    amd: 'https://cdn.jsdelivr.net/npm/vue'
                },
                vuex: {
                    root: 'Vuex',
                    commonjs: 'vuex',
                    commonjs2: 'vuex',
                    amd: 'https://cdn.jsdelivr.net/npm/vuex'
                },
                'element-ui': {
                    root: 'Element',
                    commonjs: 'element-ui',
                    commonjs2: 'element-ui',
                    amd: 'https://cdn.jsdelivr.net/npm/element-ui'
                }
            }
        } else if (type === externalType.WINDOW) {
            // 删除一些引用css 重新定义require import 改成从window上取等骚操作时
        }
    }
}

module.exports = ExternalConfig;
