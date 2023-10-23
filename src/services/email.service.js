const nodemailer = require('nodemailer');
const { getEmailsFromDatabase } = require('../helpers/emailHelper');
const ejs = require('ejs')

const email = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

const configuration = {
  service: 'gmail',
  secure: false,
  auth: {
    user: email,
    pass: pass
  },
};
class EmailService {
  async sendEmailToUser(userEmail, subject, content) {
    try {
      const transporter = nodemailer.createTransport(configuration, { from: email });
      const mailOptions = {
        to: userEmail,
        subject: subject,
        text: content
      };

      await transporter.sendMail(mailOptions);
      return {
        message: 'Correo enviado exitosamente',
        status: 200
      }
    } catch (error) {
      throw error;
    }
  }

  async resetPasswordEmail(userEmail, url) {
    try{
      return await this.genericSendEmailToUser(email, userEmail, 'Recuperar contraseña', 'resetPassword', { resetLink: url, email: email });
    } catch (error) {
      throw error;
    }
  }

  async genericSendEmailToUser(fromEmail, toEmail, subject, templateName, templateParams) {
    try {
      const transporter = nodemailer.createTransport(configuration);
      let mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: subject,
      }
      ejs.renderFile(__dirname + `/../templates/${templateName}.ejs`, templateParams, function (err, data) {
        if (err) {
          throw err;
        } else {
          mailOptions.html = data;
        }
      })
      await transporter.sendMail(mailOptions);
    } catch (error){
      throw error;
    }
    return {
      message: 'Correo enviado exitosamente',
      status: 200
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
