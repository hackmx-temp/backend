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

  async createTeam(email, team_name) {
    const user = await _userService.getUserByEmail(email);
    const registeredUser = await _RegisteredUserRepository.getByUserId(user.id);
    if (registeredUser.is_leader || registeredUser.team_id !== null) {
      return {
        success: false,
        message: "El usuario ya es líder de un equipo o ya forma parte de otro equipo."
      };
    }
    const team = await _teamService.create({
      name: team_name
    });
    const updatedRegisteredUser = await _RegisteredUserRepository.updateLeader({
      id: registeredUser.id,
      leader_status: true,
      team_id: team.id
    });
    const newMember = await _teamService.addMember(team.id, email);
    return newMember;
  }

  async updateTeamName(email, team_name, new_team_name) {
    const user = await _userService.getUserByEmail(email);
    const registeredUser = await _RegisteredUserRepository.getByUserId(user.id);
    const team = await _teamService.getTeamByName(team_name)

    if (registeredUser.is_leader && registeredUser.team_id === team.id) {
      const updatedTeam = _teamService({
        name: new_team_name
      })
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
