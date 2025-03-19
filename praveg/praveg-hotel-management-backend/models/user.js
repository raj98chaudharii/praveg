const { DataTypes } = require('sequelize'); // Importing Sequelize DataTypes for defining model attributes
const sequelize = require('../config/database'); // Importing Sequelize database connection
const Resort = require('./resort'); // Importing the Resort model for establishing relationships

// Defining the User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID, // Unique identifier for each user
    defaultValue: DataTypes.UUIDV4, // Automatically generate a UUID if not provided
    primaryKey: true, // Setting it as the primary key
  },
  phone_number: {
    type: DataTypes.STRING, // Storing the user's phone number
    allowNull: false, // Phone number is required
    unique: true, // Ensures phone numbers are unique
  },
  password: {
    type: DataTypes.STRING, // Storing the hashed password
    allowNull: false, // Password is required
  },
  role: {
    type: DataTypes.ENUM('admin', 'cg_manager', 'operation_team'), // User roles
    allowNull: false, // Role is required
  },
  is_active: {
    type: DataTypes.BOOLEAN, // Indicates whether the user is active
    defaultValue: true, // By default, the user is active
  },
  resort_id: {
    type: DataTypes.UUID, // Foreign key linking user to a specific resort
    allowNull: true, // Not all users are assigned to a resort (e.g., Admins)
    references: {
      model: Resort, // References the Resort model
      key: 'id', // Links to the 'id' field in the Resort table
    },
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt timestamps
});

// Establishing a relationship: A User belongs to a Resort
User.belongsTo(Resort, { foreignKey: 'resort_id', as: 'resort' });

module.exports = User; // Exporting the User model
