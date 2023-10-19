const BaseService = require("./base.service");
let _RegisteredUserRepository = null;

class RegisteredUserService extends BaseService {
  constructor({ RegisteredUserRepository }) {
    super(RegisteredUserRepository);
    _RegisteredUserRepository = RegisteredUserRepository;
  }

  //async funcs
}

module.exports = RegisteredUserService;
