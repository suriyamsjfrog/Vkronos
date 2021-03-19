const {
  Pool
} = require("pg");
console.log("inside db config ");
const config = {
  host: "localhost",
  port: "5432",
  database: "postgres",
  user: "postgres",
  password: "VMware123!",
};
const pool = new Pool(config);

module.exports = pool;