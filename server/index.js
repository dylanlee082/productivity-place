require("dotenv").config();
const express = require("express");
const { json, urlencoded } = require("body-parser");
const massive = require("massive");
const session = require("express-session");

const { understand } = require("./controllers/sms/sms_controller");
const {
  register,
  login,
  logout,
  user
} = require("./controllers/auth_controller");
const apptCon = require("./controllers/appt_controller");
const taskCon = require("./controllers/task_controller");
const contactCon = require("./controllers/contact_controller");

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

app.post("/sms", understand);

app.get("/auth/user", user);
app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/auth/logout", logout);

app.get("/api/appt/:id", apptCon.read);
app.post("/api/appt", apptCon.create);
app.delete("/api/appt/:id", apptCon.delete);

app.get("/api/task/:id", taskCon.read);
app.post("/api/task", taskCon.create);
app.delete("/api/task/:id", taskCon.deleteTask);
app.delete("/api/list/:name", taskCon.deleteList);

app.get("/api/contact/:id", contactCon.read);
app.post("/api/contact", contactCon.create);
app.delete("/api/contact/:id", contactCon.delete);

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// module.exports = { assistant, sessionId };
