const { createProxyMiddleware } = require("http-proxy-middleware");

// cors 문제 해결 위한 proxy 설정
module.exports = function(app){
    app.use(
        '/api',
        createProxyMiddleware({
            target: "http://localhost:80",
            changeOrigin: true
        })
    );
};