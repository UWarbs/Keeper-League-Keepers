// Webpack config file
module.exports = {
  entry: './app/assets/js/components/index.jsx',
  output: {
    path: __dirname + '/assets/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/,
        loader: 'jsx-loader'
      }
    ]
  },
};

module.exports.node = {
  child_process: 'empty',
  fs: 'empty'
}