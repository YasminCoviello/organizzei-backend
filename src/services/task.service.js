const { Op } = require("sequelize");
const { BadRequestError, NotFoundError } = require("../errors");
const { Task, TASK_STATES } = require("../models");
const ListService = require("./list.service");

const TaskService = {
  create: async function(listId, body) {
    const { title, description, date, user } = body;

    if(!title) throw new BadRequestError('Title is required');

    const list = await ListService.findOne(listId, user.id);

    return await Task.create({ title, description, date, listId: list.id, currentColumn: 'TODO' });
  },
  findAll: async function(listId, date, userId) {
    const startDate = new Date(date);
    const endDate = new Date(date);

    endDate.setHours(23);
    endDate.setMinutes(59);
    endDate.setSeconds(59);

    const list = await ListService.findOne(listId, userId);

    const tasks = await Task.findAll({ 
      where: { 
        listId: list.id,
        date: {
          [Op.between]: [startDate, endDate]
        }
      },         
      order: [
        ['updatedAt', 'ASC'],
      ],
    });
    return tasks;
  },
  delete: async function(listId, id, userId) {
    const list = await ListService.findOne(listId, userId);

    const deleteCount = await Task.destroy({ where: { listId: list.id, id } });
    if(deleteCount === 0) throw new NotFoundError('Task not found');
  },
  advance: async function(listId, id, userId) {
    const list = await ListService.findOne(listId, userId);

    const task = await Task.findOne({ where: { id, listId: list.id } });

    if(!task) throw new NotFoundError(`Task with id ${id} wasn't found.`);

    const nextStateIndex = TASK_STATES.findIndex((state) => task.currentColumn === state) + 1;
    const nextState = TASK_STATES[nextStateIndex];

    if(!nextState) throw new BadRequestError('This column change cannot be executed.')

    await Task.update({ currentColumn: nextState }, { where: { id, listId } });

    const updatedTask = Task.findOne({ where: { id, listId } });

    return updatedTask;
  },
  return: async function(listId, id, userId) {
    const list = await ListService.findOne(listId, userId);

    const task = await Task.findOne({ where: { id, listId: list.id } });

    if(!task) throw new NotFoundError(`Task with id ${id} wasn't found.`);

    const prevStateIndex = TASK_STATES.findIndex((state) => task.currentColumn === state) - 1;
    const prevState = TASK_STATES[prevStateIndex];

    if(!prevState) throw new BadRequestError('This column change cannot be executed.')

    await Task.update({ currentColumn: prevState }, { where: { listId, id } });

    const updatedTask = Task.findOne({ where: { id, listId } });

    return updatedTask;
  }
}

module.exports = TaskService;
