const Opportunity = require("../models/opportunity");
const opplist = require("../opportunities.json");

async function createOpportunity(fields) {
	await new Opportunity({ ...fields }).save();
}

async function getAllOpportunities() {
	const allAvailableOpportunities = await Opportunity.find().exec();
	console.log(allAvailableOpportunities);
	return allAvailableOpportunities;
}

module.exports = {
	createOpportunity,
	getAllOpportunities,
};
