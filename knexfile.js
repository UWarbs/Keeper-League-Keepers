var knex = require('knex')({
  client: 'mysql',
  connection: process.env.DATABASE_URL || {
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : 'keepers'
  }
});

module.exports = knex;