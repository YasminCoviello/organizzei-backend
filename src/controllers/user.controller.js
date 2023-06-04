const UserService = require("../services/user.service");
const Controller = require("./controller");

const UserController = Controller({
  register: async function(req, res) {
    const response = await UserService.register(req.body);
    res.status(201).send(response);
  },
  login: async function(req, res) {
    const response = await UserService.login(req.body);
    res.status(201).send(response);
  },

  recoverPassword: async function(req, res) {
    const response = await UserService.recoverPassword(req.body);
    res.status(201).send(response);
  },

  updatePassword: async function(req, res) {
    await UserService.updatePassword(req.body);
    res.status(204).send();
  },

  findOne: async function(req, res) {
    const response = await UserService.findOne(req.params.id);
    res.status(200).send(response);
  },
  delete: async function(req, res) {
    await UserService.delete(req.params.id);
    res.status(204).send({ message: 'List deleted successfully.' });
  },
  update: async function(req, res) {
    const list = await UserService.update(req.params.id, req.body);
    res.status(200).send(list);
  }
});

module.exports = UserController;
