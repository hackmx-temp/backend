const { generateToken } = require('../helpers/jwt.helper');
const BaseService = require('./base.service');
let _TeamRepository = null;
let _RegisteredUserRepository = null;

class TeamService extends BaseService {
  constructor({ TeamRepository, RegisteredUserRepository=null }) {
    super(TeamRepository);
    _TeamRepository = TeamRepository;
    _RegisteredUserRepository = RegisteredUserRepository;
  }

  //async funcs

  // Create team and update user to leader
  async create (teamName, userID, isLeader){
    if(isLeader){
      const error = new Error();
      error.message = "Ya eres lider de un equipo";
      error.status = 401;
      throw error;
    }
    const team = _TeamRepository.create(teamName);
    const user = await _RegisteredUserRepository.updateLeader(userID, true, team.id);
    return generateToken(user);
  }
  
  // Update team name
  async updateName (teamName, teamID, isLeader){
    if(!isLeader){
      const error = new Error();
      error.message = "No eres lider de este equipo";
      error.status = 401;
      throw error;
    }
    return await _TeamRepository.updateName(teamName, teamID);
  }

  // Delete team
  async delete (teamID, isLeader){
    if(!isLeader){
      const error = new Error();
      error.message = "No eres lider de este equipo";
      error.status = 401;
      throw error;
    }
    await _TeamRepository.delete(teamID);
    const user = await _RegisteredUserRepository.updateLeader(userID, true, team.id);
    return generateToken(user);
  }
  
}


module.exports = TeamService;