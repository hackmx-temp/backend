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

  async countByCampus(campus){
    return await _user.count({
      where: { campus: campus }
    });
  }

}

module.exports = UserRepository;
