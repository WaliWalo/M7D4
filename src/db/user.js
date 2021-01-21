module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  User.associate = (models) => {
    User.belongsToMany(models.Article, {
      through: "user_article",
      timestamps: false,
    });
    User.belongsToMany(models.Article, {
      through: { model: models.Review, unique: false },
    });
    User.hasMany(models.Review);
  };
  return User;
};
