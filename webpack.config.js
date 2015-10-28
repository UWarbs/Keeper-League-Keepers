// Webpack config file
module.exports = {
  entry: './app/assets/js/components/index.jsx',
  output: {
    path: __dirname + '/dist/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/,
        loader: 'jsx-loader'
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      },
      {
      	test: /\.(png|jpg)$/,
      	loader: 'url'
    	}      
    ]
  },
};

module.exports.node = {
  child_process: 'empty',
  fs: 'empty'
}