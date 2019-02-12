module.exports = {
  create: (req, res) => {
    const db = req.app.get("db");
    const { body, list_name, id } = req.body;
    db.create_task(list_name, body, id)
      .then(() => res.sendStatus(200))
      .catch(err => {
        console.log(err);
        res.status(500).json("Task was not created");
      });
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
