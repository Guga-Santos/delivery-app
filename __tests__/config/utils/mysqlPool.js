const mysql = require("mysql2/promise");
const {
  host,
  port,
  user,
  password,
  defaultDB: database,
} = require("../constants").database;

const connectionConfig = {
  host,
  port,
  user,
  password,
  database,
  timezone: "Z",
};

const mysqlPool = () => mysql.createPool(connectionConfig);

module.exports = {
  connectionConfig,
  mysqlPool,
};
