const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "12345654",
  database: "fastmeal",
});

client.connect().then(() => console.log("Connected to database"));

module.exports = client;
