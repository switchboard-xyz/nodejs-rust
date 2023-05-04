const nodejs_rust = require("nodejs-rust");
const express = require("express");
const app = express();
const port = 8080;
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();
app.get("/sum", (req, res) => {
  const { a, b } = req.query;
  const result = nodejs_rust.sum(Number(a), Number(b));

  res.json({ result });
});
app.get("/get-repos", async (req, res) => {
  const { org } = req.query;
  const key = fs.readFileSync(process.env.SECRET_KEY_PATH, "utf8");
  const result = await nodejs_rust.callSecretApi(key, org);
  res.json({ result });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
