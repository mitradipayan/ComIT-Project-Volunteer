const { findUser, matchPassword } = require("../services/userServices");

function renderLoginForm(req, res) {
	res.render("login", { layout: null });
}

async function processLogin(req, res, next) {
	const passwordMatched = await matchPassword(
		req.body.login,
		req.body.password
	);

	if (passwordMatched === "UserNotFound") {
		loginStatusMessage = "User does not exist. Please register user.";
	} else if (!passwordMatched) {
		loginStatusMessage = "Incorrect Password. Please try again";
	} else {
		loginStatusMessage = "Login Successful";
	}
	// 	switch (foundUser) {
	// 		case "UserNotFound":
	// 			loginStatusMessage = "User does not exist. Please register user.";
	// 			break;
	// 		case "success":
	// 			loginStatusMessage = "Login Successful";
	// 			break;
	// 		default:
	// 			loginStatusMessage = "Incorrect Password. Please try again";
	// }

	res.render("login", { layout: null, loginStatusMessage });
}

module.exports = { renderLoginForm, processLogin };
