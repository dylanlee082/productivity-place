require("dotenv").config();
const express = require("express");
const { json, urlencoded } = require("body-parser");
const massive = require("massive");
const session = require("express-session");

const { understand } = require("./controllers/sms_controller");
const { register, login, logout } = require("./controllers/auth_controller");

const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false
  })
);

massive(process.env.CONNECTION_STRING).then(db => {
  console.log("db connected");
  app.set("db", db);
});

app.post("/sms", understand);

app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/auth/logout", logout);

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
