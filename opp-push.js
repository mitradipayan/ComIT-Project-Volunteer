const mongoose = require("./db");
const opplist = require("./opportunities.json");
const { createOpportunity } = require("./services/opportunityServices");

// push opportunity array to mongodb
async function pushOpp() {
	for (opp of opplist) {
		await createOpportunity(opp);
		console.log(opp);
	}
	mongoose.disconnect();
}

module.exports = { pushOpp };
