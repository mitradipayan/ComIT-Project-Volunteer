const bcrypt = require("bcrypt");
const User = require("../models/user");

const SALT_ROUNDS = 10;

async function createUser(fields) {
	const nusr = await new User({
		...fields,
		password: await bcrypt.hash(fields.password, SALT_ROUNDS),
	}).save();
}

const cust1 = {
	name: "dipayan",
	username: "d@d.com",
	password: "password",
	country: "India",
	city: "Bangalore",
	category: "individual",
};

createUser(cust1);

// module.exports = {
// 	createUser,
// 	cust1,
// };
