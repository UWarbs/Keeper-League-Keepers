// "use strict";
// var knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host     : '127.0.0.1',
//     user     : 'root',
//     password : 'root',
//     database : 'keepers'
//   }
// });

// module.exports = knex;

//CODE TO CREATE TABLES
//TODO: Look into proper way to do this - ask kevin


// Create a table
// knex.schema.createTable('players', function(table) {
//   table.increments('id');
//   table.string('first_name');
//   table.string('last_name');
//   table.string('position');
//   table.string('position_abbrev');
//   table.string('team');
//   table.string('team_abbrev');
//	 table.string('writeup');
//   table.integer('rating');
//   table.integer('age')
//   table.integer('experience');
// 	 table.timestamp('created_at').defaultTo(knex.fn.now())
//   table.timestamp('updated_at').defaultTo(knex.fn.now())
// }).catch(function(e) {
// 	console.error(e);
// });



// UPDATE TABLE
// knex.schema.table('players', function(table) {
// 	table.string('writeup', 500);
// })
// .catch(function(e) {
// 	console.error(e);
// });

//UPDATE PLAYER
// knex('players')
//   .where('first_name', 'Derek')
//   .update({
//     writeup: 'Returning the raiders to glory.'
//   })
//   .catch(function(e) {
// 		console.error(e);
// 	});