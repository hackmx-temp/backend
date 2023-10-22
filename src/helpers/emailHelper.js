const { User } = require('../models');

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

module.exports = { getEmailsFromDatabase };
