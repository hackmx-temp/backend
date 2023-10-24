const BaseService = require("./base.service");
let _RegisteredUserRepository = null,
  _userService = null,
  _teamService = null,
  _teamRequestService = null;

class RegisteredUserService extends BaseService {
  constructor({ UserService, TeamService, RegisteredUserRepository, TeamRequestService }) {
    super(RegisteredUserRepository);
    _userService = UserService;
    _teamService = TeamService;
    _RegisteredUserRepository = RegisteredUserRepository;
    _teamRequestService = TeamRequestService;
  }

  async delete(id) {
    const registeredUser = await super.get(id);
    let team_id = registeredUser.team_id
    if (registeredUser.is_leader) {
      await _teamService.delete(team_id);
    } else{
      // Borrarlo de la lista de members del team
      return await _teamService.removeMember(team_id, registeredUser.user.email);
    }
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

  async updateMember(id, leader_status, team_id) {
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
      error.message = "team_id debe ser enviado.";
      throw error;
    }
    return await _RegisteredUserRepository.updateMember(id, leader_status, team_id);
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
    await _RegisteredUserRepository.updateMember(registeredUser.id, true, team.id);
    const newMember = await _teamService.addMember({
      teamId : team.id,
      name : user.name,
      email : user.email,
      campus : user.campus,
      enrollment_id : user.enrollment_id,
      semester : user.semester
    })
    return newMember;
  }

  async addMember(body) {
    const { id, requested_email } = body;
    const user = await _userService.get(id);
    if (!user) {
      const error = new Error();
      error.status = 400;
      error.message = "usuario no existe.";
      throw error;
    }
    const registeredUser = await _RegisteredUserRepository.getByUserId(id);
    if (!registeredUser) {
      const error = new Error();
      error.status = 400;
      error.message = "no estas registrado.";
      throw error;
    }
    const possible_user = await _userService.getUserByEmail(requested_email);
    if (!possible_user) {
      const error = new Error();
      error.status = 400;
      error.message = "usuario que quieren agregar no existe.";
      throw error;
    }

    if (registeredUser.is_leader) {
      await _RegisteredUserRepository.updateMember(possible_user.id, false, registeredUser.team_id);
      await _teamService.addMember({
        teamId : registeredUser.team_id,
        name : possible_user.name,
        email : possible_user.email,
        campus : possible_user.campus,
        enrollment_id : possible_user.enrollment_id,
        semester : possible_user.semester
      })
      return {
        success: true,
        message: "El usuario fue agregado con éxito."
      };
    }
    return {
      success: false,
      message: "El usuario no es líder del equipo especificado y no puede agregar miembros."
    };

  }

