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
    if (body.campus === "CCM") {
      const error = new Error();
      error.status = 400;
      error.message = "Registros llenos";
      throw error;
    }
    const userCreated = await _userService.create(body);
    return res.status(201).send({id: userCreated.id});
  }

  async count(req, res){
    const count = await _userService.count();
    if(count >= 200){
      return res.status(202).send({message: "Max number of users reached"});
    }
    return res.send({count: count});
  }
}

module.exports = UserController;
