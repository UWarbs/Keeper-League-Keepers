'use strict';
var Joi    = require('joi');
var Player = require('../models/Player');

exports.register = function(server, options, next) {
	//Declare Routes
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
		  	models.Player.findAll({
		  		attributes: ['firstName', 'lastName']
		  	}).then(function(players) {
		  		res({'players': players});
		  	});
		  }
		},

		{
			method: 'POST',
			path: '/api/new-writeup',
			handler: function(req, res) {
				res('worked');
				Player.create({
					id: 5,
					firstName:'Blaine',
					lastName: 'Gabbert',
					age: 26,
					positionalRating: 80,
					position: 'Quarter Back',
					positionAbbrev: 'QB',
					team: 'San Francisco 49ers',
					teamAbbrev: 'SF'
				}).then(function(player) {
					res('worked');
					console.log(player.get({plain: true}));
				});
				res('worked');
			}
		}

	]);
	next();
}

exports.register.attributes = {
    name: 'routes',
    version: '1.0.1'
};
