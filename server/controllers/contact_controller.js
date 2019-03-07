module.exports = {
  createContact: (req, res) => {
    const db = req.app.get("db");
    const { name, number, address, id } = req.body;
    db.create_contact(name, number, address, id)
      .then(() => res.sendStatus(200))
      .catch(err => {
        console.log(err);
        res.status(500).json("Contact was not created");
      });
  },
  readContact: (req, res) => {
    const db = req.app.get("db");
    db.get_contact(req.params.id)
      .then(contact => res.status(200).json(contact))
      .catch(err => console.log(err));
  },
  updateContact: (req, res) => {
    const db = req.app.get("db");
    const { name, number, address, contact_id } = req.body;
    db.update_contact(name, number, address, contact_id)
      .then(() => res.sendStatus(200))
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  deleteContact: (req, res) => {
    const db = req.app.get("db");
    db.delete_contact(req.params.id)
      .then(() => res.sendStatus(200))
      .catch(err => console.log(err));
  }
};
