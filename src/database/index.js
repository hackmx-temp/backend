const { Sequelize } = require('sequelize');

/*
// Option 1: Passing a connection URI
const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

*/
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('hack-mx-db', 'root', 'reumatologia', {
  host: 'localhost',
  dialect:'mysql'
});

module.exports = sequelize