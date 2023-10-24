const { generateToken } = require("../helpers/jwt.helper");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
let _userService = null,
    _registeredUserService = null,
    _passwordResetTokenService = null;

class AuthService {
  constructor({ UserService, RegisteredUserService, PasswordResetTokenService }) {
    _userService = UserService;
    _registeredUserService = RegisteredUserService;
    _passwordResetTokenService = PasswordResetTokenService;
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
    try{
      const registeredUserExist = await _registeredUserService.get(userExist.id);
      if (registeredUserExist) {
        const error = new Error();
        error.status = 400;
        error.message = "Ya existe un registro con este email.";
        throw error;
      }
      
    } catch{
      await _registeredUserService.create({
        id: userExist.id,
        password: password,
        user_id: userExist.id
      });
    }
    const token = generateToken(userExist);
    return { token };
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

    const existingRegisteredUser = await _registeredUserService.get(userExist.id);
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

    return { token };
  }

  async resetPassword(user) {
    const { token, password } = user;
    const existingToken = await _passwordResetTokenService.validateToken(token);
    // Al usar la misma PK, no es necesario buscar el usuario por el id
    const registeredUserExist = await _userService.get(existingToken.user_id);
    if (!registeredUserExist) {
      const error = new Error();
      error.status = 404;
      error.message = "Usuario no existe.";
      throw error;
    }
    await _registeredUserService.update(registeredUserExist.id, { password: password });
    await _passwordResetTokenService.deleteWithToken(token);
    return {
      message: "Contraseña actualizada exitosamente."
    };
  }

  verifyJWT(body) {
    const { token } = body;
    return jwt.verify(token, JWT_SECRET, function(err, _) {
      if (err) {
        const error = new Error();
        error.message = "Invalid token.";
        error.status = 401;
        throw error;
      }
      return {
        status: 200,
        message: "Token válido."
      };
    });
  }
}

module.exports = AuthService;
