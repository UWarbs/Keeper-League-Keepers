// Create a basic Hapi.js server
var Hapi       = require('hapi');
var dateFormat = require('dateformat');
var request    = require('request');
var format     = "dd mmm HH:MM:ss";

// Basic Hapi.js connection stuff
var server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000
});

// Register the inert and vision Hapi plugins
// As of Hapi 9.x, these two plugins are no longer
// included in Hapi automatically
// https://github.com/hapijs/hapi/issues/2682
server.register([{
  register: require('inert')
}, {
  register: require('vision')
}], function(err) {

  if (err) return console.error(err);

    // Add the React-rendering view engine
    server.views({
        engines: {
            jsx: require('hapi-react-views')
        },
        relativeTo: __dirname,
        path: 'app/views'
    });

    // Add a route to serve static assets (CSS, JS, IMG)
    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: 'assets',
          index: ['index.html']
        }
      }
    });

    // Add main app route
    server.route({
      method: 'GET',
      path: '/',
      handler: {
      	view: 'default'
      }
      // handler: function(req, reply) {
      // 	request('http://api.cbssports.com/fantasy/sports/sport/NCAAF?version=3.0', function(error, response, body){
	     //    console.log("Request received");
	        

	     //    if(error) {
	     //    	console.error('ERROR');
	     //    	console.log(error);
	     //    }
	     //    console.log(response);
	     //    console.log(response.statusCode);
      // 	});
      // }
    });

    server.start(function() {
      console.log(dateFormat(new Date(), format) + ' - Server started at: ' + server.info.uri);
    });

});