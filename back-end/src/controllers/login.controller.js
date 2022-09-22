import LoginService from "../services/login.service";

export default class LoginController {
  static async login(req, res) {
    const {email, password } = req.body;

    if(!password || !email) {
      throw new ErrorCode('All fields are required', 401);
    }

    const user = await LoginService.getOne(e);

    if(!user) return res.status(404).json({message: 'User not found!'})
    
    res.status(200).json({ user })
  }
}
