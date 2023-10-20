const { generateToken } = require("../helpers/jwt.helper");
let _userService = null,
    _registeredUserService = null;

class AuthService {
  constructor({ UserService, RegisteredUserService }) {
    _userService = UserService;
    _registeredUserService = RegisteredUserService;
  }

  async signUp(user) {
    const { email, password } = user;
    const userExist = await _userService.getUserByEmail(email);
    if (!userExist) {
      const error = new Error();
      error.status = 400;
      error.message = "Email no está registrado.";
      throw error;
    }
    const registeredUserExist = await _registeredUserService.getByUserId(userExist.id);
    if (registeredUserExist) {
      const error = new Error();
      error.status = 400;
      error.message = "Ya existe un registro con este email.";
      throw error;
    }

    return await _registeredUserService.create(password, userExist.id);
  }

  async logIn(user) {
    const { email, password } = user;
    const userExist = await _userService.getUserByEmail(email);
    if (!userExist) {
      const error = new Error();
      error.status = 404;
      error.message = "Usuario no existe.";
      throw error;
    }

    const existingRegisteredUser = await _registeredUserService.getByUserId(userExist.id);
    if (!existingRegisteredUser) {
      const error = new Error();
      error.status = 400;
      error.message = "No te haz registrado aún.";
      throw error;
    }

    const validPassword = existingRegisteredUser.validatePassword(password);
    if (!validPassword) {
      const error = new Error();
      error.status = 400;
      error.message = "Contraseña Inválida.";
      throw error;
    }

    const token = generateToken(userExist);

    return { token, user: existingRegisteredUser };
  }
}

module.exports = AuthService;
