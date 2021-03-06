import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'production'
process.env.BABEL_ENV = LAUNCH_COMMAND

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist'),
}

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${PATHS.app}/index.html`,
  filename: 'index.html',
  inject: 'body',
})

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
})

const base = {
  entry: [
    PATHS.app,
  ],
  output: {
    path: PATHS.build,
    filename: 'index_bundle.js',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, include: /app/, loader: 'babel' },
      { test: /\.css$/, include: /sanitize.css/, loaders: ['style?sourceMap', 'css?sourceMap'] },
      {
        test: /\.scss$/,
        include: /app/,
        exclude: /\/styles\//,
        loaders: [
          'style?sourceMap',
          'css?sourceMap&modules&camelCase=dashes&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss?sourceMap',
          'sass?sourceMap',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
    root: path.resolve('./app'),
  },
}

const developmentConfig = {
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: PATHS.build,
    hot: true,
    inline: true,
    progress: true,
  },
  plugins: [HtmlWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()],
}

const productionConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [HtmlWebpackPluginConfig, productionPlugin],
}

export default Object.assign({}, base, isProduction ? productionConfig : developmentConfig)
