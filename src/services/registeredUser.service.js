const BaseService = require("./base.service");
let _RegisteredUserRepository = null,
  _userService = null,
  _teamService = null;

class RegisteredUserService extends BaseService {
  constructor({ UserService, TeamService, RegisteredUserRepository }) {
    super(RegisteredUserRepository);
    _userService = UserService;
    _teamService = TeamService;
    _RegisteredUserRepository = RegisteredUserRepository;
  }

  async create(entity) {
    const { email } = entity;
    const user = await _userService.getUserByEmail(email);
    if (!user) {
      const error = new Error();
      error.status = 400;
      error.message = "usuario no existe.";
      throw error;
    }
    const registeredUser = await _RegisteredUserRepository.getByUserId(user.id);
    if (registeredUser) {
      const error = new Error();
      error.status = 400;
      error.message = "usuario ya registrado.";
      throw error;
    }

    entity.id = user.id;

    return await super.create(entity);
  }

  async getByUserId(userID) {
    if (!userID) {
      const error = new Error();
      error.status = 400;
      error.message = "user id debe ser enviado.";
      throw error;
    }
    return await _RegisteredUserRepository.get(userID);
  }

  async getByTeamId(teamID) {
    if (!teamID) {
      const error = new Error();
      error.status = 400;
      error.message = "team id debe ser enviado.";
      throw error;
    }
    return await _RegisteredUserRepository.getByTeamId(teamID);
  }

  async isLeader(registeredUserID) {
    if (!registeredUserID) {
      const error = new Error();
      error.status = 400;
      error.message = "registered user id debe ser enviado.";
      throw error;
    }
    return await _RegisteredUserRepository.isLeader(registeredUserID)
  }

  async updateLeader(id, leader_status, team_id) {
    if (!id) {
      const error = new Error();
      error.status = 400;
      error.message = "registered user id debe ser enviado.";
      throw error;
    }
    if (leader_status !== true && leader_status !== false) {
      const error = new Error();
      error.status = 400;
      error.message = "leader status debe ser enviado.";
      throw error;
    }
    if (!team_id) {
      const error = new Error();
      error.status = 400;
      error.message = "team id debe ser enviado.";
      throw error;
    }
    return await _RegisteredUserRepository.updateLeader(id, leader_status, team_id);
  }

  async createTeam(body) {
    const { email, team_name } = body;
    const user = await _userService.getUserByEmail(email);
    if (!user) {
      const error = new Error();
      error.status = 400;
      error.message = "usuario no existe.";
      throw error;
    }
    const registeredUser = await _RegisteredUserRepository.getByUserId(user.id);
    if (!registeredUser) {
      const error = new Error();
      error.status = 400;
      error.message = "no estas registrado.";
      throw error;
    }
    if (registeredUser.is_leader || registeredUser.team_id !== null) {
      return {
        success: false,
        message: "El usuario ya es líder de un equipo o ya forma parte de otro equipo."
      };
    }
    const team = await _teamService.create({
      name: team_name
    });
    await this.updateLeader(registeredUser.id, true, team.id);
    const newMember = await _teamService.addMember(team.id, email);
    return newMember;
  }

  async updateTeamName(body) {
    const { email, team_name, new_team_name } = body;
    const user = await _userService.getUserByEmail(email);
    if (!user) {
      const error = new Error();
      error.status = 400;
      error.message = "usuario no existe.";
      throw error;
    }
    const registeredUser = await _RegisteredUserRepository.getByUserId(user.id);
    if (!registeredUser) {
      const error = new Error();
      error.status = 400;
      error.message = "no estas registrado.";
      throw error;
    }
    const team = await _teamService.getTeamByName(team_name)
    if (!registeredUser) {
      const error = new Error();
      error.status = 400;
      error.message = "no hay ningun equipo con ese nombre.";
      throw error;
    }
    if (registeredUser.is_leader && registeredUser.team_id === team.id) {
      await _teamService.update(team.id, {
        name: new_team_name
      });
      return {
        success: true,
        message: `Nombre del equipo actualizado a ${new_team_name} por líder ${email}.`
      };
    }
    return {
      success: false,
      message: "El usuario no es líder del equipo especificado o no forma parte del equipo."
    };
  }

  async deleteTeam(body) {
    const { email } = body;
    const user = await _userService.getUserByEmail(email);
    if (!user) {
      const error = new Error();
      error.status = 400;
      error.message = "usuario no existe.";
      throw error;
    }
    const registeredUser = await _RegisteredUserRepository.get(user.id);
    if (!registeredUser) {
      const error = new Error();
      error.status = 400;
      error.message = "no estas registrado.";
      throw error;
    }
    const team = await _teamService.get(registeredUser.team_id)
    if (!registeredUser) {
      const error = new Error();
      error.status = 400;
      error.message = "no hay ningun equipo con ese nombre.";
      throw error;
    }
    if (registeredUser.is_leader) {
      await _teamService.delete(team.id);
      return {
        success: true,
        message: `Equipo eliminado por líder ${email}.`
      };
    }
    return {
      success: false,
      message: "El usuario no es líder del equipo especificado."
    };
  }
  // TODO: Implementar
  async createTeamRequest(body) {
    /* const { email, team_name } = body;
    const user = await _userService.getUserByEmail(email);
    if (!user) {
      const error = new Error();
      error.status = 400;
      error.message = "usuario no existe.";
      throw error;
    }
    const registeredUser = await _RegisteredUserRepository.get(user.id);
    if (!registeredUser) {
      const error = new Error();
      error.status = 400;
      error.message = "no estas registrado.";
      throw error;
    }
    const team = await _teamService.getTeamByName(team_name)
    if (!registeredUser) {
      const error = new Error();
      error.status = 400;
      error.message = "no hay ningun equipo con ese nombre.";
      throw error;
    }
    if (!registeredUser.is_leader) {
      const teamRequest = {

      }
      await _teamRequestService.create(team.id);
      return {
        success: true,
        message: `Equipo eliminado por líder ${email}.`
      };
    }
    return {
      success: false,
      message: "El usuario no es líder del equipo especificado."
    }; */
  }

  async manageTeamRequest(email, requested_team_name) {
  }


}

module.exports = RegisteredUserService;
