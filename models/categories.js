const Categories = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
    table: 'Categories',
  });
  return category;
};

module.exports = Categories; 