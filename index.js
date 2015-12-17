// Create a basic Hapi.js server
var Hapi       = require('hapi');
var dateFormat = require('dateformat');
var request    = require('request');
var routes 	 	 = require('./api/routes/routes');
var format     = "dd mmm HH:MM:ss";
var Player     = require('./api/models/Player');
var knex       = require('./knexfile');
require('babel-core/register')({
    presets: ['react']
});

var server = new Hapi.Server({debug: {request: ['info', 'error']}});

server.connection({
  host: 'localhost',
  port: process.env.PORT || 8000
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
	  // console.log(process.env.LOCAL_PORT);
	});
});
