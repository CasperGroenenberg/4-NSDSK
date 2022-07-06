const path = require('path')
module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  transpileDependencies: ['quasar'],
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, '@/assets/base.scss')]
    },
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },

  chainWebpack: config => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .options({
        fix: true
      })
  }
}
