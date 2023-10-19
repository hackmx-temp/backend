let BaseRepository = require("./base.repository");

class RegisteredUserRepository extends BaseRepository {
    constructor({ RegisteredUser }) {
        super(RegisteredUser);
        this.registeredUser = RegisteredUser;
    }
}

module.exports = RegisteredUserRepository;