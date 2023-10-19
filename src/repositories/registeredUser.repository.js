const BaseRepository = require("./base.repository");
let _registeredUser = null;

class RegisteredUserRepository extends BaseRepository {
  constructor({ RegisteredUser }) {
    super(RegisteredUser);
    _registeredUser = RegisteredUser;
  }
  
  //async funcs 
  async updateLeader(id, leader_status, team_id) {
    return await super.update(id, {is_leader: leader_status, team_id: team_id});
  }
}

module.exports = RegisteredUserRepository;