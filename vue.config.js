module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/shopping-cart-vue/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/base.scss";`
      }
    }
  }
}