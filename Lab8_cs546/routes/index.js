const roots = require("./roots");
const path = require("path");

const constructorMethod = app => {
  app.use("/", roots);
  app.get("/", (req, res) => {
    res.sendFile(path.resolve("static/about.html"));});
  app.use("*", (req, res) => {
    res.status(404).json({error: "not found"});});};

module.exports = constructorMethod;
