const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path');

const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

dotenv.config();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.resolve(__dirname, "client", "build")));
	app.get('/', (_,res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Start the API server
app.listen(PORT, function() {
	console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
