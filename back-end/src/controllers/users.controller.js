const UserService = require('../services/user.service');

const UsersController = {
  getAll: async (req, res) => {
    const users = await UserService.getAll();    
    res.status(200).json(users);
  },
  validateBody: async (req, res, next) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(402).json({ message: 'All fields are required' });
    }
    next();
  },
  createUser: async (req, res) => {
    const newUser = await UserService.create(req.body);
    if (!newUser) {
      return res.status(401).json({ message: 'User already exist' });
    }
    res.status(201).json({ message: 'created' });
  },
};

module.exports = UsersController;