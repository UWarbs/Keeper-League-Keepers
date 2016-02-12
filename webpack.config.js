var path = require('path');
// Webpack config file
module.exports = {
  entry: './app/assets/js/components/index.jsx',
  output: {
  	devtool: 'source-map',
    path: path.join(__dirname + '/dist/js'),
    filename: 'bundle.js',
    publicPath: '/dist/'
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
    ],
    noParse: /node_modules\/quill\/dist/
  },
};

module.exports.node = {
  child_process: 'empty',
  fs: 'empty'
}