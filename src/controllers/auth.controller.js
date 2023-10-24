let _authService = null;

class AuthController {
  constructor({ AuthService }) {
    _authService = AuthService;
  }

  async signUp(req, res) {
    const { body } = req;
    const createdUser = await _authService.signUp(body);
    return res.status(201).send(createdUser);
  }

  async logIn(req, res) {
    const { body } = req;
    const creds = await _authService.logIn(body);
    return res.send(creds);
  }
  
  async resetPassword(req, res) {
    const { body } = req;
    const reset = await _authService.resetPassword(body);
    return res.send(reset);
  }

  async verifyJWT(req, res) {
    const { body } = req;
    const verified = _authService.verifyJWT(body);
    return res.send(verified);
  }
}

module.exports = AuthController;
