const bcrypt = require("bcrypt");
const { ConnectionStates } = require("mongoose");
const User = require("../models/user");

// finds user based on username and password submitted
// by the user in login page
async function findUser(username) {
	const user = await User.findOne({ username }).exec();
	if (!user) {
		return false;
	} else return user;
}

async function matchPassword(username, password) {
	const foundUser = await findUser(username);
	if (!foundUser) return "UserNotFound";
	else {
		const isAUthenticated = await bcrypt
			.compare(password, foundUser.passwordHash)
			.then((result) => {
				console.log(result);
				return result;
			});
		if (isAUthenticated) {
			return true;
		} else return false;
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

	// generateHash(fields.password)
	// 	.then((data) => {
	// 		console.log(data);
	// 		new User({
	// 			...fields,
	// 			passwordHash: data,
	// 		}).save();
	// 	})
	// 	.catch((error) => console.log(`geterated hash error ${error}`));
}

module.exports = {
	createUser,
	findUser,
	matchPassword,
	generateHash,
};
