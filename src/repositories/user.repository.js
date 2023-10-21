const BaseRepository = require("./base.repository");
let _user = null;

class UserRepository extends BaseRepository {
  constructor({ User }) {
    super(User);
    _user = User;
  }

  async getUserByName(name) {
    return await _user.findOne({
      where: { name: name }
    });
  }

  async getUserByEmail(email) {
    let user;

    // Verificar si el email sigue el patrón de correos institucionales
    const institutionalEmailPattern = /^[aA]0\d{7}@tec\.mx$/;
    if (institutionalEmailPattern.test(email)) {
        // Extraer la matrícula del correo institucional
        const enrollment_id = email.split('@')[0].toUpperCase();

        // Buscar al usuario por matrícula
        user = await _user.findOne({
            where: { enrollment_id: enrollment_id }
        });
    } else {
        // Buscar al usuario por correo personal
        user = await _user.findOne({
            where: { email: email }
        });
    }
    return user;
  }

  async countByCampus(campus){
    return await _user.count({
      where: { campus: campus }
    });
  }

}

module.exports = UserRepository;
