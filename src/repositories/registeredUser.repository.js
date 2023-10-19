const BaseRepository = require("./base.repository");
let _registeredUser = null;

class RegisteredUserRepository extends BaseRepository {
  constructor({ RegisteredUser }) {
    super(RegisteredUser);
    _registeredUser = RegisteredUser;
  }

  //async funcs 
}

module.exports = RegisteredUserRepository;