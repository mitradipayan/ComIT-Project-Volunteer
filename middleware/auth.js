const { verifyJWT } = require("../services/authenticationServices");

async function authenticateUser(req, res, next) {
	const requestJWT = req.cookies.jwToken;
	console.log(`CookieJWT--->: ${requestJWT}`);
	if (!requestJWT) {
		console.log(`No JWT`);
		req.layout = "main";
		next();
	} else {
		// const { username, fname, category } = await verifyJWT(requestJWT);
		const object = await verifyJWT(requestJWT);
		console.log(`Middleware: ${object.username}`);
		const username = object.username;
		const fname = object.fname;
		const category = object.category;
		if (!username) {
			console.log(`No username`);
			req.layout = "main";
			next();
		} else {
			console.log(`Logged successfully`);
			req.layout = "loggedinLayout1";
			req.username = username;
			req.fname = fname;
			req.category = category;
			next();
		}
	}
}

module.exports = { authenticateUser };
