const mongoose = require("./db");
const State = require("./models/states");
const statesofIndia = require("./statesofIndia.json");

(async function () {
	for (state of statesofIndia) {
		await new State(state).save();
	}
	mongoose.disconnect();
});

// ----------------------------------
// Insert new values to the DB
updateStateOfIndia = [{ stateCode: {{newValue}}, stateName: {{newValue}} }];

const updateState = async function () {
	await State.insertMany(updateStateOfIndia);
	mongoose.disconnect();
};

// updateState();
// -------------------------------------