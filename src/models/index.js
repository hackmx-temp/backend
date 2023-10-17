const { DataTypes } = require('sequelize');
const sequelize = require("../database")
// const { compareSync, hashSync, genSaltSync } = require("bcryptjs");

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone_number: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  campus: {
    type: DataTypes.STRING,
    allowNull: false
  },
  career: {
    type: DataTypes.STRING,
    allowNull: false
  },
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bus_required: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  enrollment_id: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
    validate: {
      is: /^A0[0-9]{7}$/i
    }
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  allergies: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  medical_conditions: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

const RegisteredUser = sequelize.define('RegisteredUser', {
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_leader: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

const Team = sequelize.define('Team', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  number_participants: {
    type: DataTypes.INTEGER
  },
  is_completed: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const TeamRequest = sequelize.define('TeamRequest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});




User.hasOne(RegisteredUser);
RegisteredUser.belongsTo(User);

Team.hasOne(RegisteredUser);
RegisteredUser.belongsTo(Team);




User.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());
  return values;
}
RegisteredUser.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());
  return values;
}
Team.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());
  return values;
}
TeamRequest.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());
  return values;
}

module.exports = {
  User,
  RegisteredUser,
  Team,
  TeamRequest
}