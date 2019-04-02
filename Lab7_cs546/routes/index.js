const aniRoutes = require("./animals");
const postRoutes = require("./posts");
const likeRoutes=require("./likes");

const constructorMethod = app => {
  app.use("/animals", aniRoutes);
  app.use("/posts", postRoutes);
  app.use("/likes",likeRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
