const BaseRepository = require("./base.repository");
let _user = null;

class UserRepository extends BaseRepository {
  constructor({ User }) {
    super(User);
    _user = User;
  }

  async getUserByName(name) {
    return await _user.findOne({
      where: { name: name }
    });
  }

  async getUserByEmail(email) {
    return await _user.findOne({
      where: { email: email }
    });
  }

}

module.exports = UserRepository;
