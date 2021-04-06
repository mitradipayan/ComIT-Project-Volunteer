const User = require("../models/user");
const { validateLogin } = require("../services/userServices");
// const { verify } = require("jsonwebtoken");

function renderLoginForm(req, res) {
	if (req.username) {
		console.log(`renderLoginForm req.username: ${req.username}`);
		res.render("home", {
			layout: req.layout,
			loginstatus: `Welcomeee ${req.fname.split(" ")[0]}`,
			tag: "Home",
		});
	}
	res.render("login", { layout: null, tag: "Login" });
}

function renderLogout(req, res) {
	res.clearCookie("jwToken");
	res.render("home", {
		layout: "main",
		loginstatus: "Logged Out",
		tag: "Home",
	});
}

async function processLogin(req, res, next) {
	const { login, password, rememberme } = req.body;
	// const user = await findUser(login);
	// const passwordMatched = await matchPassword(login, password);
	const validationResult = await validateLogin(login, password);
	const { jwtString, user } = validationResult;

	if (!jwtString) {
		loginStatusMessage =
			"Unauthorized user. Please register or enter correct credentials";
		res.render("login", { layout: null, loginStatusMessage });
	} else {
		res.cookie("jwToken", jwtString, { httpOnly: true });
		res.render("home", {
			layout: "loggedinLayout1",
			loginstatus: `Welcome ${user.name.split(" ")[0]}`,
			tag: "Home",
		});
	}
}

module.exports = { renderLoginForm, processLogin, renderLogout };
