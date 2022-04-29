const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
    // '/api': replace 'target' to /api
    // target: url want to replace
    // changeOrigin: change header
    app.use(createProxyMiddleware('/api', {
        target: 'http://localhost:8080',
        changeOrigin: true
    }))
}