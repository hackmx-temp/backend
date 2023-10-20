const { generateToken } = require('../helpers/jwt.helper');
const BaseService = require('./base.service');
let _TeamRepository = null;
let _RegisteredUserRepository = null;

class TeamService extends BaseService {
  constructor({ TeamRepository, RegisteredUserRepository=null }) {
    super(TeamRepository);
    _TeamRepository = TeamRepository;
    _RegisteredUserRepository = RegisteredUserRepository;
  }

}

module.exports = TeamService;