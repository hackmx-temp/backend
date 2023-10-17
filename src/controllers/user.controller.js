let _userService = require("../services/user.service");
class UserController {
  constructor({ UserService }) {
    _userService = UserService;
  }

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
    if (_userService.countByCampus(campus) >= 75) {
      const error = new Error();
      error.status = 400;
      error.message = `Registros para ${campus} completados.`;
      throw error;
    }
    const userCreated = await _userService.create(body);
    return res.status(201).send({id: userCreated.id});
  }

  async count(req, res){
    const count = await _userService.count();
    if(count >= 400){
      return res.status(202).send({message: "Registro completo"});
    }
    return res.send({count: count});
  }
}

module.exports = UserController;
