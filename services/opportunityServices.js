const { findOne } = require("../models/opportunity");
const Opportunity = require("../models/opportunity");
const { pushOpp } = require("../opp-push");

async function findOpportunity(title) {
	const opportunity = await Opportunity.findOne({ title }).exec();
	if (!opportunity) {
		return false;
	} else {
		console.log(
			`Opportunity from findOpportunity function --> ${opportunity}`
		);
		return opportunity;
	}
}

async function createOpportunity(fields) {
	// const foundOpp = await findOpportunity(fields.title);
	// if (foundOpp) {
	// 	return {
	// 		tag: "Opportunity with same title exists, Opportunity not created",
	// 		output: null,
	// 	};
	// } else {
	const newOpp = await new Opportunity(fields);
	newOpp.save();
	console.log(newOpp);
	// 		return { tag: "New Opportunity successfully created", output: newOpp };
	// 	}
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
