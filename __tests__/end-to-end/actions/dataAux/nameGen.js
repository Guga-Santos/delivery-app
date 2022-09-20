const { name } = require("@faker-js/faker/locale/pt_BR");

const nameGen = (len) => {
  const result = [name.firstName(), name.middleName(), name.lastName()].join(
    " "
  );
  return (
    (len && result.substr(0, len - 1)) ||
    (result.length < 12 && nameGen()) ||
    result
  );
};

module.exports = nameGen;
