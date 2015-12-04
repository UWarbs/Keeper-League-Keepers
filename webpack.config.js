// Webpack config file
module.exports = {
  entry: './app/assets/js/components/index.jsx',
  output: {
    path: __dirname + '/dist/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
	      test: /\.jsx?$/,
	      exclude: /(node_modules|bower_components)/,
	      loader: 'babel',
	      query: {
	        presets: ['react', 'es2015']
	      }
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