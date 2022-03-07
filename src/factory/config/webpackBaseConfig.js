const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const VueTemplateCompiler = require(path.join(process.cwd(), 'node_modules/vue-template-compiler'))
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    entry: {}, // 动态获取
    output: {
      filename: '[name]/index.js', // TODO 加上hash和版本
      chunkFilename: '[name].js', // code spliting 出来的代码 需要在外面动态添加一层 `modName` 这样不需要用户自己写
      path: path.join(process.cwd(), './modules'),
      publicPath: '/',
      library: '[name]', // 模块名 为模块文件夹的名字
      libraryTarget: 'umd',
      umdNamedDefine: true // amd 定义的时候加上模块名
    },
    // TODO 把vue打出去会报错 $isServer那边
    externals: {}, // 动态设置
    resolve: {
      modules: [
        'node_modules', // 使用相对路径 webpack 会一级一级的往上查找，使用绝对路径则不会
        path.join(__dirname, '../node_modules'), // 为脚手架的 node_modules 打包一些babel相关的polyfill 比如 promise
        path.join(process.cwd(), './node_modules') // 为本身工程里面的 node_modules 使用根目录的依赖包
      ]
    },
    module: {
      // noParse: /es6-promise\.js$/, // 对一些没有使用模块化的库，或者使用闭包的库可以不需要parse
      rules: [
        // 禁止使用老的异步加载方法require.ensure
        { parser: { requireEnsure: false } },

        // babel-loader
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      ie: '11'
                    }
                  }
                ]
              ],
              plugins: [
                require('./auto-add-prefetch'),
                // @babel/preset-env 会包含该插件 用于解析动态import语法成promise 如果有动态import 需要手动加一下promise的polyfill
                // https://www.babeljs.cn/docs/babel-plugin-syntax-dynamic-import
                // '@babel/plugin-syntax-dynamic-import',
                '@vue/babel-plugin-transform-vue-jsx'
              ]
            }
          }
        },

        // vue-loader
        {
          test: /\.vue$/,
          loader: require.resolve('vue-loader'),
          // TODO consider if use cache-loader reference vue-cli
          options: {
            // 指定 vue-template-compiler 为项目里的 
            compiler: VueTemplateCompiler,
            compilerOptions: {
              preserveWhitespace: false
            }
          }
        },
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new FriendlyErrorsPlugin(),

      // MiniCssExtractPlugin 配置项为 webpack.output 的配置覆写
      new MiniCssExtractPlugin({
        filename: '[name]/index.css'
      })
    ]
}
