const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const CompressionPlugin = require('compression-webpack-plugin')

odule.exports = {
  "configureWebpack": {
    plugins: [new CompressionPlugin,],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
      },
    },
    // plugins: [new BundleAnalyzerPlugin()]
  },
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
