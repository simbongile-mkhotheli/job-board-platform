
const express = require('express');
const router = express.Router();
const { createJob, getJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

// Create a job posting (protected)
router.post('/', protect, createJob);

// Get all job postings (public)
router.get('/', getJobs);

// Get a specific job posting by ID (public)
router.get('/:id', getJobById);

// Update a job posting (protected)
router.put('/:id', protect, updateJob);

// Delete a job posting (protected)
router.delete('/:id', protect, deleteJob);

module.exports = router;
