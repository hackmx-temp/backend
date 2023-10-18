let _userService = require("../services/user.service");
class UserController {
  constructor({ UserService }) {
    _userService = UserService;
  }

  MAX_USERS_PER_CAMPUS = 40;

  async get(req, res) {
    const { userId } = req.params;
    const user = await _userService.get(userId);
    return res.send(user);
  }

  async getAll(req, res) {
    const users = await _userService.getAll();
    return res.send(users);
  }

  async create(req, res) {
    const { body } = req;
    const user = await _userService.create(body);
    return res.send(user);
  }

  async update(req, res) {
    const { body } = req;
    const { userId } = req.params;
    const updatedUser = await _userService.update(userId, body);
    return res.send(updatedUser);
  }

  async delete(req, res) {
    const { userId } = req.params;
    const deletedUser = await _userService.delete(userId);
    return res.send(deletedUser);
  }

  async create(req, res){
    const { body } = req;
    const campus = body.campus;
    const count = await _userService.countByCampus(campus);
    if (count >= this.MAX_USERS_PER_CAMPUS) {
      const error = new Error();
      error.status = 400;
      error.message = `Registros para ${campus} completados.`;
      throw error;
    }
    const userCreated = await _userService.create(body);
    return res.status(201).send({id: userCreated.id});
  }

  async countByCampus(req, res){
    const { campus } = req.params;
    const count = await _userService.countByCampus(campus);
    return res.send({count: count});
  }

  async count(req, res){
    const count = await _userService.count();
    if(count >= 400){
      const error = new Error();
      error.status = 400;
      error.message = `Registro completado.`;
      throw error;
    }
    return res.send({count: count});
  }
}

module.exports = UserController;
