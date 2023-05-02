const functions = require("@google-cloud/functions-framework");
const nodejs_rust = require("nodejs-rust");
// Register an HTTP function with the Functions Framework that will be executed
// when you make an HTTP request to the deployed function's endpoint.
functions.http("run-function", (req, res) => {
	console.log("Hello, world!");
	const { a, b } = req.query;
	res.send(`SUM: ${nodejs_rust.sum(a, b)}`);
});
