module.exports = {
  create: (req, res) => {
    const db = req.app.get("db");
    const { listName, inputs, id } = req.body;
    inputs.map((e, i) => {
      db.create_task(listName, e.body, id);
    });
    res.sendStatus(200);
  },
  read: (req, res) => {
    const db = req.app.get("db");
    db.get_task(req.params.id)
      .then(task => res.status(200).json(task))
      .catch(err => console.log(err));
  },
  deleteTask: (req, res) => {
    const db = req.app.get("db");
    db.delete_task(req.params.id)
      .then(() => res.sendStatus(200))
      .catch(err => console.log(err));
  },
  deleteList: (req, res) => {
    const db = req.app.get("db");
    db.delete_task_list(req.params.name)
      .then(() => res.sendStatus(200))
      .catch(err => console.log(err));
  }
};
