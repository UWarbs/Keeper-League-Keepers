// Create a basic Hapi.js server
var Hapi       = require('hapi');
var dateFormat = require('dateformat');
var request    = require('request');
var format     = "dd mmm HH:MM:ss";

require('babel-core/register')({
    presets: ['react']
});

// Basic Hapi.js connection stuff
var server = new Hapi.Server({debug: {request: ['info', 'error']}});


// Expose database
if (process.env.NODE_ENV === 'development') {
	console.log("DEVELOPMENT DATABASE");
}

server.connection({
  host: 'localhost',
  port: 8000
});

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
			"test": "option"
		}
	}
];

//DEPRECATED
// server.register([
// {
//   register: require('inert')
// }, 
// {
//   register: require('vision')
// }
// ], function(err) {

//   if (err) return console.error(err);

//     // Add the React-rendering view engine
//     server.views({
//         engines: {
//             jsx: require('hapi-react-views')
//         },
//         relativeTo: __dirname,
//         path: 'app/views'
//     });

//     // Add a route to serve static assets (CSS, JS, IMG)
//     server.route({
//       method: 'GET',
//       path: '/{param*}',
//       handler: {
//         directory: {
//           path: 'dist',
//           index: ['index.html']
//         }
//       }
//     });

//     // Add main app route
//     server.route({
//       method: 'GET',
//       path: '/',
//       handler: {
//       	view: 'default'
//       }
//     });

//     server.start(function() {
//       console.log(dateFormat(new Date(), format) + ' - Server started at: ' + server.info.uri);
//     });

// });

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
        if (err) { throw err; }

        server.log('info', 'Server running at: ' + server.info.uri);
    });
});