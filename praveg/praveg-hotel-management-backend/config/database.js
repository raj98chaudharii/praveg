require('dotenv').config(); // Load environment variables from .env file
const { Sequelize } = require('sequelize');

// Create a new Sequelize instance with database credentials from .env
const sequelize = new Sequelize(
  process.env.DB_NAME,       // Database name
  process.env.DB_USER,       // Database username
  process.env.DB_PASSWORD,   // Database password
  {
    host: process.env.DB_HOST, // Database host (e.g., localhost)
    dialect: 'postgres',       // Database type (PostgreSQL)
    port: process.env.DB_PORT, // Database port (default: 5432)
    logging: false,            // Disable SQL query logging
  }
);

module.exports = sequelize; // Export the Sequelize instance for use in other files
