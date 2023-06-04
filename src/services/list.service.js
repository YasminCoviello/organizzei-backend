const { BadRequestError, NotFoundError } = require("../errors");
const { List } = require("../models");

const ListService = {
  create: async function(body) {
    const { title, description, icon, user } = body;

    if(!title) throw new BadRequestError('Title is required');

    return await List.create({ title, description, icon, userId: user.id });
  },
  findAll: async function(user) {
    return await List.findAll({ where: { userId: user.id } });
  },
  findOne: async function(id, userId) {
    const list = await List.findOne({ where: { id, userId } });
    
    if(!list) throw new NotFoundError(`List with id ${id} wasn't found`);

    return list;
  },
  delete: async function(id, userId) {
    const deletedCounter = await List.destroy({ where: { id, userId } });
    if(deletedCounter === 0) throw new NotFoundError(`List with id ${id} wasn't found`);
  },
  update: async function(id, fields) {
    const updateCounter = await List.update({ ...fields, user: null }, { where: { id, userId: fields.user.userId } });
    
    if(updateCounter === 0) throw new NotFoundError(`List with id ${id} wasn't found`);

    const list = await List.findOne({ where: { id } });

    return list;
  }
}

module.exports = ListService;