  async removeMember(body) {
    const { id, requested_email } = body;
    const user = await _userService.get(id);
    if (!user) {
      const error = new Error();
      error.status = 400;
      error.message = "usuario no existe.";
      throw error;
    }
    const registeredUser = await _RegisteredUserRepository.getByUserId(id);
    if (!registeredUser) {
      const error = new Error();
      error.status = 400;
      error.message = "no estas registrado.";
      throw error;
    }
    const possible_user = await _userService.getUserByEmail(requested_email);
    if (!possible_user) {
      const error = new Error();
      error.status = 400;
      error.message = "usuario que quieren agregar no existe.";
      throw error;
    }

    if (registeredUser.is_leader) {
      await _RegisteredUserRepository.updateMember(possible_user.id, false, null);
      await _teamService.removeMember({
        teamId : registeredUser.team_id,
        name : possible_user.name,
        email : possible_user.email,
        campus : possible_user.campus,
        enrollment_id : possible_user.enrollment_id,
        semester : possible_user.semester
      })
      return {
        success: true,
        message: "El usuario fue borrado con éxito."
      };
    }
    return {
      success: false,
      message: "El usuario no es líder del equipo especificado y no puede agregar miembros."
    };

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
      await _RegisteredUserRepository.updateMember(registeredUser.id, false, null);
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

  async createTeamRequest(body) {
    const { email, team_name } = body;
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
    if (!team) {
      const error = new Error();
      error.status = 400;
      error.message = "no hay ningun equipo con ese nombre.";
      throw error;
    }
    if (!registeredUser.is_leader) {
      // La peticion debe contar con el id del usuario y el id del equipo
      await _teamRequestService.createTeamRequest(user.id, team.id);
      return {
        success: true,
        message: `Team request de ${email} enviado al líder del equipo ${team_name}.`
      };
    }
    return {
      success: false,
      message: "El usuario es líder y no puede hacer peticiones."
    };
  }

  async getTeamByLeader(body) {
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

    if (registeredUser.is_leader) {
      const team = await _teamService.get(registeredUser.team_id)
      if (!team) {
        const error = new Error();
        error.status = 400;
        error.message = "el lider no tiene equipo.";
        throw error;
      }
      return team
    }
    return {
      success: false,
      message: "El usuario no es líder y no tiene equipo."
    };
  }

  async manageTeamRequest(body) {
    // El estatus es un booleano
    const { id, requested_email, status } = body;
    const user = await _userService.get(id);
    if (!user) {
      const error = new Error();
      error.status = 400;
      error.message = "usuario no existe.";
      throw error;
    }
    const registeredUser = await _RegisteredUserRepository.get(id);
    if (!registeredUser) {
      const error = new Error();
      error.status = 400;
      error.message = "no estas registrado.";
      throw error;
    }
    const team_id = registeredUser.team_id;
    if (!team_id) {
      const error = new Error();
      error.status = 400;
      error.message = "el usuario no tiene equipo.";
      throw error;
    }
    if (registeredUser.is_leader) {
      // La peticion debe contar con el correo del usuario y el id del equipo
      const requestUser = await _userService.getUserByEmail(requested_email);
      await _teamRequestService.updateTeamRequestStatus({
        userId: requestUser.id,
        teamId : team_id,
        name : requestUser.name,
        email : requestUser.email,
        campus : requestUser.campus,
        enrollment_id : requestUser.enrollment_id,
        semester : requestUser.semester,
        status: status
      });
      if (status){
        const requestRegisteredUser = await _RegisteredUserRepository.get(requestUser.id);
        await _RegisteredUserRepository.update(requestRegisteredUser.id, {
          team_id: team_id
        });
      }
      return {
        success: true,
        message: `La peticion fue ${status ? "aceptada" : "rechazada"} por el líder del equipo.`
      };
    }
    return {
      success: false,
      message: "El usuario no es el líder del equipo."
    };
  }

  // Obtiene todas las peticiones de un equipo si es lider,
  // si no obtiene todas sus peticiones hechas
  async getTeamRequests(user_id){
    const registeredUser = await _RegisteredUserRepository.get(user_id);
    if (!registeredUser) {
      const error = new Error();
      error.status = 400;
      error.message = "no estas registrado.";
      throw error;
    }

    if(registeredUser.is_leader){
      const team_id = registeredUser.team_id;
      const requestsForTeam = await _teamRequestService.getTeamRequestsByTeamId(team_id);
      const formattedRequests = await Promise.all(
        requestsForTeam.map(async (request) => {
          const user = await _userService.get(request.user_id);
          const team = await _teamService.get(request.team_id);
          return {
            name: user.name,
            email: user.email,
            // team: team.name,
          };
        })
      );
      return formattedRequests
    }

    const requestsByUser = await _teamRequestService.getTeamRequestsByUserId(registeredUser.id);
    const formattedRequests = await Promise.all(
      requestsByUser.map(async (request) => {
        const user = await _userService.get(request.user_id);
        const team = await _teamService.get(request.team_id);

        return {
          name: user.name,
          email: user.email,
          team: team.name,
        };
      })
    );
    return formattedRequests;
  }

}

module.exports = RegisteredUserService;
