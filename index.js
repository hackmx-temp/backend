const sequelize = require("./src/database")
const container = require("./src/startup/container");
const server = container.resolve("app");

async function startServer() {
  try {
    await sequelize.sync();
    console.log("All models were synchronized successfully.");
    console.log('Connection to the DB has been established successfully.');
    server.start();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


startServer();
