function Controller(controller) {
  const controllerEntries = Object.entries(controller);

  const safeController = controllerEntries.map(([name, method]) => {
    const safeMethod = async (req, res, next) => {
      try {
        return await method(req, res, next);
      } catch(e) {
        console.log(e);
        
        if(e.code) {
          res.status(e.code).send({ message: e.message });
        } else {
          res.status(500).send({ message: 'Unexpected error.' });
        }
      }
    }

    return [name, safeMethod];
  });

  return Object.fromEntries(safeController);
}

module.exports = Controller;
