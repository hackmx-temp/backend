const BaseService = require('./base.service');
let _TeamRepository = null;

class TeamService extends BaseService {
  constructor({ TeamRepository }) {
    super(TeamRepository);
    _TeamRepository = TeamRepository;
  }

  async countByCampus(campus) {
    if (!campus) {
      const error = new Error();
      error.status = 400;
      error.message = "campus debe ser enviado.";
      throw error;
    }
    return await _TeamRepository.countByCampus(campus);
  }

  async create(team) {
    const count = await super.count({
      where: {
          is_completed: true
      }})
    if (count >= 40) {
      const error = new Error();
      error.status = 400;
      error.message = "Ya tenemos 40 equipos completos.";
      throw error;
    }
    return await _TeamRepository.create(team);
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

  async addMember(data) {
    const { teamId, name, email, campus, enrollment_id, semester } = data
    if (!teamId) {
      const error = new Error();
      error.status = 400;
      error.message = "team id debe ser mandado.";
      throw error;
    }
    if (!name) {
      const error = new Error();
      error.status = 400;
      error.message = "nombre debe ser mandado.";
      throw error;
    }
    if (!email) {
      const error = new Error();
      error.status = 400;
      error.message = "email debe ser mandado.";
      throw error;
    }
    if (!campus) {
      const error = new Error();
      error.status = 400;
      error.message = "campus debe ser mandado.";
      throw error;
    }
    if (!enrollment_id) {
      const error = new Error();
      error.status = 400;
      error.message = "matricula debe ser mandada.";
      throw error;
    }
    if (!semester) {
      const error = new Error();
      error.status = 400;
      error.message = "semestre debe ser mandado.";
      throw error;
    }
    return await _TeamRepository.addMember(teamId, name, email, campus, enrollment_id, semester);
  }

  async removeMember(data) {
    const { teamId, email } = data
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