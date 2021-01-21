module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define("article", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    head_line: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub_head: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  });
  Article.associate = (models) => {
    Article.belongsTo(models.Category);
    Article.belongsToMany(models.User, {
      through: "user_article",
      timestamps: false,
    });
  };
  return Article;
};
