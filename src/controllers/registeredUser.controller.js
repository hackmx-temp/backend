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
    const { registeredUserId } = req.params;
    const deletedregisteredUser = await _registeredUserService.delete(registeredUserId);
    return res.send(deletedregisteredUser);
  }
}

module.exports = RegisteredUserController;