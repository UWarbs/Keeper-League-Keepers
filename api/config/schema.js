"use strict";
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : 'keepers'
  }
});

module.exports = knex;

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
//   table.integer('rating');
//   table.integer('age')
//   table.integer('experience');
// 	table.timestamp('created_at').defaultTo(knex.fn.now())
// })
// .createTable('writeups', function(table) {
//   table.increments('id');
//   table.string('player_first_name');
//   table.string('player_last_name');
//   table.string('body');
//   table.integer('player_id').unsigned().references('players.id');
// 	table.timestamp('created_at').defaultTo(knex.fn.now())
// }).catch(function(e) {
// 	console.error(e);
// });


//UPDATE TABLE
// knex.schema.table('players', function(table) {
// 	table.timestamp('updated_at').defaultTo(knex.fn.now())
// })
// .catch(function(e) {
// 	console.error(e);
// });