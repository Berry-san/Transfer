const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api', // Specify the API endpoint you want to proxy
    createProxyMiddleware({
      target: 'https://api.transfermelon.com/index.php/v1/api/', // Your API URL
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove the '/api' prefix from the request path
      },
      onProxyReq: (proxyReq) => {
        // Add your custom headers here
        proxyReq.setHeader('x-api-key', 987654)
      },
    })
  )

  app.use(
    '/api2',
    createProxyMiddleware({
      target: 'https://mosquepay.org/mosquepayapi/v1/api/', // Your API 2 URL
      changeOrigin: true,
      pathRewrite: {
        '^/api2': '', // Remove the '/api2' prefix from the request path
      },
      onProxyReq: (proxyReq) => {
        // Add your custom headers here
        proxyReq.setHeader('x-api-key', 987654)
      },
    })
  )
}
