require("dotenv").config();
const express = require("express");
const { json, urlencoded } = require("body-parser");
const massive = require("massive");
const session = require("express-session");
const twilio = require("twilio");
const MessagingResponse = twilio.twiml.MessagingResponse;

const { understand } = require("./controllers/sms/sms_controller");
const authCon = require("./controllers/auth_controller");
const apptCon = require("./controllers/appt_controller");
const taskCon = require("./controllers/task_controller");
const contactCon = require("./controllers/contact_controller");
const settingCon = require("./controllers/settings_controller");

const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

massive(process.env.CONNECTION_STRING).then(db => {
  console.log("db connected");
  app.set("db", db);
});

const userCheck = (req, resp, next) => {
  const db = req.app.get("db");
  db.get_number(req.body.From)
    .then(res => {
      if (res[0] && res[0].number === req.body.From) {
        req.session.user = {
          id: res[0].mortal_id,
          username: res[0].username,
          number: res[0].number
        };
        return next();
      } else {
        const twiml = new MessagingResponse();
        twiml.message(
          "I'm sorry you do not have an account please go online and create one."
        );
        resp.writeHead(200, { "Content-Type": "text/xml" });
        resp.end(twiml.toString());
      }
    })
    .catch(err => console.log(err));
};

app.post("/sms", userCheck, understand);

app.get("/api/settings/:id", settingCon.getSettings);
app.put("/api/settings", settingCon.updateSettings);

app.get("/auth/user", authCon.user);
app.post("/auth/register", authCon.register);
app.post("/auth/login", authCon.login);
app.get("/auth/logout", authCon.logout);
app.delete("/auth/delete/:id", authCon.deleteUser);

app.get("/api/appt/:id", apptCon.read);
app.put("/api/appt", apptCon.update);
app.post("/api/appt", apptCon.create);
app.delete("/api/appt/:id", apptCon.delete);

app.get("/api/task/:id", taskCon.read);
app.post("/api/task", taskCon.create);
app.put("/api/task", taskCon.update);
app.delete("/api/task/:id", taskCon.deleteTask);
app.delete("/api/list/:name", taskCon.deleteList);

app.get("/api/contact/:id", contactCon.read);
app.post("/api/contact", contactCon.create);
app.put("/api/contact", contactCon.update);
app.delete("/api/contact/:id", contactCon.delete);

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
