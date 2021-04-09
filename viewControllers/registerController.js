const { createUser } = require("../services/userServices");

function renderRegisterForm(req, res, next) {
	res.render("register", { layout: null });
}

async function registerUser(req, res, next) {
	const creationStatus = await createUser(req.body);
	if (creationStatus.tag === "UserExists") {
		registerMessage = `User with username ${creationStatus.output.username} exists as ${creationStatus.output.category}. Please enter different username`;
	} else if (creationStatus.tag === "PasswordMismatch") {
		registerMessage = `Passwords do not match; Please re-enter passwords`;
	} else if ((creationStatus.tag = "urlbadformat")) {
		registerMessage =
			"ID Image URL does not follow format. Please correct and resubmit";
	} else if (creationStatus.tag === "UserCreated") {
		registerMessage = `User with username ${creationStatus.output.username} created as ${creationStatus.output.category} successfully`;
	}
	res.render("register", { layout: null, registerMessage });
}

module.exports = { registerUser, renderRegisterForm };
