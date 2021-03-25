const { static } = require("express");
const express = require("express");
const expressHandlebars = require("express-handlebars");
const path = require("path");
const {
	renderLoginForm,
	processLogin,
} = require("./viewControllers/loginController");
const {
	registerUser,
	renderRegisterForm,
} = require("./viewControllers/registerController");
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

// routes
// --------HOME----------
app.get("/", (req, res) => {
	res.render("home");
});
// ---------LOGIN------------------
app.get("/login", renderLoginForm);
app.post("/login", processLogin);
// ---------REGISTER--------------
app.get("/register", renderRegisterForm);
app.post("/register", registerUser);

// ---------OPPORTUNITIES-------------
app.get("/opportunities", (req, res) => {
	res.render("opportunities", { layout: "layout1" });
});

// error handlers
app.use((req, res) => {
	res.status(404).render("404", { layout: "layout1" });
});

app.use((err, req, res, next) => {
	res.status(500).render("500", { layout: "layout1" });
});

// start the server
app.listen(port, () => {
	console.log(`Express started server on port ${port}`);
	// pushOpp();
});
