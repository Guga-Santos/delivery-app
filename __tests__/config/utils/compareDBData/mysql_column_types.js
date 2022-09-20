// https://dev.mysql.com/doc/internals/en/myisam-column-attributes.html
const types = {
  "16": "BIT",
  "252": "BLOB",
  "10": "DATE",
  "12": "DATETIME",
  "0": "DECIMAL",
  "5": "DOUBLE",
  "247": "ENUM",
  "4": "FLOAT",
  "255": "GEOMETRY",
  "9": "INT24",
  "3": "INT", // "LONG"
  "8": "LONGLONG",
  "251": "LONG_BLOB",
  "250": "MEDIUM_BLOB",
  "14": "NEWDATE",
  "246": "DECIMAL", // "NEWDECIMAL"
  "6": "NULL",
  "248": "SET",
  "2": "SHORT",
  "254": "STRING",
  "11": "TIME",
  "7": "TIMESTAMP",
  "1": "TINY",
  "249": "TINY_BLOB",
  "15": "VARCHAR",
  "253": "VARCHAR", // "VAR_STRING"
  "13": "YEAR"
}

module.exports = (number) => types[number] || "UNKNOW";
