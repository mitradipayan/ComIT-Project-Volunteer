const mongoose = require("./db");
const opplist = require("./opportunities.json");
const Opportunity = require("./models/opportunity");

// push opportunity array to mongodb
const pushOpp = async function () {
	for (opp of opplist) {
		await new Opportunity(opp).save();
	}

	mongoose.disconnect();
};

pushOpp();
