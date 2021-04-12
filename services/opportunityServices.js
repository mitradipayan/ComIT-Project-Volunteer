const Opportunity = require("../models/opportunity");
const { findUser } = require("./userServices");
const State = require("../models/states");

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

async function createOpportunity(fields, userObj) {
	const user = await findUser(userObj.username);
	const newOpp = new Opportunity({
		...fields,
		orgName: user.name,
		orgLogoUrl: user.idImgUrl,
	});
	newOpp.save();
	return { tag: "success", output: newOpp };
}

// Retrieves the list of all opportunities from MongoDB and returns an array
async function getAllOpportunities() {
	const allAvailableOpportunities = await Opportunity.find().setOptions({
		lean: true,
	});

	return allAvailableOpportunities;
}

// Retrieves the list of all states from MongoDB and returns an array
async function getstatesOfIndia() {
	const states = await State.find().setOptions({ lean: true }).exec();
	return states;
}

// ----------getAllOpportunities - FILTERED--------------------------
async function getFilteredOpportunities(filters) {
	const allAvailableOpportunities = await Opportunity.find().setOptions({
		lean: true,
	});

	let filteredOpportunities = allAvailableOpportunities;

	for (const filter in filters) {
		if (filters[filter]) {
			filteredOpportunities = filteredOpportunities.filter(
				(opportunity) => opportunity[filter] === filters[filter]
			);
		}
	}

	return filteredOpportunities;
}

module.exports = {
	createOpportunity,
	getAllOpportunities,
	getstatesOfIndia,
	getFilteredOpportunities,
};
