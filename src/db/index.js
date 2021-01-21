const { Sequelize, DataTypes } = require("sequelize");
const User = require("./user");
const Category = require("./category");
const Article = require("./article");
const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: "postgres",
  }
);

const models = {
  User: User(sequelize, DataTypes),
  Category: Category(sequelize, DataTypes),
  Article: Article(sequelize, DataTypes),
};

Object.keys(models).forEach((model_name) => {
  if ("associate" in models[model_name]) {
    models[model_name].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

sequelize
  .authenticate()
  .then(() => console.log("Connection established"))
  .catch((e) => console.log("Connection failed", e));

module.exports = models;
