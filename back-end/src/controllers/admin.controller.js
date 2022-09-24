const AdminService = require('../services/admin.service');

const AdminController = {
  validateBody: async (req, res, next) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(402).json({ message: 'All fields are required' });
    }
    next();
  },
  createUser: async (req, res) => {
    const newUser = await AdminService.createUser(req.body);
    if (!newUser) {
      return res.status(401).json({ message: 'User already exist' });
    }
    res.status(201).json({ message: 'created' });
  },
};

module.exports = AdminController;