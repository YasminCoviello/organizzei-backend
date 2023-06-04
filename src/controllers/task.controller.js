const TaskService = require("../services/task.service");
const Controller = require("./controller");

const TaskController = Controller({
  create: async function(req, res) {
    const response = await TaskService.create(req.params.listId, req.body);
    res.status(201).send(response);
  },
  findAll: async function(req, res) {
    const response = await TaskService.findAll(req.params.listId, req.query.date, req.body.user.id);
    res.status(200).send(response);
  },
  delete: async function(req, res) {
    await TaskService.delete(req.params.listId, req.params.id, req.body.user.id);
    res.status(204).send({ message: 'Task deleted successfully.' })
  },
  advance: async function(req, res) {
    const task = await TaskService.advance(req.params.listId, req.params.id, req.body.user.id);
    res.status(200).send(task);
  },
  return: async function(req, res) {
    const task = await TaskService.return(req.params.listId, req.params.id, req.body.user.id);
    res.status(200).send(task);
  }
});

module.exports = TaskController;
