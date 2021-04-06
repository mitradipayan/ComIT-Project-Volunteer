const jwt = require("jsonwebtoken");
// const { findUser, matchPassword } = require("./userServices");

// Generate JWT token randomly by running node in terminal and
// require('crypto').randomBytes(64).toString('hex') and store it in .env
const jwtSecret = process.env.JWT_SECRET;

const jwtOptions = { algorithm: "HS256", expiresIn: "1d" };

// Generates JWT and returns a jwt string
function generateJWT(user) {
	console.log(user);
	const payload = {
		username: user.username,
		fname: user.name,
		category: user.category,
	};
	const accessToken = jwt.sign(payload, jwtSecret, jwtOptions);
	return accessToken;
}

// Verify JWT and returns a promise of the payload
async function verifyJWT(token) {
	return ({ username, fname, category } = jwt.verify(
		token,
		jwtSecret,
		(err, payload) => {
			if (err) {
				return "jwtVerificationError";
			} else {
				return { payload };
			}
		}
	));
}

module.exports = { generateJWT, verifyJWT };
