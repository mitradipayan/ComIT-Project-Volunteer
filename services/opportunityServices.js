const Opportunity = require("../models/opportunity");
const opplist = require("../opportunities.json");

async function createOpportunity(fields) {
	await new Opportunity({ ...fields }).save();
}

module.exports = {
	createOpportunity,
};
