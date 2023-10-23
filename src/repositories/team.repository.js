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

  async addMember(teamId, name, email) {
    const team = await _team.get(teamId);
    if (team) {
      let members = team.getDataValue('members') ? [...team.getDataValue('members')] : []; // Clona el array existente o crea uno nuevo

      if (members.length >= 5) {
        throw new Error('Los grupos no pueden tener más de 5 personas.');
      }
      const member = {name, email}
      members.push(member);
      team.setDataValue('members', members); // Establecer el nuevo valor de members

      if (members.length === 5) {
        team.setDataValue('is_completed', true);
      }

      await team.save(); // Guardar los cambios
    }
    return team;
  }

  async removeMember(teamId, name, email) {
    const team = await _team.get(teamId);
    if (team) {
      const members = team.getDataValue('members');
      const index = members.findIndex(member => member.email === email && member.name === name);

      if (index !== -1) {
        members.splice(index, 1);
        team.setDataValue('members', members)
        await team.save();
      }
    }
    return team;
  }

}

module.exports = TeamRepository;