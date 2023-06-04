const express = require('express');
const cors = require('cors');
const { db } = require('./db');
const TaskController = require('./controllers/task.controller');
const ListController = require('./controllers/list.controller');

const port = 4000;

const app = express();
app.use(express.json());
app.use(cors());

db.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

db.sync().then(() => {
  console.log('Tables created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

// List
app.post('/list', ListController.create);
app.get('/list', ListController.findAll);
app.get('/list/:id', ListController.findOne);
app.delete('/list/:id', ListController.delete);
app.put('/list/:id', ListController.update);

// Task
app.post('/list/:listId/task', TaskController.create);
app.get('/list/:listId/task', TaskController.findAll);
app.delete('/list/:listId/task/:id', TaskController.delete);
app.put('/list/:listId/task/:id/advance', TaskController.advance);
app.put('/list/:listId/task/:id/return', TaskController.return);

app.listen(port, () => {
  console.log('Tá funcionando, hein? http://localhost:' + port);
});
