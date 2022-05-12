const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
    // '/api': replace 'target' to /api
    // target: url want to replace
    // changeOrigin: change header
    app.use(createProxyMiddleware('/api', {
        target: 'http://172.26.134.129/:8000',
        secure: false,
        changeOrigin: true,
        pathRewrite: { '^/api': '' } //remove to ensure the address is normal
    }))
}