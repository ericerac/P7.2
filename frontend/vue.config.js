const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false
})

module.exports = {
  publicPath: process.env.ROUTE === 'production'
    ? '/platzimusic/'
    : '/'
}

module.exports = {
  lintOnSave: false
}