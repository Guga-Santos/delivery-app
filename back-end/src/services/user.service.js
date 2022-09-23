const crypto = require('crypto');
const Model = require('../database/models');

const UserService = {
  getAll: async () => {
    const users = await Model.users.findAll({
      attributes: {
          exclude: ['password'],
      },
  });
    
    return users;
  },
  create: async (body) => {
    const { name, email, password, role } = body;
    // const findUserByEmail = await Model.users.f;
    // if (findUserByEmail) return null;
    // // https://gist.github.com/kitek/1579117
    const hashedPass = crypto.createHash('md5').update(password).digest('hex');
    const newUser = await Model.users.create({ name, email, password: hashedPass, role });

    return newUser;
  },
};

module.exports = UserService;