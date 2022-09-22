const LoginService = require("../services/login.service");

module.exports = class LoginController {
  async login(req, res) {
    const { email, password } = req.body;

    if(!password || !email) {
      throw new ErrorCodes('All fields are required', 401);
    }

    const user = await LoginService.getOne(req.body.email);

    if(!user) return res.status(404).json({message: 'User not found!'})
    
    res.status(200).json({ user })
  }
}
