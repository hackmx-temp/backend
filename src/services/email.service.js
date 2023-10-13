import { createTransport } from 'nodemailer';
import { getEmailsFromDatabase } from './emailHelper'; 

async function sendEmailsToAllUsers() {
  try {
    const emails = await getEmailsFromDatabase(); 
   
    const transporter = createTransport({
      host: '', // Reemplaza con tu servidor SMTP
      port: 1,
      secure: false,
      auth: {
        user: 'admin@hack.mx',
        pass: 'AdaDev*3CDMX'
      }
    });

    // Itera sobre los correos electrónicos y envía un correo a cada uno
    for (const email of emails) {
      const mailOptions = {
        from: 'admin@hack.mx',
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

export default { sendEmailsToAllUsers };
