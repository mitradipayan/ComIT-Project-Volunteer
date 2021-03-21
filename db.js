const mongoose = require("mongoose");

mongoose
	.connect(
		"mongodb+srv://dmitra:apples61@cluster0.0klej.mongodb.net/volunteer?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.catch((err) => console.log(err));

const db = mongoose.connection;
db.once("open", () => {
	console.log("MongoDB connection established");
});

module.exports = mongoose;
