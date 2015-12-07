'use strict';

//Site Routes
var Joi = require('joi');

exports.register = function(server, options, next) {
	//Declare Routes
	
	server.route([
		// Add a route to serve static assets (CSS, JS, IMG)
	  {
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
	  }
	]);
	next();
}

exports.register.attributes = {
    name: 'routes',
    version: '1.0.1'
};
