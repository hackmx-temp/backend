const BaseRepository = require("./base.repository");
let _passwordResetToken = null;

class PasswordResetTokenRepository extends BaseRepository {
  constructor({ PasswordResetToken }) {
    super(PasswordResetToken);
    _passwordResetToken = PasswordResetToken;
  }

  // Pass a token and the userid to create a new password reset token
  async createForUser(token, userId) {
    // Quiero que expire en una hora
    const expires_in = new Date(new Date().getTime() + 60 * 60 * 1000);
    return await super.create({ token: token, user_id: userId, expires_in: expires_in });
  }

  // Pass a token to get the password reset token instance
  async getWithToken(token) {
    return await _passwordResetToken.findOne({ where: { token: token } });
  }

  async getWithUserId(userId) {
    return await _passwordResetToken.findOne({ where: { user_id: userId } });
  }

  // Pass a token to delete the password reset token instance
  async deleteWithToken(token) {
    return await _passwordResetToken.destroy({ where: { token: token } });
  }

}

module.exports = PasswordResetTokenRepository;