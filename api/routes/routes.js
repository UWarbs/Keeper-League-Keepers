'use strict';
var Joi    = require('joi');
var Player = require('../models/Player');
var Abbreviations = require('../config/abbreviations');

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
			method: 'POST',
			path: '/api/new-player',
			handler: function(req, res) {
				var data = req.payload;
				var positionAbbrev = Abbreviations.position(data.position);
				var teamAbbrev = Abbreviations.team(data.team);
				//TODO: set team and position abbrev
				//TODO: Validation ... joi?
				knex('players').insert({
					first_name: data.firstName,
					last_name: data.lastName,
					position: data.position,
					position_abbrev: positionAbbrev,
					team: data.team,
					team_abbrev: teamAbbrev,
					rating: data.rating,
					age: data.age,
					experience: data.experience,
					writeup: data.writeup
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
