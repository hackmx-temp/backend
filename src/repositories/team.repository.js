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
    const team = await this.get(teamId);
    if (team) {
      if (!team.members) {
        team.members = [];
      }
      if (team.members.length >= 5) {
        throw new Error('Los grupos no pueden tener más de 5 personas.');
      }
      
      team.members.push(email);
      await team.save();
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