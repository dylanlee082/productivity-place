module.exports = {
  create: (req, res) => {
    const db = req.app.get("db");
    const { body } = req.body;
    db.create_task(body)
      .then(() => res.sendStatus(200))
      .catch(err => {
        console.log(err);
        res.status(500).json("Task was not created");
      });
  },
  read: (req, res) => {
    const db = req.app.get("db");
    db.get_appt()
      .then(appt => res.status(200).json(appt))
      .catch(err => console.log(err));
  },
  delete: (req, res) => {
    const db = req.app.get("db");
    db.delete_appt(req.params.id)
      .then(() => res.sendStatus(200))
      .catch(err => console.log(err));
  }
};
