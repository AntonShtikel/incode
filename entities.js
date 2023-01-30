const sequelize = require('./db')
const { DataTypes } = require('sequelize')

const Role = sequelize.define('role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value: { type: DataTypes.STRING, defaultValue: 'user' }
})

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userName: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  referral: { type: DataTypes.STRING }
})

Role.hasMany(User)
User.belongsTo(Role)

module.exports = {
  User,
  Role
}
