module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  coverageProvider: 'v8',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/**/*.{js,vue}',
    'src/**/**/**/*.{js,vue}',
    '!src/store/*.js',
    '!src/router/*.js',
    '!src/plugins/*.js',
    '!src/store/*.js',
    '!src/main.js',
    '!src/App.vue',
  ],
}
