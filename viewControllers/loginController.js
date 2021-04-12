const { compareSync } = require("bcrypt");
const User = require("../models/user");
const { validateLogin, findUser } = require("../services/userServices");
// const { verify } = require("jsonwebtoken");

async function renderHome(req, res) {
	if (req.username) {
		const user = await findUser(req.username).then((res) => {
			return res;
		});
		res.render("home", {
			layout: req.layout,
			loginstatus: `Welcome ${req.fname}`,
			// req.category === "individual"
			// 	? `Welcome ${req.fname.split(" ")[0]}`
			// 	: `Welcome ${user.name}`,
			tag:
				req.category === "individual"
					? `Welcome ${req.fname.split(" ")[0]}`
					: `Welcome ${user.name}`,
		});
	} else {
		res.render("home", { loginstatus: null, tag: "Home" });
	}
}

async function renderLoginForm(req, res) {
	const user = await findUser(req.username).then((res) => {
		return res;
	});
	if (req.username) {
		res.render("home", {
			layout: req.layout,
			loginstatus: `Welcome ${req.fname}`,
			// 	req.category === "individual"
			// 		? `Welcome ${req.fname.split(" ")[0]}`
			// 		: `Welcome ${user.name}`,
			tag: `Welcome ${req.fname}`,
			// 	req.category === "individual"
			// 		? `Welcome ${req.fname.split(" ")[0]}`
			// 		: `Welcome ${user.name}`,
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
			loginstatus:
				user.category === "individual"
					? `Welcome ${user.name.split(" ")[0]}`
					: `Welcome ${user.name}`,
			tag: "Home",
		});
	}
}

module.exports = { renderLoginForm, processLogin, renderLogout, renderHome };
