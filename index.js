const functions = require("@google-cloud/functions-framework");
const nodejs_rust = require("nodejs-rust");
// Register an HTTP function with the Functions Framework that will be executed
// when you make an HTTP request to the deployed function's endpoint.
console.log("starting functions...");
functions.http("run-function", (req, res) => {
  console.log("Hello, world!");
  const { a, b } = req.query;
  res.send(`SUM: ${nodejs_rust.sum(a, b)}`);
});

functions.http("call-secret-api", (req, res) => {
  const { org } = req.query;
  const key = "secret-key"; // add secret logic here
  const result = nodejs_rust.callSecretApi(key, org);

  res.send(`Result: ${result}`);
});
