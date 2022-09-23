const md5 = require('md5');
const Model = require('../database/models');

const RegisterService = {
  create: async (body) => {
    const { name, email, password } = body;
    const hash = md5(password);

    const nameExists = await Model.users.findOne({ where: { name }, raw: true });
    const emailExists = await Model.users.findOne({ where: { email }, raw: true });

    if (nameExists || emailExists) return null;

    const newCustomer = await Model.users.create({ name, email, password: hash, role: 'customer' });
    return newCustomer;
  },
};

module.exports = RegisterService;
