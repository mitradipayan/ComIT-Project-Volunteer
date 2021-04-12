const mongoose = require("../db");
const cuid = require("cuid");

// create a schema
const stateSchema = mongoose.Schema({
	_id: { type: String, default: cuid },
	stateCode: { type: String, required: true, unique: true },
	stateName: { type: String, required: true, unique: true },
});

// connect the schema to a Model
const State = mongoose.model("State", stateSchema);

// export the model
module.exports = State;
