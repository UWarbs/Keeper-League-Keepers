var dateFormat = require('dateformat');
var format     = "dd mmm HH:MM:ss";
var Hapi       = require('hapi');
var knex       = require('./knexfile');
var path 			 = require('path');
var Player     = require('./api/models/Player');
var request    = require('request');
var routes 	 	 = require('./api/routes/routes');
knex.schema.createTable('players', function(table) {
  table.increments('id');
  table.string('first_name');
  table.string('last_name');
  table.string('position');
  table.string('position_abbrev');
  table.string('team');
  table.string('team_abbrev');
  table.integer('rating');
  table.integer('age')
  table.integer('experience');
	table.timestamp('created_at').defaultTo(knex.fn.now())
}).catch(function(e) {
	console.error(e);
});
require('babel-core/register')({
    presets: ['react']
});

var isDevelopment = (process.env.NODE_ENV !== 'production');
var server 				= new Hapi.Server({debug: {request: ['info', 'error']}});

server.connection({ port: +process.env.PORT || 8000 });

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

  // server.renderToString()
	  
	server.start(function(err) {
	  if (err) { console.log('start errror'); throw err; }
	  server.log('info', 'Server running at: ' + server.info.uri);
	  console.log(process.env.NODE_ENV);
	});
});
