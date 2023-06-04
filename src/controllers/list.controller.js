const ListService = require("../services/list.service");
const Controller = require("./controller");

const ListController = Controller({
  create: async function(req, res) {
    const response = await ListService.create(req.body);
    res.status(201).send(response);
  },
  findAll: async function(req, res) {
    const response = await ListService.findAll();
    res.status(200).send(response);
  },
  findOne: async function(req, res) {
    const response = await ListService.findOne(req.params.id);
    res.status(200).send(response);
  },
  delete: async function(req, res) {
    await ListService.delete(req.params.id);
    res.status(204).send({ message: 'List deleted successfully.' });
  },
  update: async function(req, res) {
    const list = await ListService.update(req.params.id, req.body);
    res.status(200).send(list);
  }
});

module.exports = ListController;
