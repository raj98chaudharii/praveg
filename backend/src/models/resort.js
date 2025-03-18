"use strict";
module.exports = (sequelize, DataTypes) => {
  const Resort = sequelize.define(
    "Resort",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {}
  );

  Resort.associate = function (models) {
    // Define associations here if needed (e.g., Resort hasMany Rooms)
  };

  return Resort;
};
