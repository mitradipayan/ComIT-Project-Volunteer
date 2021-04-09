const { findOne } = require("../models/opportunity");
const Opportunity = require("../models/opportunity");
const { getAllOpportunities } = require("../services/opportunityServices");
// const opportunities = require("../opportunities.json");
const { findUser } = require("../services/userServices");

async function renderOpportunity(req, res, next) {
	const opportunityList = await getAllOpportunities();
	const user = await findUser(req.username).then((res) => {
		return res;
	});
	if (req.username && opportunityList) {
		res.render("opportunities", {
			layout: "loggedinLayout1",
			loginstatus:
				req.category === "individual"
					? `Welcome ${req.fname}`
					: `Welcome ${user.name}`,
			tag: `${req.fname}`,
			opportunity: {...opportunityList},
		});
	}
	next();
}

async function renderCreateOpportunity(req, res, next) {
	const user = await findUser(req.username).then((res) => {
		return res;
	});
	if (!req.username) {
		res.status(404);
		next();
	}
	if (req.category === "organization") {
		res.render("createOpportunity", {
			layout: req.layout,
			loginstatus:
				req.category === "organization"
					? `Welcome to ${user.name}`
					: `Welcome ${req.fname}`,
			tag:
				req.category === "organization"
					? `${user.name}`
					: `${req.fname}`,
			idImgUrl: user.idImgUrl,
		});
	}
}

module.exports = { renderOpportunity, renderCreateOpportunity };
