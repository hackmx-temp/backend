const { Sequelize } = require('sequelize');
const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DIALECT } = require("../config")

/*
// Option 1: Passing a connection URI
const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

*/
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASS, {
    host: DB_HOST,
    dialect: DIALECT
  }
);

module.exports = sequelize