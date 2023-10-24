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

  async addMember(teamId, name, email, campus, enrollment_id, semester) {
    const team = await super.get(teamId);
    if (team) {
      let members = team.getDataValue('members') ? [...team.getDataValue('members')] : []; // Clona el array existente o crea uno nuevo

      if (members.length >= 5) {
        throw new Error('Los grupos no pueden tener más de 5 personas.');
      }

      const existingMember = members.find(member => member.email === email);
      if (existingMember) {
        throw new Error('El miembro ya está en el equipo');
      }

      const member = {enrollment_id, name, email, campus, semester}
      members.push(member);
      team.setDataValue('members', members); // Establecer el nuevo valor de members

      if (members.length === 5) {
        team.setDataValue('is_completed', true);
      }

      await team.save(); // Guardar los cambios
    }
    return team;
  }

  async countByCampus(campus){
    return _team.count({
      where: { campus }
    });
  }

  async removeMember(teamId, email) {
    const team = await super.get(teamId);
    if (team) {
      const members = team.getDataValue('members');
      const filteredMembers = members.filter(member => member.email !== email);
      if (members.length === filteredMembers.length) {
        throw new Error('El usuario ya no está en el equipo.');
      }

      team.setDataValue('members', filteredMembers)
      await team.save();
      return team;
    }
  }
}

module.exports = TeamRepository;