const BaseService = require("./base.service");
let _RegisteredUserRepository = null
    _userService = null;

class RegisteredUserService extends BaseService {
  constructor({ UserService, RegisteredUserRepository }) {
    super(RegisteredUserRepository);
    _userService = UserService;
    _RegisteredUserRepository = RegisteredUserRepository;
  }


  

  async create (password, userID){
  }

}

module.exports = RegisteredUserService;
