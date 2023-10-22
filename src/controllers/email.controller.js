let _emailService = null;
class EmailController {
    constructor({ EmailService }) {
        _emailService = EmailService;
    }
    async sendEmailToUser(req, res) {
        const { body } = req;
        const { email } = body;
        const response = await _emailService.sendEmailToUser(email, "Hola", "Esto es una prueba");
        res.send(response);
    }
    async sendEmailsToAllUsers(req, res) {
        const { body } = req;
        const email = await _emailService.sendEmailsToAllUsers(body);
        return res.send(email);
    }
}

module.exports = EmailController;