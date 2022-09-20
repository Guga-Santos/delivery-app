const { zero, one } = require("../../../config/constants").common;
const { newUser } = require("../dataAux");

const createUserForAdm = (lengthRules) => {
  const numberOfUsers = Math.round(Math.random() * 3) + 3;
  const people = [];
  ["seller", "customer"].forEach((role)=>people.push({
    ...newUser({ passwordLen: lengthRules.password }),
    role
  }));
  for (let i = zero; i < numberOfUsers; i += one) {
    people.push({
      ...newUser({ passwordLen: lengthRules.password }),
      role: Math.round(Math.random()) ? "seller" : "customer",
    });
  }
  return people;
};

module.exports = createUserForAdm;
