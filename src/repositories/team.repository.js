const BaseRepository = require("./base.repository");
let _team = null;

class TeamRepository extends BaseRepository {
  constructor({ Team }) {
    super(Team);
    _team = Team;
  }

  async getTeamByName(name) {
    return _team.findOne({
      where: { name },
    });
  }

  async getCompletedTeams() {
    return _team.findAll({
      where: { is_completed: true },
    });
  }

  async addMember(teamId, email) {
    const team = await super.get(teamId);
    if (team) {
      let members = team.getDataValue('members') ? [...team.getDataValue('members')] : []; // Clona el array existente o crea uno nuevo

      if (members.length >= 5) {
        throw new Error('Los grupos no pueden tener más de 5 personas.');
      }

      members.push(email); // Agregar el nuevo email al array
      team.setDataValue('members', members); // Establecer el nuevo valor de members

      if (members.length === 5) {
        team.setDataValue('is_completed', true);
      }

      await team.save(); // Guardar los cambios
    }
    return team;
  }

  async removeMember(teamId, email) {
    const team = await _team.get(teamId);
    if (team) {
      const index = team.members.indexOf(email);
      if (index !== -1) {
        team.members.splice(index, 1);
        await team.save();
        return team;
      }
    }
    return team;
  }

}

module.exports = TeamRepository;