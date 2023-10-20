const BaseRepository = require("./base.repository");
let _teamRequest = null;

class TeamRequestRepository extends BaseRepository {
  constructor({ TeamRequest }) {
    super(TeamRequest);
    _teamRequest = TeamRequest;
  }

  async getTeamRequestsByUserId(userID) {
    return _teamRequest.findAll({
      where: { user_id: userID },
    });
  }

  async getTeamRequestsByTeamId(teamID) {
    return _teamRequest.findAll({
      where: { team_id: teamID },
    });
  }

  async createTeamRequest(user_id, team_id) {
    return _teamRequest.create({
      user_id,
      team_id,
      status: false,
    });
  }

  async updateTeamRequestStatus(id, newStatus) {
    return TeamRequest.update(
      { status: newStatus },
      { where: { id } }
    );
  }

}

module.exports = TeamRequestRepository;