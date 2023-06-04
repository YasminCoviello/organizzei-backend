const { BadRequestError, NotFoundError } = require("../errors");
const { User } = require("../models");

const UserService = {
  register: async function(body) {
    const { name, email, password } = body;

    if(!name) throw new BadRequestError('Name is required');
    if(!email) throw new BadRequestError('Email is required');
    if(!password) throw new BadRequestError('Password is required');

    return await User.create({ name, email, password });
  },

  login: async function(body) {
    const { email, password } = body;

    if(!email) throw new BadRequestError('Email is required');
    if(!password) throw new BadRequestError('Password is required');

    const user = await User.findOne({ where: { email, password }});

    if(!user) throw new BadRequestError(`Invalid Credentials`);

    return user;
  },

  recoverPassword: async function(body) { 
    const { email } = body;

    if(!email) throw new BadRequestError('Email is required');

    const user = await User.findOne({ where: { email }});

    if(!user) throw new NotFoundError(`User not found`);

    return user;
  },

  updatePassword: async function(body) { 
    const { email, oldPassword, newPassword } = body;

    if(!email) throw new BadRequestError('Email is required');
    if(!oldPassword) throw new BadRequestError('Old password is required');
    if(!newPassword) throw new BadRequestError('New password is required');

    const user = await User.findOne({ where: { email, password: oldPassword }});

    if(!user) throw new NotFoundError(`User not found`);

    await User.update({ password: newPassword }, { where: { email }});
    
  },

  findAll: async function() {
    return await User.findAll();
  },
  findOne: async function(id) {
    const user = await User.findOne({ where: { id } });
    
    if(!user) throw new NotFoundError(`User with id ${id} wasn't found`);

    return user;
  },
  delete: async function(id) {
    const deletedCounter = await List.destroy({ where: { id } });
    if(deletedCounter === 0) throw new NotFoundError(`User with id ${id} wasn't found`);
  },
  update: async function(id, fields) {
    const updateCounter = await User.update(fields, { where: { id } });
    
    if(updateCounter === 0) throw new NotFoundError(`User with id ${id} wasn't found`);

    const user = await User.findOne({ where: { id } });

    return user;
  }
}

module.exports = UserService;
