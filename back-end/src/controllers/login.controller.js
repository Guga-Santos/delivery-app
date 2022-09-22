const LoginService = require("../services/login.service");

const LoginController = {
  login: async (req, res) => {
    const { email } = req.body;
    const user = await LoginService.getOne(email);

    if(!user) return res.status(404).json({message: 'User not found!'})
    
    res.status(200).json({ user })
  }
}

module.exports = LoginController;
