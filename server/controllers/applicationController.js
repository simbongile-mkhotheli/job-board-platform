const Application = require('../models/Application');

// Apply for a job
const applyForJob = async (req, res) => {
  try {
    const { job, resume, coverLetter } = req.body;

    // Create a new application using the logged-in user's id
    const application = await Application.create({
      job,
      applicant: req.user._id,
      resume,
      coverLetter,
    });

    res.status(201).json({
      message: 'Application submitted successfully',
      application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all applications for a specific job (only accessible by the employer who posted the job)
const getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ job: jobId }).populate('applicant', 'name email');
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { applyForJob, getApplicationsForJob };
