import { User } from './user.model';

async function getEmailsFromDatabase() {
  try {
    const users = await User.findAll({
      attributes: ['email']
    });

    const emails = users.map((user) => user.email);

    return emails;
  } catch (error) {
    throw error;
  }
}

export default { getEmailsFromDatabase };
