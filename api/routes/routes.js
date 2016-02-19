'use strict';
var Joi = require('joi');
var jwt = require('jsonwebtoken');
var _   = require('lodash');

var Abbreviations = require('../config/abbreviations');
var Player = require('../models/Player');

exports.register = function(server, options, next) {
	//Declare Routes
	var knex = options.db; 
	
	server.route([
		{
			// Add a route to serve static assets (CSS, JS, IMG)
			method: 'GET',
			path: '/{param*}',  //how this works in hapi is that every route is tested and if none match it will go to routes wrapped in brackets
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
	  	path: '/top/{pos}',
	  	handler: {
	  		view: 'default'
	  	}
	  },
	  
	  {
	  	method: 'GET',
	  	path: '/admin/{path}',
	  	handler: {
	  		view: 'default'
	  	}
	  },

	  {
	  	method: 'GET',
	  	path: '/login',
	  	handler: {
	  		view: 'default'
	  	}
	  },

	 	{
	  	method: 'GET',
	  	path: '/blog',
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
		  path: '/api/all-blogs',
		  handler: function(req, res) {
		  	knex.select().table('blogs').orderBy('id', 'desc')
		  		.then(function(blogs) {
		  			return res(blogs);
		  		}).catch(function(err) {
		  			console.log(err);
		  			return err;
		  		});
		  }
		},

		{
			method: 'GET',
			path: '/api/player/{id}',
			handler: function(req, res) {
				var id = encodeURIComponent(req.params.id);
				knex('players').where('id', id)
				.then(function(player) {
					return(res(player));
				}).catch(function(err){
					console.log(err);
					return res(err);
				});

			}
		},

		{
			method: 'GET',
			path: '/api/top/{position}',
			handler: function(req, res) {
				var position = encodeURIComponent(req.params.position);
				var pos = position.toUpperCase();
				//TODO: make 10 constant or a param.
				knex('players').where('position_abbrev', pos).orderBy('rating', 'desc').limit(10)
					.then(function(players) {
						return res(players)
					}).catch(function(err) {
						console.error(err);
						return err;
					})
			}
		},

		{
			method: 'GET',
			path: '/api/blog/{id}',
			handler: function(req, res) {
				var id = encodeURIComponent(req.params.id);
				knex('blogs').where('id', id)
				.then(function(blog) {
					return(res(blog));
				}).catch(function(err){
					console.log(err);
					return res(err);
				});

			}
		},

		{
			method: 'POST',
			path: '/api/new-blog',
			handler: function(req, res) {
				var data = req.payload;
				//TODO: Validation ... joi?
				knex('blogs').insert({
					author: data.author,
					title: data.title,
					content: data.content
				}).then(function(data) {
					console.log('succesful blog insert');
					return res(data);
				}).catch(function(err) {
					console.log(err);
					return res(err);
				});
			}
		},
		
		{
			method: 'POST',
			path: '/api/edit-blog/{id}',
			handler: function(req, res) {
				var data = req.payload;
				var id = encodeURIComponent(req.params.id);
				knex('blogs')
				.where('id', id)
				.update({
					author: data.author,
					title: data.title,
					content: data.content,
				}).then(function(data) {
					console.log('succesful update');
					return res(data);
				}).catch(function(err) {
					console.log(err);
					return res(err);
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
		},
		{
			method: 'POST',
			path: '/api/edit-player/{id}',
			handler: function(req, res) {
				var data = req.payload;
				var id = encodeURIComponent(req.params.id);
				var positionAbbrev = Abbreviations.position(data.position);
				var teamAbbrev = Abbreviations.team(data.team);
				//TODO: Validation ... joi?
				knex('players')
				.where('id', id)
				.update({
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
					console.log('succesful update');
					return res(data);
				}).catch(function(err) {
					console.log(err);
					return res(err);
				});
			}
		},
		{
			method: 'DELETE',
			path: '/api/delete/{id}',
			handler: function(req, res) {
				var id = encodeURIComponent(req.params.id);
				knex('players').where('id', id).del()
				.then(function(data) {
					//data = true/1 if success
					return res(data);
				}).catch(function(err) {
					console.error(error);
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
