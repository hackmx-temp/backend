const BaseService = require("./base.service");
let _userRepository = null;

class UserService extends BaseService {
  constructor({ UserRepository }) {
    super(UserRepository);
    _userRepository = UserRepository;
  }

  async getUserByName(name) {
    if (!name) {
      const error = new Error();
      error.status = 400;
      error.message = "name must be sent.";
      throw error;
    }

    return await _userRepository.getUserByName(name);
  }

  async getUserByEmail(email) {
    if (!email) {
      const error = new Error();
      error.status = 400;
      error.message = "email must be sent.";
      throw error;
    }

    return await _userRepository.getUserByEmail(email);
  }
}

module.exports = UserService;
