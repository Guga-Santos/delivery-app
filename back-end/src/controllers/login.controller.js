const LoginService = require('../services/login.service');

const LoginController = {
  login: async (req, res) => {
    const user = await LoginService.getOne(req.body);

    if (!user) return res.status(404).json({ message: 'User not found!' });
    
    res.status(200).json({ user });
  },
};
// lint

module.exports = LoginController;
