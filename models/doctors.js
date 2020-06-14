'use strict';
module.exports = (sequelize, DataTypes) => {
  const doctors = sequelize.define('doctors', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE

  }, {});
  doctors.associate = function(models) {
    // associations can be defined here
  };
  return doctors;
};