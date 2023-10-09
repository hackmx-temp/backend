if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  MYSQLDB_HOST: process.env.MYSQLDB_HOST,
  MYSQLDB_USER: process.env.MYSQLDB_USER,
  MYSQLDB_PASSWORD: process.env.MYSQLDB_PASSWORD,
  MYSQLDB_ROOT_PASSWORD: process.env.MYSQLDB_ROOT_PASSWORD,
  MYSQLDB_DATABASE: process.env.MYSQLDB_DATABASE,
  MYSQLDB_LOCAL_PORT: process.env.MYSQLDB_LOCAL_PORT,
  MYSQLDB_DOCKER_PORT: process.env.MYSQLDB_DOCKER_PORT,
  NODE_LOCAL_PORT: process.env.NODE_LOCAL_PORT,
  NODE_DOCKER_PORT: process.env.NODE_DOCKER_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  SWAGGER_PATH: `../config/swagger/${process.env.SWAGGER_DOC}.json`

};