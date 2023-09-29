const { generateToken } = require("../helpers/jwt.helper");
let _userService = null;

class AuthService {
  constructor({ UserService }) {
    _userService = UserService;
  }

  async signUp(user) {
    const { email } = user;
    const userExist = await _userService.getUserByEmail(email);
    if (userExist) {
      const error = new Error();
      error.status = 400;
      error.message = "User already exist.";
      throw error;
    }

    return await _userService.create(user);
  }

  async logIn(user) {
    const { email, password } = user;
    const userExist = await _userService.getUserByEmail(email);
    if (!userExist) {
      const error = new Error();
      error.status = 404;
      error.message = "User does not exist.";
      throw error;
    }

    const validPassword = userExist.validatePassword(password);
    if (!validPassword) {
      const error = new Error();
      error.status = 400;
      error.message = "Invalid Password.";
      throw error;
    }

    const token = generateToken(userExist);

    return { token, user: userExist };
  }
}

module.exports = AuthService;
