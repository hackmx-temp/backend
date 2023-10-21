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

  async getByUserId(userID) {
    if (!userID) {
      const error = new Error();
      error.status = 400;
      error.message = "user id debe ser enviado.";
      throw error;
    }
    return await _RegisteredUserRepository.getByUserId(userID);
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
    const updatedRegisteredUser = await this.updateLeader(registeredUser.id, true, team.id);
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
      const updatedTeam = await _teamService.update(team.id, {
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

  async deleteTeam(email, team_name) {
  }

  async createTeamRequest(email, requested_team_name) {
  }

  async acceptTeamRequest(email, requested_team_name) {
  }


}

module.exports = RegisteredUserService;
