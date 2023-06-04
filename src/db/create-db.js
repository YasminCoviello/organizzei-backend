const { List, Task } = require('../models');

const models = [List, Task];

const syncModels = models.map(model => model.sync());

Promise.all(syncModels)
  .then(() => {
    console.log("Criação das tabelas concluída");
  })
  .catch(error => {
    console.error("Erro ao montar banco", error);
  });
