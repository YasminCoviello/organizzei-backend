const Sequelize = require("sequelize");

const sequelize = new Sequelize(
 'organizzei',
 'root',
 'root',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

exports.db = sequelize;