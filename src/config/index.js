if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_HOST: process.env.DB_HOST,
    DIALECT: process.env.DIALECT,
    APPLICATION_NAME: process.env.APPLICATION_NAME,
    JWT_SECRET: process.env.JWT_SECRET

};