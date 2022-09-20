const { resolve } = require("path");
require("dotenv").config({ path: resolve("back-end", ".env") });

const {
  NODE_ENV,
  MYSQL_DB_NAME,
  EVAL_ALWAYS_RESTORE_DEV_DB,
  HOSTNAME,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  PUPPETEER_SNAPSHOTS,
} = process.env;

const environment = NODE_ENV || "test";

const suffix = {
  prod: "",
  production: "",
  dev: "-dev",
  development: "-dev",
  test: "-test",
};

const defaultSuffix = suffix[environment] || suffix.test;

const defaultDB = `${MYSQL_DB_NAME || "delivery-app"}${defaultSuffix}`;

module.exports = {
  environment,
  common: {
    zero: 0,
    one: 1,
  },
  httpCodes: {
    ok: 200,
    created: 201,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    conflict: 409,
  },
  database: {
    restore: !["development", "dev", "test"].includes(environment)
      ? false
      : ["development", "dev"].includes(environment)
      ? EVAL_ALWAYS_RESTORE_DEV_DB === "true"
      : true,
    host: HOSTNAME || MYSQL_HOST || "localhost",
    port: MYSQL_PORT || "3306",
    user: MYSQL_USER || "root",
    password: MYSQL_PASSWORD || "",
    defaultSuffix,
    defaultDB,
  },
  puppeteer: {
    timeout: 10000,
    snapshots: PUPPETEER_SNAPSHOTS || false,
  },
  frontEnd: {
    host: "http://localhost:3000",
    deliveryStatus: {
      pending: "Pendente",
      preparing: "Preparando",
      inTransit: "Em Trânsito",
      delivered: "Entregue",
    },
  },
  jest: {
    descriptionRegex: /(?<=[a-z\u00E0-\u00FC])\s(?=[A-Z\u00C0-\u00DC])/,
  },
};
