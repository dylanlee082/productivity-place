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
app.use(express.static(`${__dirname}/../build`));
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

massive(process.env.CONNECTION_STRING).then((db) => {
  console.log("db connected");
  app.set("db", db);
});

const userCheck = (req, resp, next) => {
  const db = req.app.get("db");
  db.get_number(req.body.From)
    .then((res) => {
      if (res[0] && res[0].number === req.body.From) {
        req.session.user = {
          id: res[0].mortal_id,
          username: res[0].username,
          number: res[0].number,
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
    .catch((err) => console.log(err));
};

app.post("/sms", userCheck, understand);

app.get("/api/settings/:id", settingCon.getSettings);
app.put("/api/settings", settingCon.updateSettings);
app.put("/api/avatar", settingCon.updateAvatar);
app.put("/api/personal", settingCon.updatePersonal);

app.get("/auth/user", authCon.user);
app.post("/auth/register", authCon.register);
app.post("/auth/login", authCon.login);
app.get("/auth/logout", authCon.logout);
app.delete("/auth/delete/:id", authCon.deleteUser);

app.get("/api/appt/:id", apptCon.readAppt);
app.put("/api/appt", apptCon.updateAppt);
app.post("/api/appt", apptCon.createAppt);
app.delete("/api/appt/:id", apptCon.deleteAppt);

app.get("/api/task/:id", taskCon.readTask);
app.post("/api/task", taskCon.createTask);
app.put("/api/task", taskCon.updateTask);
app.delete("/api/task/:id", taskCon.deleteTask);
app.delete("/api/list/:name", taskCon.deleteList);

app.get("/api/contact/:id", contactCon.readContact);
app.post("/api/contact", contactCon.createContact);
app.put("/api/contact", contactCon.updateContact);
app.delete("/api/contact/:id", contactCon.deleteContact);

const path = require("path"); // Usually moved to the start of file

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
