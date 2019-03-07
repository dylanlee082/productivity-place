module.exports = {
  getSettings: (req, res) => {
    const db = req.app.get("db");
    db.get_user_settings(req.params.id)
      .then(settings => res.status(200).json(settings[0]))
      .catch(err => console.log(err));
  },
  updateSettings: (req, res) => {
    const db = req.app.get("db");
    const { tasktoggle, calendartoggle, contacttoggle, id } = req.body;
    db.update_user_settings(tasktoggle, calendartoggle, contacttoggle, id)
      .then(() => res.sendStatus(200))
      .catch(err => console.log(err));
  },
  updatePersonal: (req, res) => {
    const db = req.app.get("db");
    const {
      fullname,
      email,
      number,
      fact,
      birthday,
      country,
      region,
      id
    } = req.body;
    db.update_user_personal(
      fullname,
      email,
      number,
      fact,
      birthday,
      country,
      region,
      id
    )
      .then(() => res.sendStatus(200))
      .catch(err => console.log(err));
  },
  updateAvatar: (req, res) => {
    const db = req.app.get("db");
    const { img, id } = req.body;
    db.update_user_avatar(img, id)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => console.log(err));
  }
};
