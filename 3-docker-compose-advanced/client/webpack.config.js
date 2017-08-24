const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const DIST_DIR = path.resolve(__dirname, 'dist')
const SRC_DIR = path.resolve(__dirname, 'src')

process.traceDeprecation = true

function entryOutput (app) {
  let result = {
    entry: {
      app: path.resolve(SRC_DIR, 'index.jsx'),
      vendor: [
        'babel-polyfill',
        'whatwg-fetch',
        'jquery',
        'bootstrap',
        'react',
        'react-dom',
        'prop-types',
        'redux',
        'react-redux',
        'react-router-dom',
        'redux-thunk',
        'redux-logger'
      ]
    },
    output: {
      filename: '[hash].[name].js',
      path: DIST_DIR,
      publicPath: '/',
      sourceMapFilename: '[file].map'
    }
  }
  return result
}

const developmentBuild = (baseConfig, app) => {
  const devConfig = Object.assign({}, entryOutput(app), {
    devServer: {
      contentBase: path.resolve(__dirname, 'src'),
      // host is needed for running in docker
      host: '0.0.0.0',
      port: 8000,
      historyApiFallback: true,
      noInfo: false,
      stats: 'minimal'
      // proxy: {
      //   '/api': 'http://localhost:9000'
      // }
    }
  })
  return Object.assign({}, baseConfig, devConfig)
}

const productionBuild = (baseConfig, app) => {
  const plugins = [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        warnings: false,
        unused: true,
        dead_code: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    })
  ]
  const overrides = Object.assign({}, entryOutput(app), {
    devtool: 'source-map'
  })
  const config = Object.assign({}, baseConfig, overrides)
  config.plugins = plugins
  return config
}

const build = () => {
  const baseConfig = {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: SRC_DIR,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: 'css-loader'
          })
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff'
            }
          }
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/octet-stream'
            }
          }
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader'
        },
        {
          test: /\.png$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        },
        {
          test: /\.jpg$/,
          loader: 'file-loader'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'mimetype=image/svg+xml'
            }
          }
        }
      ]
    },
    devtool: 'cheap-module-source-map',
    plugins: [
      new webpack.DefinePlugin({
        DP_API_HOST: JSON.stringify(process.env.HOST || 'http://localhost:9000'),
        DP_NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor']
      }),
      new ExtractTextPlugin('[contenthash].styles.css'),
      // Provides access to jquery as global with the following aliases
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      new HtmlWebpackPlugin({
        template: './src/index.ejs'
      // }),
      // new FaviconsWebpackPlugin({
      //   logo: './frontend/static/dte-favicon-192x192.png',
      //   inject: true,
      //   icons: {
      //     android: true,
      //     appleIcon: true,
      //     appleStartup: true,
      //     coast: false,
      //     favicons: true,
      //     firefox: false,
      //     opengraph: false,
      //     twitter: false,
      //     yandex: false,
      //     windows: false
      //   }
      })
    ]
  }

  switch (process.env.NODE_ENV) {
    case 'development':
      return developmentBuild(baseConfig, process.env.APP)
    case 'production':
      return productionBuild(baseConfig, process.env.APP)
    default:
      return developmentBuild(baseConfig, process.env.APP)
  }
}

module.exports = build
