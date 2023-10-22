const nodemailer = require('nodemailer');
const { getEmailsFromDatabase } = require('../helpers/emailHelper');

const email = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

const configuration = {
  service: 'gmail',
  secure: false,
  auth: {
    user: email,
    pass: pass
  },
  defaults: {
    from: email
  }
};
class EmailService {

  async sendEmailToUser(userEmail, subject, content) {
    try {
      const transporter = nodemailer.createTransport(configuration);
      const mailOptions = {
        from: email,
        to: userEmail,
        subject: subject,
        text: content
      };

      await transporter.sendMail(mailOptions);
      console.log('Correo enviado exitosamente');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  }

  async sendEmailsToAllUsers(subject, content) {
    try {
      const emails = await getEmailsFromDatabase();

      const transporter = nodemailer.createTransport(configuration);

      for (const userEmail of emails) {
        const mailOptions = {
          from: email,
          to: userEmail,
          subject: subject,
          text: content
        };

        await transporter.sendMail(mailOptions);
      }

      console.log('Correos enviados exitosamente');
    } catch (error) {
      console.error('Error al enviar los correos:', error);
    }
  }
}


module.exports = EmailService
