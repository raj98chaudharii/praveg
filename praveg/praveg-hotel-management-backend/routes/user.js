const express = require('express'); // Importing Express framework
const bcrypt = require('bcrypt'); // Importing bcrypt for password hashing
const { body, validationResult } = require('express-validator'); // Importing validation utilities
const User = require('../models/user'); // Importing User model
const Resort = require('../models/resort'); // Importing Resort model
const authMiddleware = require('../middlewares/authMiddleware'); // Importing authentication middleware

const router = express.Router(); // Creating an Express router instance

// Route to create a new user (Admin Only)
router.post(
  '/',
  authMiddleware, // Ensures only authenticated users can access this route
  [
    // Input validation rules
    body('phone_number').isString().notEmpty(), // Phone number must be a non-empty string
    body('password').isLength({ min: 6 }), // Password must be at least 6 characters long
    body('role').isIn(['admin', 'cg_manager', 'operation_team']), // Role must be one of the allowed values
    body('resort_id').optional().isUUID(), // Resort ID is optional but must be a valid UUID if provided
  ],
  async (req, res) => {
    // Ensure only an admin can create users
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { phone_number, password, role, resort_id } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password before saving

      // Creating a new user in the database
      const newUser = await User.create({ phone_number, password: hashedPassword, role, resort_id });

      res.json(newUser); // Responding with the created user data
    } catch (error) {
      res.status(500).json({ message: 'Error creating user' }); // Handling errors
    }
  }
);

// Route to get all users (Admin Only)
router.get('/', authMiddleware, async (req, res) => {
  // Ensure only an admin can access user list
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  // Fetching all users, including their associated resort details
  const users = await User.findAll({ include: { model: Resort, as: 'resort' } });
  res.json(users); // Responding with user list
});

// Route to update a user (Admin Only)
router.put('/:id', authMiddleware, async (req, res) => {
  // Ensure only an admin can update users
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  try {
    const { role, resort_id } = req.body;

    // Updating user details in the database
    await User.update({ role, resort_id }, { where: { id: req.params.id } });

    res.json({ message: 'User updated successfully' }); // Responding with success message
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' }); // Handling errors
  }
});

// Route to delete a user (Admin Only)
router.delete('/:id', authMiddleware, async (req, res) => {
  // Ensure only an admin can delete users
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  try {
    // Deleting user from the database
    await User.destroy({ where: { id: req.params.id } });

    res.json({ message: 'User deleted' }); // Responding with success message
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' }); // Handling errors
  }
});

module.exports = router; // Exporting the router for use in other parts of the application
