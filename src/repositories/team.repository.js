const BaseRepository = require("./base.repository");
let _team = null;

class TeamRepository extends BaseRepository {
  constructor({ Team }) {
    super(Team);
    _team = Team;
  }

  //async funcs 
}

module.exports = TeamRepository;