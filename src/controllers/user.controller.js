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
  }
});

module.exports = UserController;
