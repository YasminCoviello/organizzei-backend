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

Task.belongsTo(List, { foreignkey: { name: 'listId', allowNull: false }, onDelete: 'CASCADE' });
List.hasMany(Task);


module.exports = { Task, List, TASK_STATES };
