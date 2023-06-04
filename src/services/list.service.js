const { BadRequestError, NotFoundError } = require("../errors");
const { List } = require("../models");

const ListService = {
  create: async function(body) {
    const { title, description, icon } = body;

    if(!title) throw new BadRequestError('Title is required');

    return await List.create({ title, description, icon });
  },
  findAll: async function() {
    return await List.findAll();
  },
  findOne: async function(id) {
    const list = await List.findOne({ where: { id } });
    
    if(!list) throw new NotFoundError(`List with id ${id} wasn't found`);

    return list;
  },
  delete: async function(id) {
    const deletedCounter = await List.destroy({ where: { id } });
    if(deletedCounter === 0) throw new NotFoundError(`List with id ${id} wasn't found`);
  },
  update: async function(id, fields) {
    const updateCounter = await List.update(fields, { where: { id } });
    
    if(updateCounter === 0) throw new NotFoundError(`List with id ${id} wasn't found`);

    const list = await List.findOne({ where: { id } });

    return list;
  }
}

module.exports = ListService;
