const UserService = require("../services/user.service");


const UsersController = {
  getAll: async (req, res) => {
    const users = await UserService.getAll()    
    res.status(200).json(users);
  },
};

module.exports = UsersController;