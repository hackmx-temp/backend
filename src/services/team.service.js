const BaseService = require('./base.service');
let _TeamRepository = null;

class TeamService extends BaseService {
  constructor({ TeamRepository }) {
    super(TeamRepository);
    _TeamRepository = TeamRepository;
  }

  async getTeamByName(name) {
    if (!name) {
      const error = new Error();
      error.status = 400;
      error.message = "nombre del equipo debe ser mandado.";
      throw error;
    }
    return await _TeamRepository.getTeamByName(name)
  }

  async getCompletedTeams() {
    return await _TeamRepository.getCompletedTeams()
  }

  async addMember(teamId, email) {
    if (!teamId) {
      const error = new Error();
      error.status = 400;
      error.message = "team id debe ser mandado.";
      throw error;
    }
    if (!email) {
      const error = new Error();
      error.status = 400;
      error.message = "email debe ser mandado.";
      throw error;
    }
    return await _TeamRepository.addMember(teamId, email);
  }

  async removeMember(teamId, email) {
    if (!teamId) {
      const error = new Error();
      error.status = 400;
      error.message = "team id debe ser mandado.";
      throw error;
    }
    if (!email) {
      const error = new Error();
      error.status = 400;
      error.message = "email debe ser mandado.";
      throw error;
    }
    return await _TeamRepository.removeMember(teamId, email)
  }
}

module.exports = TeamService;