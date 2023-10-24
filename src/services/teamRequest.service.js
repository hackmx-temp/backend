const BaseService = require("./base.service");
let _TeamRequestRepository = null;
let _TeamService = null;

class TeamRequestService extends BaseService {
  constructor({ TeamRequestRepository, TeamService }) {
    super(TeamRequestRepository);
    _TeamRequestRepository = TeamRequestRepository;
    _TeamService = TeamService;
  }

  async deleteByUserID(userID){
    if (!userID) {
      const error = new Error();
      error.status = 400;
      error.message = "user id debe ser enviado.";
      throw error;
    }
    return await _TeamRequestRepository.deleteByUserID(userID);
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

  async getTeamRequestsByUserId(userID) {
    if (!userID) {
      const error = new Error();
      error.status = 400;
      error.message = "user id debe ser enviado.";
      throw error;
    }
    return await _TeamRequestRepository.getTeamRequestsByUserId(userID);
  }

  async getTeamRequestsByUserIdAndTeamId(userID, teamID) {
    if (!userID) {
      const error = new Error();
      error.status = 400;
      error.message = "user id debe ser enviado.";
      throw error;
    }
    if (!teamID) {
      const error = new Error();
      error.status = 400;
      error.message = "team id debe ser enviado.";
      throw error;
    }
    return await _TeamRequestRepository.getTeamRequestsByUserIdAndTeamId(userID, teamID);
  }

  async createTeamRequest(user_id, team_id) {
    try{
      await _TeamRequestRepository.getTeamRequestsByTeamId(request.team_id);
    } catch {
      return await _TeamRequestRepository.createTeamRequest(user_id, team_id);
    }
  }

  async updateTeamRequestStatus(data) {
    console.log(data)
    const { userId, teamId, name, email, campus, enrollment_id, semester, status } = data
    const teamRequest = await _TeamRequestRepository.getTeamRequestsByUserIdAndTeamId(userId, teamId);
    const id = teamRequest.id;
    // What happens if the leader rejects the request?
    // The request is deleted from the database
    if (!status) {
      return await _TeamRequestRepository.delete(id);
    }
    // What happens if the leader accepts the request?
    // The request is deleted from the database
    // The user is added to the team
    else {
      await _TeamService.addMember({
        teamId : teamId,
        name : name,
        email : email,
        campus : campus,
        enrollment_id : enrollment_id,
        semester : semester
      });
      return await _TeamRequestRepository.delete(id);
    }
  }
}

module.exports = TeamRequestService;
