require("dotenv").config();

const { static } = require("express");
const express = require("express");
const expressHandlebars = require("express-handlebars");
const path = require("path");
const cookieParser = require("cookie-parser");

const {
	renderLoginForm,
	processLogin,
	renderLogout,
	renderHome,
} = require("./viewControllers/loginController");
const {
	registerUser,
	renderRegisterForm,
} = require("./viewControllers/registerController");
const {
	renderOpportunity,
	renderCreateOpportunity,
	saveOpportunity,
	processFilterOpportunity,
} = require("./viewControllers/opportunityController");
const { authenticateUser } = require("./middleware/auth");
const { createOpportunity } = require("./services/opportunityServices");

const port = process.env.PORT || 3000;

const app = express();

// configure handlebars
app.engine(
	"handlebars",
	expressHandlebars({
		defaultLayout: "main",
	})
);

app.set("view engine", "handlebars");

// middlewares
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(authenticateUser);

// routes
// --------HOME----------
app.get("/", renderHome);

// ---------LOGIN------------------
app.get("/login", renderLoginForm);
app.post("/login", processLogin);
// ---------LOGOUT-------------
app.get("/logout", renderLogout);

// ---------REGISTER--------------
app.get("/register", renderRegisterForm);
app.post("/register", registerUser);

// ---------OPPORTUNITIES-------------
app.get("/opportunities", renderOpportunity);
app.post("/opportunities", processFilterOpportunity);
app.get("/createOpportunity", renderCreateOpportunity);
app.post("/createOpportunity", saveOpportunity);

// ----disable x-powered-by----------
app.disable("x-powered-by");

// error handlers
app.use((req, res) => {
	res.status(404).render("404", { layout: "main" });
});

app.use((err, req, res, next) => {
	res.status(500).render("500", { layout: "layout1" });
});

// start the server
app.listen(port, () => {
	console.log(`Express started server on port ${port}`);
});
