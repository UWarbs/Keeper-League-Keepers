"use strict";



// knex.schema.createTable('players', function(table) {
//   table.increments('id');
//   table.string('first_name').notNullable();
//   table.string('last_name').notNullable();
//   table.string('position').notNullable();
//   table.string('position_abbrev').notNullable();
//   table.string('team').notNullable();
//   table.string('team_abbrev').notNullable();
// 	 table.string('writeup').notNullable();
//   table.integer('rating').notNullable();
//   table.integer('age')
//   table.integer('experience');
// 	 table.timestamp('created_at').defaultTo(knex.fn.now())
//   table.timestamp('updated_at').defaultTo(knex.fn.now())
// }).catch(function(e) {
// 	console.error(e);
// });


// knex.schema.createTable('users', function(table) {
//   table.increments('id');
//   table.string('username').notNullable();
//   table.string('email').notNullable().unique();
//   table.string('password', 60).notNullable();
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