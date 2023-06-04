const { List, Task, User } = require('../models');

const models = [User, List, Task];

const syncModels = models.map(model => model.sync());

Promise.all(syncModels)
  .then(() => {
    console.log("Criação das tabelas concluída");
  })
  .catch(error => {
    console.error("Erro ao montar banco", error);
  });
