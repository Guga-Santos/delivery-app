const md5 = require('md5');
const Model = require('../database/models');

const RegisterService = {
  create: async (body) => {
    const { name, email, pass } = body;
    const password = md5(pass);

    const result = await Model.users.create({ name, email, password, role: 'customer' });

    if (!result) return null;

    const code = 201;
    
    return code;
  },
};

module.exports = RegisterService;
