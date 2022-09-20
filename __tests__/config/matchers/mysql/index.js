const toValidateConnection = require('./toValidateConnection');
const toResetDB = require('./toResetDB');
const toReturnDataWith = require('./toReturnDataWith');

expect.extend({
  toValidateConnection,
  toResetDB,
  toReturnDataWith
});
