const reset = async (database) => {
  await expect(database).toValidateConnection();
  await expect(database).toResetDB();
  return true;
};

module.exports = reset;
