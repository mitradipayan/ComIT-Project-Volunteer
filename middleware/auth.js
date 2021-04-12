const { verifyJWT } = require("../services/authenticationServices");

async function authenticateUser(req, res, next) {
	const requestJWT = req.cookies.jwToken;
	if (!requestJWT) {
		req.layout = "main";
		next();
	} else {
		const { username, fname, category } = await verifyJWT(requestJWT);
		if (!username) {
			req.layout = "main";
			next();
		} else {
			req.layout = "loggedinLayout1";
			req.username = username;
			req.fname = category === "individual" ? fname.split(" ")[0] : fname;
			req.category = category;
			next();
		}
	}
}

module.exports = { authenticateUser };
