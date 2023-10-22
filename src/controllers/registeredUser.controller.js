let _registeredUserService = null;
class RegisteredUserController {
  constructor({ RegisteredUserService }) {
    _registeredUserService = RegisteredUserService;
  }

  async get(req, res) {
    const { registeredUserId } = req.params;
    const registeredUser = await _registeredUserService.get(registeredUserId);
    return res.send(registeredUser);
  }

  async getAll(req, res) {
    const registeredUsers = await _registeredUserService.getAll();
    return res.send(registeredUsers);
  }

  async create(req, res) {
    const { body } = req;
    const registeredUser = await _registeredUserService.create(body);
    return res.send(registeredUser);
  }

  async update(req, res) {
    const { body } = req;
    const { registeredUserId } = req.params;
    const updatedRegisteredUser = await _registeredUserService.update(registeredUserId, body);
    return res.send(updatedRegisteredUser);
  }

  async delete(req, res) {
    const { id } = req.body;
    console.log(req.body)
    const deletedregisteredUser = await _registeredUserService.delete(id);
    return res.send(deletedregisteredUser);
  }

  async createTeam(req, res) {
    const { body } = req;
    console.log(body)
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

}

module.exports = RegisteredUserController;