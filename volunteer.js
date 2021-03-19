const express = require("express");
const expressHandlebars = require("express-handlebars");
const path = require('path')

const port = process.env.PORT || 3002;

const app = express();

app.engine(
	"handlebars",
	expressHandlebars({
		defaultLayout: "main",
	})
);
app.set("view engine", "handlebars");

// Middleware
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.get('/', (req, res) => {
	res.render('home')
})


app.listen(port, () => {
	console.log(`Server started, Express listening on port ${port}`);
});
