module.exports = {
  create: (req, res) => {
    const db = req.app.get("db");
    const { name, number, address, id } = req.body;
    db.create_contact(name, number, address, id)
      .then(() => res.sendStatus(200))
      .catch(err => {
        console.log(err);
        res.status(500).json("Contact was not created");
      });
  },
  read: (req, res) => {
    const db = req.app.get("db");
    db.get_contact(req.params.id)
      .then(contact => res.status(200).json(contact))
      .catch(err => console.log(err));
  },
  update: (req, res) => {
    const db = req.app.get("db");
    const { name, number, address, id } = req.body;
    db.update_contact(name, number, address, id)
      .then(() => res.sendStatus(200))
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  delete: (req, res) => {
    const db = req.app.get("db");
    db.delete_contact(req.params.id)
      .then(() => res.sendStatus(200))
      .catch(err => console.log(err));
  }
};
