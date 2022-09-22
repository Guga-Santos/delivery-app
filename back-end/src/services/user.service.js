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
  // create: async (body) => {

  // }
};

module.exports = UserService;