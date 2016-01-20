'use strict';
var bcrypt = require('bcrypt');
var Joi    = require('joi');
var jwt    = require('jsonwebtoken');
var _      = require('lodash');

var config = require('../../config');
var Player = require('../models/Player');

function createToken(user) {
	return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 300 }); //expiresIn uses seconds
}

function getUsers(knex) {
	knex.select().table('users')
	.then(function(users) {
		return users;
	}).catch(function(err) {
		console.error(err);
		return err;
	})
}

function addNewUser(knex, user) {
	console.log('ADD NEW FUNC');
	console.log(user);
	//bcrypt password here.
	
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(user.password, salt, function(err, hash) {

			console.log('HASH');
			console.log(hash);

			knex('users').insert({
				username: user.username,
				password: hash,
			}).then(function(data) {
				console.log('succesful user creation');
			}).catch(function(err) {
				console.log(err);
			});

		});
	});


}

function userConfig(payload) {
  
  var username;
  var type;
  var userSearch = {};

  // The POST contains a username and not an email
  if(payload.username) {
    username = payload.username;
    type = 'username';
    userSearch = { username: username };
  }
  // The POST contains an email and not an username
  else if(payload.email) {
    username = payload.email;
    type = 'email';
    userSearch = { email: username };
  }

  return {
    username: username,
    type: type,
    userSearch: userSearch
  }
}

exports.register = function(server, options, next) {
	var knex = options.db; 
	
	server.route([
	  // User-create route
	  {
	  	method: 'POST',
	  	path: '/user-create',
	  	handler: function(req, res){

	  		var user = userConfig(req.payload);

	  		if(req.payload.username && req.payload.password) {
					var users;
					knex.select().table('users')
					.then(function(data) {
						users = data;

					  if (_.find(users, user.userSearch)) {
					   return res({status: 'A user with that username already exists!'});
					  }

					  var profile = _.pick(req.payload, user.type, 'password', 'extra');

					  addNewUser(knex, profile);
					  
					  return res({
					  	status: 201,
					  	id_token: createToken(profile)
					  });  

					}).catch(function(err) {
						console.error(err);
						return err;
					});		
	  		
	  		}else {
	  			return res({status: 'Needs username AND password'});
	  		}
	  	}
	  },
	  
	  // User-login route
	  {
	  	method: 'POST',
	  	path: '/sessions/create',
	  	handler: function(req, res){
	  		var userScheme = userConfig(req.payload);
	  		
	  		if(req.payload.username && req.payload.password) {
					var users;
					knex.select().table('users')
					.then(function(data) {
						users = data;
						console.log('all users');
						console.log(users);			
						
						var user = _.find(users, userScheme.userSearch);

						var correctPassword = bcrypt.compareSync(req.payload.password, user.password); 
						console.log('checking pw...');
						console.log(correctPassword);
					  
					  if (!user) {
					  	console.log('didnt find user');
					    return res({status: 401, message: 'Username or password do not match', user: user});
					  }			
					  
					  if (!correctPassword) {
					  	console.log('wrong password');
					    return res({status: 401, message: 'Username or password do not match'});
					  }

					  return res({
					  	status: 201,
					  	id_token: createToken(user)
					  }); 


					}).catch(function(err) {
						console.error(err);
						return err;
					});
					
	  		}else {
	  			return res({status: 'Needs username AND password'});
	  		}
	  	}
	  },
	]);
	next();
}

exports.register.attributes = {
    name: 'auth-routes',
    version: '1.0.1'
};