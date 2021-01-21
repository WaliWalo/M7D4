const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");
const articlesRouter = require("./services/articles");
const userRouter = require("./services/users");
const categoryRouter = require("./services/categories");
const reviewRouter = require("./services/reviews");
const server = express();

server.use(cors());
server.use(express.json());
server.use("/articles", articlesRouter);
server.use("/users", userRouter);
server.use("/categories", categoryRouter);
server.use("/reviews", reviewRouter);

db.sequelize.sync({ force: false }).then(() => {
  server.listen(process.env.PORT || 3001, () => {
    console.log(`listening on port ${process.env.PORT}`);
  });
});
