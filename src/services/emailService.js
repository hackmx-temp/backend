const nodemailer = require('nodemailer');

// Se requiere modificar basado en la base de datos -> const { getEmailsFromDatabase } = require('');

async function sendEmailsToAllUsers() {
  try {
    // Obtiene los correos electrónicos desde la base de datos
    const emails = await getEmailsFromDatabase();

    // Configura el correo de donde se evian
    const transporter = nodemailer.createTransport({
      service: '',
      auth: {
        user: '',
        pass: ''
      }
    });

    // Itera sobre los correos electrónicos y envía un correo a cada uno
    for (const email of emails) {
      const mailOptions = {
        from: 'tu_correo@gmail.com',
        to: email,
        subject: 'Asunto del correo',
        text: 'Contenido del correo'
      };

      await transporter.sendMail(mailOptions);
    }

    console.log('Correos enviados exitosamente');
  } catch (error) {
    console.error('Error al enviar los correos:', error);
  }
}

module.exports = { sendEmailsToAllUsers };
