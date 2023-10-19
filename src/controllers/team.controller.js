let _teamService = null;
class TeamController {
  constructor({ TeamService }) {
    _teamService = TeamService;
  }

  async get(req, res) {
    const { teamId } = req.params;
    const team = await _teamService.get(teamId);
    return res.send(team);
  }

  async getAll(req, res) {
    const teams = await _teamService.getAll();
    return res.send(teams);
  }

  async create(req, res) {
    const { body } = req;
    const team = await _teamService.create(body);
    return res.send(team);
  }

  async update(req, res) {
    const { body } = req;
    const { teamId } = req.params;
    const updatedTeam = await _teamService.update(teamId, body);
    return res.send(updatedTeam);
  }

  async delete(req, res) {
    const { teamId } = req.params;
    const deletedTeam = await _teamService.delete(teamId);
    return res.send(deletedTeam);
  }
}

module.exports = TeamController;