// Create a basic Hapi.js server
var Hapi       = require('hapi');
var dateFormat = require('dateformat');
var request    = require('request');
var routes 	 	 = require('./api/routes/routes');
var format     = "dd mmm HH:MM:ss";
var Player     = require('./api/models/Player');
var knex       = require('./api/config/schema');

require('babel-core/register')({
    presets: ['react']
});

// Basic Hapi.js connection stuff
var server = new Hapi.Server({debug: {request: ['info', 'error']}});

// Expose database
if (process.env.NODE_ENV === 'development') {
	console.log("DEVELOPMENT DATABASE");
}

server.connection({
  host: 'localhost',
  port: 8000
});

var plugins = [
	{
		register: require('inert')
	},
	{
		register: require('vision')
	},
	{
		register: require('./api/routes/routes.js'),
		options: {
			"db": knex
		}
	}
];

server.register(plugins, function (err) {
  if (err) { throw err; }
  // Add the React-rendering view engine
  server.views({
      engines: {
          jsx: require('hapi-react-views')
      },
      relativeTo: __dirname,
      path: 'app/views'
  });
	  
	server.start(function(err) {
	  if (err) { console.log('start errror'); throw err; }
	  server.log('info', 'Server running at: ' + server.info.uri);
	});
});
