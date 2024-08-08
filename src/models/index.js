const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/dbconfig.js');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('connected..');
  })
  .catch(err => {
    console.log('Error: ' + err);
  });

const db = {};

// Use ES6 `import` if using TypeScript or adjust for `require` in JavaScript
const StudentModel = require('./Student').default;
db.Student = StudentModel(sequelize, DataTypes);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({ force: false })
  .then(() => {
    console.log('yes re-sync done!');
  });

module.exports = db;
