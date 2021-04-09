const { verifyJWT } = require("../services/authenticationServices");

async function authenticateUser(req, res, next) {
	const requestJWT = req.cookies.jwToken;
	console.log(`CookieJWT--->: ${requestJWT}`);
	if (!requestJWT) {
		console.log(`No JWT`);
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
			req.fname = fname.split(" ")[0];
			req.category = category;
			next();
		}
	}
}

module.exports = { authenticateUser };
