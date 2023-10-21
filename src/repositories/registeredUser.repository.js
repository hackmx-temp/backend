const BaseRepository = require("./base.repository");
let _registeredUser = null;

class RegisteredUserRepository extends BaseRepository {
  constructor({ RegisteredUser }) {
    super(RegisteredUser);
    _registeredUser = RegisteredUser;
  }

  async getByUserId(userID) {
    return await super.get(userID);
  }

  async getByTeamId(teamID) {
    return _registeredUser.findOne({
      where: { team_id: teamID },
    });
  }

  async isLeader(registeredUserID) {
    const registeredUser = await _registeredUser.get(registeredUserID);
    return registeredUser ? registeredUser.is_leader : false;
  }

  async updateLeader(id, leader_status, team_id) {
    return await _registeredUser.update(
      { is_leader: leader_status, team_id: team_id },
      { where: { id } }
    );
  }

}

module.exports = RegisteredUserRepository;