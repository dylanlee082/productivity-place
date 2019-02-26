const bcrypt = require("bcryptjs");

module.exports = {
  user: (req, res) => {
    console.log(req.session.user);
    res.status(200).json(req.session.user);
  },
  register: async (req, res) => {
    const { username, password, number } = req.body;
    const db = req.app.get("db");
    const result = await db.get_mortal([username]);
    const existingMortal = result[0];
    if (existingMortal) {
      return res
        .status(409)
        .json(
          "There is already an account associated with this email. Please proceed to log in."
        );
    }
    const hash = await bcrypt.hash(password, 12);
    console.log(hash);
    const registeredMortal = await db.register_mortal([username, hash, number]);
    const mortal = registeredMortal[0];
    req.session.user = {
      username: mortal.username,
      id: mortal.mortal_id,
      number: mortal.number
    };
    return res.status(200).json(req.session.user);
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");
    const foundMortal = await db.get_mortal(username);
    const mortal = foundMortal[0];
    if (!mortal) {
      return res
        .status(401)
        .send(
          "User not found. Please register as a new user before logging in."
        );
    }
    const isAuthenticated = bcrypt.compareSync(password, mortal.hash);
    if (!isAuthenticated) {
      return res.status(403).send("Incorrect password");
    }
    req.session.user = {
      id: mortal.mortal_id,
      username: mortal.username
    };
    return res.status(200).json(req.session.user);
  },
  logout: async (req, res) => {
    req.session.destroy();
    res.status(200).json(req.session);
  }
};
