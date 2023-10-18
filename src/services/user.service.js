const BaseService = require("./base.service");

class UserService extends BaseService {
  constructor({ UserRepository }) {
    super(UserRepository);
    this.userRepository = UserRepository;
  }

  async getUserByName(name) {
    if (!name) {
      const error = new Error();
      error.status = 400;
      error.message = "name must be sent.";
      throw error;
    }

    return await this.userRepository.getUserByName(name);
  }

  async getUserByEmail(email) {
    if (!email) {
      const error = new Error();
      error.status = 400;
      error.message = "email must be sent.";
      throw error;
    }

    return await this.userRepository.getUserByEmail(email);
  }

  async countByCampus(campus){
    if (!campus) {
      const error = new Error();
      error.status = 400;
      error.message = "campus must be sent.";
      throw error;
    }

    return await this.userRepository.countByCampus(campus);
  }
}

module.exports = UserService;
