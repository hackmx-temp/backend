let _teamRequestService = null;
class TeamRequestController {
  constructor({ TeamRequestService }) {
    _teamRequestService = TeamRequestService;
  }

  async get(req, res) {
    const { teamRequestId } = req.params;
    const teamRequest = await _teamRequestService.get(teamRequestId);
    return res.send(teamRequest);
  }

  async getAll(req, res) {
    const teamRequests = await _teamRequestService.getAll();
    return res.send(teamRequests);
  }

  //Manejado por usuario registrado
  /*
  async create(req, res) {
    const { body } = req;
    const teamRequest = await _teamRequestService.create(body);
    return res.send(teamRequest);
  }

  async update(req, res) {
    const { body } = req;
    const { teamRequestId } = req.params;
    const updatedTeamRequest = await _teamRequestService.update(teamRequestId, body);
    return res.send(updatedTeamRequest);
  }

  async delete(req, res) {
    const { teamRequestId } = req.params;
    const deletedTeamRequest = await _teamRequestService.delete(teamRequestId);
    return res.send(deletedTeamRequest);
  }
  */
}

module.exports = TeamRequestController;