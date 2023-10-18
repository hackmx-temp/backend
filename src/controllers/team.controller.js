let teamService = require("../services/team.service");

class TeamController {
    constructor ({ TeamService }) {
        teamService = TeamService;
    }
    
}