// Part of Assignment 2 - Cluster and Cloud Computing (COMP90024) Group 5

// Author:

// Xinhao Chen 1230696 Melbourne
// Weimin Ouyang 340438 Melbourne
// Tianqi Yu 1221167 China
// Junjie Xia 1045673 China
// Yuling Zheng 954408 Melbourne

const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
    // '/api': replace 'target' to /api
    // target: url want to replace
    // changeOrigin: change header
    app.use(createProxyMiddleware('/api', {
        target: 'http://172.26.134.129:8000',
        secure: false,
        changeOrigin: true,
        pathRewrite: { 
            '^/api': ''}, //remove to ensure the address is normal
    }))
}
