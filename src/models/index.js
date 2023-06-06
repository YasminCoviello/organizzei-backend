const { DataTypes } = require("sequelize");
const { db } = require("../db");

const TASK_STATES = ['TODO', 'PROGRESS', 'DONE']

const List = db.define("lists", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Task = db.define("tasks", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
  },
  currentColumn: {
    type: DataTypes.ENUM,
    values: TASK_STATES
  },
  date: {
    type: DataTypes.DATE
  }
});

const User = db.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  imgSrc: {
    type: DataTypes.STRING,
  }
});

Task.belongsTo(List, { foreignkey: { name: 'listId', allowNull: false }, onDelete: 'CASCADE' });
List.hasMany(Task);

List.belongsTo(User, { foreignkey: { name: 'userId', allowNull: false }, onDelete: 'CASCADE' });
User.hasMany(List);

module.exports = { Task, List, User, TASK_STATES };
