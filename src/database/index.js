const { Sequelize } = require('sequelize');
const { MYSQLDB_DATABASE,
        MYSQLDB_USER,
        MYSQLDB_PASSWORD,
        MYSQLDB_HOST
        } = require("../config")

/*
// It can be connected via passing a connection URI
const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres
*/

// Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  MYSQLDB_DATABASE,
  MYSQLDB_USER,
  MYSQLDB_PASSWORD, {
    host: MYSQLDB_HOST,
    dialect: 'mysql',
    port: "3306",
  }
);

module.exports = sequelize