function webpackPlugin(context, options) {
  return {
    name: 'webpack-plugin',
    configureWebpack(config, isServer, { currentBundler }) {
      const webpack = require('webpack');
      
      return {
        module: {
          rules: [
            {
              test: /\.m?js/,
              resolve: {
                fullySpecified: false,
              },
            },
            {
              test: /\.ya?ml$/,
              type: 'asset/source',
            },
          ],
        },
        plugins: [
          new webpack.ProvidePlugin({
            process: require.resolve('process/browser'),
          }),
        ],
        resolve: {
          fallback: {
            stream: require.resolve('stream-browserify'),
            path: require.resolve('path-browserify'),
            buffer: require.resolve('buffer/'),
            url: require.resolve('url'),
            crypto: false,
          },
          alias: {
            process: 'process/browser.js',
          },
        },
        // Add dev server proxy for CORS handling
        devServer: {
          proxy: {
            '/api-proxy': {
              target: 'https://api.adapty.io',
              changeOrigin: true,
              pathRewrite: {
                '^/api-proxy': '',
              },
              onProxyReq: function(proxyReq, req, res) {
                // Add CORS headers to the response
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, adapty-customer-user-id, adapty-profile-id, adapty-platform');
                res.setHeader('Access-Control-Allow-Credentials', 'true');
              },
              onProxyRes: function(proxyRes, req, res) {
                // Add CORS headers to the response
                proxyRes.headers['Access-Control-Allow-Origin'] = '*';
                proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
                proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, adapty-customer-user-id, adapty-profile-id, adapty-platform';
                proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
              },
            },
          },
        },
      };
    },
  };
}

module.exports = {
  webpackPlugin,
};
