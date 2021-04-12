const { findOne, rawListeners } = require("../models/opportunity");
const Opportunity = require("../models/opportunity");
const State = require("../models/states");
const {
	getAllOpportunities,
	getstatesOfIndia,
	createOpportunity,
	getFilteredOpportunities,
} = require("../services/opportunityServices");
const { findUser } = require("../services/userServices");

async function renderOpportunity(req, res, next) {
	const opportunityList = await getAllOpportunities();
	const statesOfIndia = await getstatesOfIndia();

	if (req.username && opportunityList) {
		const user = await findUser(req.username);
		res.render("opportunities", {
			layout: "loggedinLayout1",
			loginstatus: `Welcome ${req.fname}`,
			tag: `${req.fname}`,
			opportunityList: opportunityList,
			statesOfIndia: statesOfIndia,
		});
	}
	next();
}

async function renderCreateOpportunity(req, res, next) {
	if (!req.username) {
		res.status(404);
		next();
	} else {
		const user = await findUser(req.username);
		const statesOfIndia = await getstatesOfIndia();
		if (req.category === "organization") {
			res.render("createOpportunity", {
				layout: req.layout,
				loginstatus: `Welcome to ${user.name}`,
				tag: `${user.name}`,
				idImgUrl: user.idImgUrl,
				statesOfIndia: statesOfIndia,
			});
		} else {
			res.render("home", {
				layout: req.layout,
				loginstatus: `Welcome ${req.fname}`,
				tag: `${req.fname}`,
				usermessage: `Individuals cannot create opportunities`,
			});
		}
	}
}

async function saveOpportunity(req, res, next) {
	const user = await findUser(req.username);
	const createOpportunityOutput = await createOpportunity(req.body, user);
	if (createOpportunityOutput.tag === "success") {
		registerMessage = `New Opportunity successfully created for ${req.fname}`;
	}
	res.render("createOpportunity", {
		layout: "loggedinLayout1",
		registerMessage,
	});
}

// Gets form data on filtering criteria and sends it to renderOpportunity
async function processFilterOpportunity(req, res, next) {
	const {
		volunteerCause,
		activityType,
		timeCommitmentType,
		locationState,
		locationCity,
	} = req.body;

	const filters = {
		volunteerCause: volunteerCause,
		activityType: activityType,
		timeCommitmentType: timeCommitmentType,
		locationState: locationState,
		locationCity: locationCity,
	};

	const filteredOpportunities = await getFilteredOpportunities(filters);

	res.render("opportunities", {
		layout: "loggedinLayout1",
		loginstatus: `Welcome ${req.fname}`,
		tag: `${req.fname}`,
		opportunityList: filteredOpportunities,
	});
}

module.exports = {
	renderOpportunity,
	renderCreateOpportunity,
	saveOpportunity,
	processFilterOpportunity,
};
