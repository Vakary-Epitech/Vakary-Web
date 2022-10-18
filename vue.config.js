const { defineConfig } = require('@vue/cli-service')

const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    },
    configureWebpack: {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, "./src"),
        },
        extensions: ['.js', '.vue', '.json', '.png', '.svg', '.jpg', '.jpeg', '.gif'],
      }
    }
  }
})