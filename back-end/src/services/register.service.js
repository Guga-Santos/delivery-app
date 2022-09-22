const md5 = require('md5');
const Model = require('../database/models');

const RegisterService = {
  create: async (body) => {
    const { name, email, password } = body;
    const hash = md5(password);

    const result = await Model.users.create({ name, email, password: hash, role: 'customer' });

    if (!result) return null;

    const code = 201;
    
    return code;
  },
};

module.exports = RegisterService;
