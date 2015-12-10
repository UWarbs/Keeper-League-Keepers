'use strict';
var Joi    = require('joi');
var Player = require('../models/Player');

exports.register = function(server, options, next) {
	//Declare Routes
	var knex = options.db; 
	server.route([
		{
			// Add a route to serve static assets (CSS, JS, IMG)
			method: 'GET',
			path: '/{param*}',
			handler: {
				directory: {
					path: 'dist',
					index: ['index.html']
				}
			},
		},
	  // Add main app route
	  {
	  	method: 'GET',
	  	path: '/',
	  	handler: {
	  		view: 'default'
	  	}
	  },
	  
	  {
	    method: 'GET',
		  path: '/api',
		  handler: function(req, res) {
		  	var allPlayers;
		  	
		  	knex.select().table('players')
		  		.then(function(players) {
		  			allPlayers = players;
		  			return res(allPlayers);
		  			//Give players to PlayerStore here.
		  		}).catch(function(err) {
		  			console.log(err);
		  			//give error to PlayerStore
		  		});

				
		  }
		},

		{
			method: 'GET',
			path: '/api/new-writeup',
			handler: function(req, res) {
				knex('players').insert({
					first_name: 'Russell',
					last_name: 'Wilson',
					position: 'Quarterback',
					position_abbrev: 'QB',
					team:'Seattle Seahawks',
					team_abbrev: 'SEA',
					rating: 98,
					age: 26,
					experience:4
				}).then(function(data) {
					console.log('succesful insert');
					return res(data);
				}).catch(function(err) {
					console.log(err);
					return res(err);
				});
			}
		}

	]);
	next();
}

exports.register.attributes = {
    name: 'routes',
    version: '1.0.1'
};
