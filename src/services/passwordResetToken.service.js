const BaseService = require("./base.service");
const crypto = require("crypto");

let _passwordResetTokenRepository = null;

class PasswordResetTokenService extends BaseService {
    constructor({ PasswordResetTokenRepository }) {
        super(PasswordResetTokenRepository);
        _passwordResetTokenRepository = PasswordResetTokenRepository;
    }

    generateToken() {
        return crypto.randomBytes(20).toString("hex");
    }

    async getWithToken(token) {
        return await _passwordResetTokenRepository.getWithToken(token);
    }

    async deleteWithToken(token) {
        return await _passwordResetTokenRepository.deleteWithToken(token);
    }

    async createForUser(userId) {
        const token = this.generateToken();
        return await _passwordResetTokenRepository.createForUser(token, userId);
    }

    async validateToken(token) {
        const passwordResetToken = await _passwordResetTokenRepository.getWithToken(token);
        if (!passwordResetToken) {
            const error = new Error();
            error.status = 404;
            error.message = "Token no existe.";
            throw error;
        }
        const now = new Date();
        if (now > passwordResetToken.expire_at) {
            const error = new Error();
            error.status = 400;
            error.message = "Token expirado.";
            throw error;
        }
        return passwordResetToken;
    }
}

module.exports = PasswordResetTokenService;
