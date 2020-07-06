module.exports = {
  chainWebpack: config => {
    devServer: {
      port: 8080
    }
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Weskool | Share your path with the world'
        return args
      })
  },
  transpileDependencies: ["vuetify"]
};
