const BaseService = require("./base.service");
let _TeamRequestRepository = null;
let _TeamRepository = null;

class TeamRequestService extends BaseService {
  constructor({ TeamRequestRepository, TeamRepository }) {
    super(TeamRequestRepository);
    _TeamRequestRepository = TeamRequestRepository;
    _TeamRepository = TeamRepository;
  }

  async getTeamRequestsByTeamId(teamID) {
    if (!teamID) {
      const error = new Error();
      error.status = 400;
      error.message = "team id debe ser enviado.";
      throw error;
    }
    return await _TeamRequestRepository.getTeamRequestsByTeamId(teamID);
  }
  async createTeamRequest(user_id, team_id) {
    try{
      await _TeamRequestRepository.getTeamRequestsByTeamId(request.team_id);
    } catch {
      return await _TeamRequestRepository.createTeamRequest(user_id, team_id);
    }
  }
  async updateTeamRequestStatus(team_id, email, newStatus) {
    const teamRequest = await _TeamRequestRepository.getTeamRequestsByTeamId(team_id);
    const id = teamRequest.id;
    // What happens if the leader rejects the request?
    // The request is deleted from the database
    if (!newStatus) {
      return await _TeamRequestRepository.delete(id);
    }
    // What happens if the leader accepts the request?
    // The request is deleted from the database
    // The user is added to the team
    else {
      await _TeamRepository.addMember(team_id, email);
      return await _TeamRequestRepository.delete(id);
    }
  }
}

module.exports = TeamRequestService;
