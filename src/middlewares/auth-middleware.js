const { User } = require("../models");

async function authMiddleware(req, res, next) {
  const { email } = req.headers;

  if(!email) return res.status(401).send({ message: 'Unauthorized.' });

  const user = await User.findOne({ where: { email } });

  if(!user) return res.status(401).send({ message: 'Unauthorized.' });

  req.body.user = user;

  next();
}

module.exports = authMiddleware;
