const Opportunity = require("../models/opportunity");
const { getAllOpportunities } = require("../services/opportunityServices");

async function renderOpportunity(req, res, next) {
	// const opplist = await getAllOpportunities();
	// res.render("opportunities", { layout: "layout1", opplist: opplist });
	res.render("opportunities", { layout: "loggedinLayout1"});
	// try {
	//   const availableOpportunities = await
	// } catch (error) {
	//   next(error)
	// }
}

module.exports = { renderOpportunity };
