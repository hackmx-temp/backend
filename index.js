const container = require("./src/startup/container");
const server = container.resolve("app");

const mysql = require('mysql2/promise');

async function startServer() {
  try {
    // Create the connection to the database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'reumatologia',
      database: 'hack-mx-db'
    });

    // Now you can use 'connection' as a Promise-based connection

    // Start your server
    await server.start();
  } catch (error) {
    console.error(error);
  }
}

startServer();
