const bcrypt = require("bcryptjs");
const twilio = require("twilio");
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);

module.exports = {
  user: (req, res) => {
    res.status(200).json(req.session.user);
  },
  register: async (req, res) => {
    const { username, password, number, email } = req.body;
    const db = req.app.get("db");
    const result = await db.get_mortal([username]);
    const existingMortal = result[0];
    if (existingMortal) {
      return res
        .status(409)
        .json(
          "There is already an account associated with this username. Please log in."
        );
    }
    let isNumber = true;
    await client.lookups
      .phoneNumbers(number)
      .fetch({ countryCode: "US" })
      .then(phone_number => {})
      .catch(() => {
        isNumber = false;
      });
    if (!isNumber) {
      return res.status(401).json("This is not a valid phone number");
    } else {
      const hash = await bcrypt.hash(password, 12);
      const registeredMortal = await db.register_mortal([
        username,
        hash,
        number,
        email
      ]);
      const mortal = registeredMortal[0];
      req.session.user = {
        username: mortal.username,
        id: mortal.mortal_id,
        number: mortal.number
      };
      client.messages
        .create({
          from: "+17372103836",
          to: mortal.number,
          body:
            "Thank you for creating an account at The Productivity Place! I will be your mobile assistant to help keep you productive. Say somethings along the lines of What can you do for me? or What all can you do? To get some help in learning how to use my service :)"
        })
        .then(message => {})
        .done();
      db.default_settings(mortal.mortal_id);
      return res.status(200).json(req.session.user);
    }
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
      username: mortal.username,
      number: mortal.number
    };
    return res.status(200).json(req.session.user);
  },
  logout: async (req, res) => {
    req.session.destroy();
    res.status(200).json(req.session);
  },
  deleteUser: (req, resp) => {
    const db = req.app.get("db");
    db.delete_user(req.params.id)
      .then(res => {
        req.session.destroy();
        resp.sendStatus(200);
      })
      .catch(err => console.log(err));
  }
};
