module.exports = {
  create: (req, res) => {
    const db = req.app.get("db");
    const { date, name, location, id } = req.body;
    db.create_appt(date, name, location, id)
      .then(() => res.sendStatus(200))
      .catch(err => {
        console.log(err);
        res.status(500).json("Appt was not created");
      });
  },
  read: (req, res) => {
    const db = req.app.get("db");
    db.get_appt(req.params.id)
      .then(appt => res.status(200).json(appt))
      .catch(err => console.log(err));
  },
  update: (req, res) => {
    const db = req.app.get("db");
    const { appt_time, name, location, appt_id } = req.body;
    db.update_appt(appt_time, name, location, appt_id)
      .then(() => res.sendStatus(200))
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  delete: (req, res) => {
    const db = req.app.get("db");
    db.delete_appt(req.params.id)
      .then(() => res.sendStatus(200))
      .catch(err => console.log(err));
  }
};
