let _registeredUserService = null;
class RegisteredUserController {
  constructor({ RegisteredUserService }) {
    _registeredUserService = RegisteredUserService;
  }

  async get(req, res) {
    const { id } = body;
    const registeredUser = await _registeredUserService.get(id);
    return res.send(registeredUser);
  }

  async getAll(req, res) {
    const registeredUsers = await _registeredUserService.getAll();
    return res.send(registeredUsers);
  }

  /*
  // Create manejado por auth services
  async create(req, res) {
    const { body } = req;
    const registeredUser = await _registeredUserService.create(body);
    return res.send(registeredUser);
  }
   */

  async update(req, res) {
    const { body } = req;
    const { id } = body;
    delete body.id;
    delete body.email;
    const updatedRegisteredUser = await _registeredUserService.update(id, body);
    return res.send(updatedRegisteredUser);
  }

  async delete(req, res) {
    const { id } = req.body;
    const deletedregisteredUser = await _registeredUserService.delete(id);
    return res.send(deletedregisteredUser);
  }

  async createTeam(req, res) {
    const { body } = req;
    const newTeam = await _registeredUserService.createTeam(body)
    return res.send(newTeam)
  }

  async updateTeamName(req, res) {
    const { body } = req;
    const updatedTeam= await _registeredUserService.updateTeamName(body)
    return res.send(updatedTeam)
  }

  async deleteTeam(req, res) {
    const { body } = req;
    const deletedTeam = await _registeredUserService.deleteTeam(body)
    return res.send(deletedTeam)
  }

  async createTeamRequest(req, res) {
    const { body } = req;
    const newTeamRequest = await _registeredUserService.createTeamRequest(body)
    return res.send(newTeamRequest)
  }

  async manageTeamRequest(req, res) {
    const { body } = req;
    const updatedTeamRequest = await _registeredUserService.manageTeamRequest(body)
    return res.send(updatedTeamRequest)
  }

  async getTeamRequests(req, res) {
    const { id } = req.body;
    const TeamRequests = await _registeredUserService.getTeamRequests(id)
    return res.send(TeamRequests)
  }
}

module.exports = RegisteredUserController;