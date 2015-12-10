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
		  path: '/api/all-players',
		  handler: function(req, res) {
		  	knex.select().table('players')
		  		.then(function(players) {
		  			return res(players);
		  		}).catch(function(err) {
		  			console.log(err);
		  			return err;
		  		});
		  }
		},

		{
			method: 'GET',
			path: '/api/new-player',
			handler: function(req, res) {
				knex('players').insert({
					first_name: 'Matt',
					last_name: 'Stafford',
					position: 'Quarterback',
					position_abbrev: 'QB',
					team:'Detroit Lions',
					team_abbrev: 'DET',
					rating: 89,
					age: 28,
					experience:6
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
