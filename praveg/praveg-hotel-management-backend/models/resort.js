// Import required modules
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import the Sequelize instance

// Define the Resort model
const Resort = sequelize.define('Resort', {
  id: {
    type: DataTypes.UUID,          // Use UUID as the primary key
    defaultValue: DataTypes.UUIDV4, // Automatically generate a unique UUID
    primaryKey: true,              // Set as primary key
  },
  name: {
    type: DataTypes.STRING,        // Store resort name as a string
    allowNull: false,              // Resort name is required
  },
  location: {
    type: DataTypes.STRING,        // Store resort location as a string
    allowNull: false,              // Location is required
  },
}, {
  timestamps: true,                 // Automatically manage createdAt and updatedAt fields
});

module.exports = Resort; // Export the Resort model for use in other files
