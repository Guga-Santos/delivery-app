const User = require('../database/models/users');
const ErrorCodes = require("../ErrorCodes");

const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g;

module.exports = class LoginService {
  static async getOne(email) {
    if (!regex.test(email)) throw new ErrorCodes('Incorrect email or password', 401);

    const user = await User.findOne({ where: { email }, raw: true });
    if(!user) throw new ErrorCodes('Incorrect email or password', 401);

    const {password, ...data} = user;
    return data;
  }
}