const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
//var MiniCssExtractPlugin = require('mini-css-extract-plugin')
const safePostCssParser = require('postcss-safe-parser')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const shouldUseSourceMap = false//process.env.GENERATE_SOURCEMAP !== 'false';

const isEnvProduction = process.env.PROD == 'true';

console.log('Mode:', isEnvProduction ? 'production' : 'development')

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      master: path.resolve(__dirname, './src'),
    }
  },
  entry: {
    master: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public', 'client'),    
    publicPath: '/client/',
    sourceMapFilename: 'bundle.map'
  },
  devtool: '#source-map',
  module: {
    strictExportPresence: true,
    rules: [
      { 
        test: /\.(css)$/, 
        use: [
          'style-loader',
          { 
            loader: 'css-loader', 
            options: { importLoaders: 1 } 
          }
        ]
      },
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/, 
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react'],
            plugins: [
              '@babel/transform-runtime',
              '@babel/proposal-object-rest-spread', 
              '@babel/proposal-class-properties']
          }
        }]
      },
      { 
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg|obj|mtl)$/, 
        use: [{
          loader: 'file-loader', 
          options: {
            name: '[hash].[ext]',
            publicPath: 'client/'
          }
        }]
      }
    ]
  },
  optimization: {
    minimize: isEnvProduction ? true : false,
    minimizer: [
      new TerserPlugin({
        cache: true,
        //parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          warnings: false,
          parse: {
            ecma: 8,
          },
          compress: {
            drop_console: true,
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending futher investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          module: false,
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },/*
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: true,
          keep_fnames: false,
          safari10: false,
          */
        }
      }),
      /*
      new UglifyJsPlugin({
        uglifyOptions: {
          cache: true,
          parallel: true,
          uglifyOptions: {
            compress: false,
            ecma: 6,
            mangle: true
          },
          sourceMap: true
        },
      })
      */
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: true
            ? {
                // `inline: false` forces the sourcemap to be output into a
                // separate file
                inline: false,
                // `annotation: true` appends the sourceMappingURL to the end of
                // the css file, helping the browser find the sourcemap
                annotation: true,
              }
            : false,
        },
      }),
    ],
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    /*
    splitChunks: {
      chunks: 'all',
      name: 'master',
    },
    */
    
    
    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    //runtimeChunk: true,
  },

  mode: isEnvProduction ? 'production' : 'development',
  
  //Debug options
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
    poll: 1000
  },
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  }
}