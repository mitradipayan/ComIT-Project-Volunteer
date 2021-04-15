const mongoose = require("../db");
const cuid = require("cuid");

const activitySchema = mongoose.Schema({
	_id: { type: String, default: cuid },
	activityType: { type: String, required: true },
});
