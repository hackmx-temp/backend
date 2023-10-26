const { DataTypes } = require('sequelize');
const sequelize = require("../database")
const { compareSync, hashSync, genSaltSync } = require("bcryptjs");

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
}, {
  freezeTableName: true,
});

const RegisteredUser = sequelize.define('RegisteredUser', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references:{
      model: 'User',
      key: 'id'
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_leader: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  freezeTableName: true,
  hooks: {
    beforeCreate: (registeredUser) => {
      const salt = genSaltSync();
      registeredUser.password = hashSync(registeredUser.password, salt);
    },
    beforeUpdate: (registeredUser) => {
      const salt = genSaltSync();
      registeredUser.password = hashSync(registeredUser.password, salt);
    }
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
  campus: {
    type: DataTypes.ENUM,
    values: ['CCM', 'CSF', 'Toluca', 'CEM'],
    allowNull: false
  },
  is_completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  completion_time: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
  sponsor: {
    type: DataTypes.ENUM,
    values: ['No asignado', 'AWS', 'DaCompass', 'Liverpool', 'La Moderna', 'Thales'],
    defaultValue: 'No asignado',
    allowNull: false
  },
  members: {
    type: DataTypes.JSON, // Use JSON data type to store an array of emails
    validate: {
      validateMembersLength() {
        if (this.members && this.members.length > 5) {
          throw new Error('Los grupos son de máximo 5 personas.');
        }
      }
    }
  }
}, {
  freezeTableName: true,
});

const TeamRequest = sequelize.define('TeamRequest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  /* status: {
    type: DataTypes.ENUM,
    values: ['pendiente', 'aceptado', 'rechazado'],
    allowNull: false,
    defaultValue: 'pendiente',
  } */
}, {
  freezeTableName: true,
});

const PasswordResetToken = sequelize.define('PasswordResetToken', {
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expires_in: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'RegisteredUser',
      key: 'id'
    },
    allowNull: false,
    unique: true
  }
}, {freezeTableName: true});

// One to one relationship between RegisteredUser and User
User.hasOne(RegisteredUser, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: {
    name: 'id',
    allowNull: false
  }
});
RegisteredUser.belongsTo(User, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  foreignKey: {
    name: 'id',
    allowNull: false
  }
});

// One to one relationship between RegisteredUser and Team
Team.hasOne(RegisteredUser, {
  onDelete: 'SET NULL',
  onUpdate: 'SET NULL',
  foreignKey: {
    name: 'team_id',
    allowNull: true
  }
});
RegisteredUser.belongsTo(Team, {
  onDelete: 'SET NULL',
  onUpdate: 'SET NULL',
  foreignKey: {
    name: 'team_id',
    allowNull: true
  }
});

// Many to many relationship between RegisteredUser and TeamRequest
Team.belongsToMany(RegisteredUser, {
  through: 'TeamRequest',
  foreignKey: 'team_id'
 });

// Many to many relationship between RegisteredUser and TeamRequest
RegisteredUser.belongsToMany(Team, {
  through: 'TeamRequest',
  foreignKey: 'user_id'
 });

// One to one relationship between RegisteredUser and PasswordResetToken
PasswordResetToken.belongsTo(RegisteredUser, {
  onDelete: 'CASCADE',
  foreignKey: {
    name: 'user_id',
    allowNull: false
  }
});
RegisteredUser.hasOne(PasswordResetToken, {
  onDelete: 'CASCADE',
  foreignKey: {
    name: 'user_id',
    allowNull: false
  }
});

User.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());
  return values;
}
RegisteredUser.prototype.validatePassword = function (password) {
  return compareSync(password, this.password);
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

PasswordResetToken.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());
  return values;
}

module.exports = {
  User,
  RegisteredUser,
  Team,
  TeamRequest,
  PasswordResetToken
}

