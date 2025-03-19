const express = require('express'); // Importing Express framework
const { body, validationResult } = require('express-validator'); // Importing validation utilities
const Resort = require('../models/resort'); // Importing Resort model
const authMiddleware = require('../middlewares/authMiddleware'); // Importing authentication middleware

const router = express.Router(); // Creating an Express router instance

// Route to create a new resort (Admin Only)
router.post(
  '/',
  authMiddleware, // Ensures only authenticated users can access this route
  [
    // Input validation rules
    body('name').isString().notEmpty(), // Resort name must be a non-empty string
    body('location').isString().notEmpty(), // Location must be a non-empty string
  ],
  async (req, res) => {
    // Ensure only an admin can create resorts
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      // Creating a new resort in the database
      const newResort = await Resort.create(req.body);
      res.json(newResort); // Responding with the created resort data
    } catch (error) {
      res.status(500).json({ message: 'Error creating resort' }); // Handling errors
    }
  }
);

// Route to get all resorts (Accessible by authenticated users)
router.get('/', authMiddleware, async (req, res) => {
  try {
    // Fetching all resorts from the database
    const resorts = await Resort.findAll();
    res.json(resorts); // Responding with the list of resorts
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resorts' }); // Handling errors
  }
});

// Route to update a resort (Admin Only)
router.put('/:id', authMiddleware, async (req, res) => {
  // Ensure only an admin can update resorts
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  try {
    // Updating resort details in the database
    await Resort.update(req.body, { where: { id: req.params.id } });

    res.json({ message: 'Resort updated successfully' }); // Responding with success message
  } catch (error) {
    res.status(500).json({ message: 'Error updating resort' }); // Handling errors
  }
});

