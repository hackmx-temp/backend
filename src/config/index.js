if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
    PORT: process.env.PORT,
    APPLICATION_NAME: process.env.APPLICATION_NAME
};