const md5 = require('md5');
const Model = require('../database/models');
const Auth = require('../middleware/auth');

const LoginService = {
  getOne: async (body) => {
    const { password: pass, email } = body;
    const user = await Model.users.findOne({ where: { email }, raw: true });
    if (!user) return null;

    const { password, ...data } = user;
    const decrypt = md5(pass);

    if (password !== decrypt) return null;

    const token = Auth.generateToken(data);
    
    return { ...data, token };
  },
};

module.exports = LoginService;