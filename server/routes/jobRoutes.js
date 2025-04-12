const express = require('express');
const router = express.Router();
const { createJob, getJobs, getJobById } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

// Route to create a job posting (protected)
router.post('/', protect, createJob);

// Route to get all job postings (public)
router.get('/', getJobs);

// Route to get a specific job posting by ID (public)
router.get('/:id', getJobById);

module.exports = router;
