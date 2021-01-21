module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("review", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Review.associate = (models) => {
    Review.belongsTo(models.User);
    Review.belongsTo(models.Article);
  };
  return Review;
};
