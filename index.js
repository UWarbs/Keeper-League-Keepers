var dateFormat = require('dateformat');
var format     = "dd mmm HH:MM:ss";
var fs    	   = require('fs');
var Hapi       = require('hapi');
var path 			 = require('path');
var request    = require('request');
var knex       = require('./knexfile');
var Player     = require('./api/models/Player');
var routes 	 	 = require('./api/routes/routes');


require('babel-core/register')({
    presets: ['react']
});
var isDevelopment = (process.env.NODE_ENV !== 'production');
var server = new Hapi.Server(
	{
		debug: {request: ['info', 'error']}
	}, 
	{
		cors: {origin: '*'}
	}
);

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
	},
	{
		register: require('./api/routes/auth.js'),
		options: {
			"db": knex
		}
	}
];

/*
addPlayersToDB();

function addPlayersToDB() {
	var data = fs.readFileSync('parsedPlayers.json');
	var players =  JSON.parse(data);

	for (var i = 0; i < players.length; i++) {
		var player = players[i];
		knex('players').insert({
			first_name: player.firstName,
			last_name: player.lastName,
			position: player.pos,
			team: player.team,
			rating: player.rating,
			age: player.age
		}).then(function(player) {
			console.log('succesful insert');
		}).catch(function(err) {
			console.log(err);
		});
	}
}
*/

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



//reasons why i stopped working on this
// relies soley on user created content and subjective ranking.

//reason why im starting again
// -Use it as practice to model value/rank of players in current year and next years...  2017, 2018, 2019, 2020, 2021 probably.
// factors: retirement, injuries, team, other players on team etc.
// - This means the site would add value without outside content. Also a great way to practice. 
// - Also show results of previous year.. ex: 2016: I project 11/100 best receiver. Actual: 27th/100 ... my bad.