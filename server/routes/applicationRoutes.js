const express = require('express');
const router = express.Router();
const { applyForJob, getApplicationsForJob } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

// Job seekers apply for a job (protected)
router.post('/', protect, applyForJob);

// Employers get applications for a specific job (protected)
router.get('/:jobId', protect, getApplicationsForJob);

module.exports = router;
