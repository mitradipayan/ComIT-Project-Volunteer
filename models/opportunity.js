const mongoose = require("../db");
const cuid = require("cuid");

const timeCommitmentType = ["all", "onetime", "shortterm", "longterm"];
const activityType = [
	"systemssupport",
	"accounting",
	"legal",
	"orgleadership",
	"research",
];
const volunteerCauseType = [
	"emergency",
	"caregiving",
	"swacchbharat",
	"animalcare",
	"teaching",
];

const states = ["Karnataka", "Maharashtra", "Jharkhand"];
const cities = ["Bangalore", "Mumbai", "Jamshedpur", "Pune"];

const opportunitySchema = mongoose.Schema({
	_id: { type: String, default: cuid },
	orgName: { type: String, required: true },
	orgLogoUrl: { type: String },
	title: { type: String, required: true },
	jobDescription: { type: String, required: true },
	volunteerRequired: { type: Number, required: true },
	timeCommitment: { type: String, required: true },
	timeCommitmentType: { type: String, enum: timeCommitmentType },
	timeDuration: { type: String, required: true },
	activityType: { type: String, enum: activityType },
	volunteerCause: { type: String, enum: volunteerCauseType },
	location: {
		state: { type: String, enum: states },
		city: { type: String, enum: cities },
	},
});

const Opportunity = mongoose.model("Opportunity", opportunitySchema);

module.exports = Opportunity;