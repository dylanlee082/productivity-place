module.exports = {
  getSettings: (req, res) => {
    const db = req.app.get("db");
    db.get_user_settings(req.params.id)
      .then(settings => res.status(200).json(settings[0]))
      .catch(err => console.log(err));
  },
  updateSettings: (req, res) => {
    console.log(req.body);
    const db = req.app.get("db");
    const { tasktoggle, calendartoggle, contacttoggle, id } = req.body;
    db.update_user_settings(tasktoggle, calendartoggle, contacttoggle, id).then(
      () => res.sendStatus(200)
    );
  },
  updatePersonal: (req, res) => {},
  updateAvatar: (req, res) => {}
};
