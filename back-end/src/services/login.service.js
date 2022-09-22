const Model = require('../database/models');

const LoginService = {
  getOne: async (email) => {

    const user = await Model.users.findOne({ where: { email }, raw: true });
    if(!user) return null;

    const {password, ...data} = user;
    return data;
  }
}

module.exports = LoginService;