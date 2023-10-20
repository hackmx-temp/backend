const BaseRepository = require("./base.repository");
let _teamRequest = null;

class TeamRequestRepository extends BaseRepository {
  constructor({ TeamRequest }) {
    super(TeamRequest);
    _teamRequest = TeamRequest;
  }

  async getTeamRequestsByUserIdAndTeamId(userId, teamId) {
    return _teamRequest.findOne({
      where: { user_id: userId, team_id: teamId },
    });
  }

  async getTeamRequestsByUserId(userId) {
    return _teamRequest.findAll({
      where: { user_id: userId },
    });
  }

  async getTeamRequestsByTeamId(teamId) {
    return _teamRequest.findAll({
      where: { team_id: teamId },
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