import User from '../database/models/users';
import ErrorCode from "../ErrorCode";

const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g;

export default class LoginService {
  static async getOne(email) {
    if (!regex.test(email)) throw new ErrorCode('Incorrect email or password', 401);

    const user = await User.findOne({ where: { email }, raw: true });
    if(!user) throw new ErrorCode('Incorrect email or password', 401);

    const {password, ...data} = user;
    return data;
  }
}