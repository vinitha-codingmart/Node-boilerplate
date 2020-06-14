const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize('doctor', 
                                'username', 
                                'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: console.log,
  freezeTableName: true,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
