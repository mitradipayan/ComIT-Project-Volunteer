const mongoose = require("mongoose");
const { CONNECTION_STRING } = require("./.env");

mongoose.connect(CONNECTION_STRING, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).catch((err) {
  console.log(err);
});

const db = mongoose.connection;
db.once("open", () => {
  console.log('MongoDB connection established')
})

module.exports = mongoose;