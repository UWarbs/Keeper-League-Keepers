"use strict";



// knex.schema.createTable('players', function(table) {
//   table.increments('id');
//   table.string('first_name');
//   table.string('last_name');
//   table.string('position');
//   table.string('position_abbrev');
//   table.string('team');
//   table.string('team_abbrev');
// 	 table.string('writeup');
//   table.integer('rating');
//   table.integer('age')
//   table.integer('experience');
// 	 table.timestamp('created_at').defaultTo(knex.fn.now())
//   table.timestamp('updated_at').defaultTo(knex.fn.now())
// }).catch(function(e) {
// 	console.error(e);
// });


// knex.schema.createTable('users', function(table) {
//   table.increments('id');
//   table.string('username');
//   table.string('email').unique();
//   table.string('password', 60);
// 	 table.timestamp('created_at').defaultTo(knex.fn.now())
//   table.timestamp('updated_at').defaultTo(knex.fn.now())
// }).catch(function(e) {
// 	console.error(e);
// });



//Maybe for images there will need to be ability to add array of images.

// knex.schema.createTable('blogs', function(table) {
//   table.increments('id');
//   table.string('author').notNullable();
//   table.string('title').notNullable().unique();
//   table.string('content').notNullable();
// 	 table.timestamp('created_at').defaultTo(knex.fn.now())
//   table.timestamp('updated_at').defaultTo(knex.fn.now())
// }).catch(function(e) {
// 	console.error(e);
// });