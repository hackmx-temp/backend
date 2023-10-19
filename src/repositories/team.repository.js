const BaseRepository = require("./base.repository");

class TeamRepository extends BaseRepository{
    constructor({Team}){
        super(Team);
        this.team = Team;
    }

    async countByCampus(campus){
        return await this.team.count({
            where: { campus: campus }
        });
    }
}

module.exports = TeamRepository;