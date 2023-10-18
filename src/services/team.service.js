const BaseService = require('./base.service');

class TeamService extends BaseService {
    constructor({ TeamRepository }) {
        super(TeamRepository);
        this.teamRepository = TeamRepository;
    }

    async countByCampus(campus) {
        return await this.teamRepository.countByCampus(campus);
    }

    async create(team) {
    }
}