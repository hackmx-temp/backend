let passwordResetTokenService = null;

class PasswordResetTokenController {
    constructor({ PasswordResetTokenService }) {
        passwordResetTokenService = PasswordResetTokenService;
    }

    async get(req, res) {
        const { token } = req.params;
        const tokenData = await passwordResetTokenService.get(token);
        return res.send(tokenData);
    }

    async create(req, res) {
        const { body } = req;
        const createdToken = await passwordResetTokenService.create(body);
        return res.status(201).send(createdToken);
    }

    async delete(req, res) {
        const { token } = req.params;
        const deletedToken = await passwordResetTokenService.delete(token);
        return res.send(deletedToken);
    }

    async validate(req, res) {
        const { token } = req.params;
        await passwordResetTokenService.validate(token);
        return res.send({
            message: "Token validated successfully"    
        });
    }
}

module.exports = PasswordResetTokenController;