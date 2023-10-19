const BaseRepository = require("./base.repository");
let _teamRequest = null;

class TeamRequestRepository extends BaseRepository {
  constructor({ TeamRequest }) {
    super(TeamRequest);
    _teamRequest = TeamRequest;
  }

  //async funcs 
}

module.exports = TeamRequestRepository;