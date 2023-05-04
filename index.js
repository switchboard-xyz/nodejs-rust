const functions = require("@google-cloud/functions-framework");
const nodejs_rust = require("nodejs-rust");
// Register an HTTP function with the Functions Framework that will be executed
// when you make an HTTP request to the deployed function's endpoint.
console.log("starting functions...");

var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080);
console.log("server started");
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
