const BaseService = require("./base.service");
let _TeamRequestRepository = null;

class TeamRequestService extends BaseService {
  constructor({ TeamRequestRepository }) {
    super(TeamRequestRepository);
    _TeamRequestRepository = TeamRequestRepository;
  }

  //async funcs
}

module.exports = TeamRequestService;
