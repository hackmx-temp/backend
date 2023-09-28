const { DataTypes } = require('sequelize');
const sequelize = require("../database")
const { compareSync, hashSync, genSaltSync } = require("bcryptjs");


const User = sequelize.define('User', {
  // Model attributes are defined here
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
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  university: {
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
  is_from_Tec: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
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
    validate: {
      isIn: [['Male', 'Female', 'Non Binary']],
    }
  },
}, {
    freezeTableName: true,
    instanceMethods: {
        generateHash(password) {
            return hashSync(password, genSaltSync(8));
        },
        validPassword(password) {
            return compareSync(password, this.password);
        }
    }
});

module.exports = User;