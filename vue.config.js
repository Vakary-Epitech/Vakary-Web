const { defineConfig } = require('@vue/cli-service')
const path = require("path");

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
        @import '@/components/Style/Button.scss';
        @import '@/components/Style/Main.scss';
        @import '@/components/Style/Position.scss';
        @import '@/components/Style/Text.scss';
        @import '@/components/Style/Image.scss';
        `
      }
    }
  },
  transpileDependencies: true,
  transpileDependencies: ['vuex-persist'],
  publicPath: './',
  pluginOptions: {
    vuetify: {},
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
        extensions: ['.scss', '.js', '.vue', '.json', '.png', '.svg', '.jpg', '.jpeg', '.gif'],
      },
    },
  },
};
