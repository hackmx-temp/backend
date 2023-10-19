const BaseService = require('./base.service');
let _TeamRepository = null;

class TeamService extends BaseService {
  constructor({ TeamRepository }) {
    super(TeamRepository);
    _TeamRepository = TeamRepository;
  }

  //async funcs
}


module.exports = TeamService;