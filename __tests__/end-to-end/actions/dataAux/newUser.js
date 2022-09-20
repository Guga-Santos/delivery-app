const { internet } = require("@faker-js/faker/locale/pt_BR");
const nameGen = require("./nameGen");

const newUser = ({ nameLen, email, passwordLen }) => {
  const newName = nameGen(nameLen);
  const newEmail = email || internet.email(newName).toLowerCase();
  return {
    name: newName,
    email: newEmail,
    password: internet.password(passwordLen),
  };
};

module.exports = newUser;
