const bcrypt = require("bcrypt");
const { isCuid } = require("cuid");
const { ConnectionStates } = require("mongoose");
const User = require("../models/user");
const { generateJWT } = require("./authenticationServices");

// Returns user object based on username and password
// submitted in login page
async function findUser(username) {
	const user = await User.findOne({ username }).exec();
	if (!user) {
		return false;
	} else {
		return user;
	}
}

// Finds the username and validates the password and returns
// either "UserNotFound" or or "true" or "false"
async function matchPassword(username, password) {
	const foundUser = await findUser(username);
	if (!foundUser) return "UserNotFound";
	else {
		const isAuthenticated = await bcrypt
			.compare(password, foundUser.passwordHash)
			.then((result) => {
				return result;
			});
		if (isAuthenticated) {
			return "Authenticated";
		} else return false;
	}
}

// Validates username and password with dB and returns
// an object with {JWT and user}
async function validateLogin(username, password) {
	const authenticateValue = await matchPassword(username, password);
	if (authenticateValue === "UserNotFound" || !authenticateValue) {
		return {
			jwtString: null,
			user: null,
		};
	} else {
		// if (authenticateValue === "Authenticated") {
		const user = await findUser(username);
		const token = generateJWT(user);
		return {
			jwtString: token,
			user: user,
		};
	}
}

// Generates hash of a string and returns a string
async function generateHash(stringToHash) {
	const SALT_ROUNDS = 10;

	const hash = await bcrypt
		.genSalt(SALT_ROUNDS)
		.then((salt) => {
			return bcrypt.hash(stringToHash, salt);
		})
		.then((hashResult) => {
			return hashResult;
		});
	return hash;
}

// creates a user and saves in the database
async function createUser(fields) {
	const foundUser = await findUser(fields.username);
	if (foundUser) {
		return { tag: "UserExists", output: foundUser };
	} else if (!(fields.password === fields.cnfpassword)) {
		return { tag: "PasswordMismatch", output: null };
	} else {
		let generatedHash = await generateHash(fields.password);
		if (generatedHash) {
			const newUser = await new User({
				...fields,
				passwordHash: generatedHash,
			});
			newUser.save();
			return { tag: "UserCreated", output: newUser };
		}
	}
}

module.exports = {
	createUser,
	findUser,
	matchPassword,
	generateHash,
	validateLogin,
};
