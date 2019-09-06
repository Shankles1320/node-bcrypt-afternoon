const express = require("express");
const session = require("express-session");
const massive = require("massive");
require("dotenv").config();
const authCtrl = require("../controllers/authControllers");

const app = express();

const { CONNECTION_STRING, SESSION_SECRET } = process.env;

massive(CONNECTION_STRING).then((db) => {
	app.set("db", db);
	console.log("db connected");
});

app.use(
	session({
		resave: true,
		saveUninitialized: false,
		secret: SESSION_SECRET
	})
);

app.post("/auth/register", authCtrl.register);

app.post("/auth/login", authCtrl.login);

app.get("/auth/logout", authCtrl.logout);

app.use(express.json());

const port = 4000;

app.listen(port, () => console.log(`listening on ${port}`));
