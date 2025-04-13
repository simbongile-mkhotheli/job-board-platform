const Job = require('../models/job');



// Create a new job posting
const createJob = async (req, res) => {
  try {
    const { title, description, location, salary } = req.body;

    // Only employers should create jobs. You can add further checks on req.user.role if desired.
    const job = await Job.create({
      title,
      description,
      location,
      salary,
      employer: req.user._id,
    });

    res.status(201).json({
      message: 'Job created successfully',
      job,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all job postings
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('employer', 'name email');
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single job posting by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('employer', 'name email');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createJob, getJobs, getJobById };


// Update a job posting
const updateJob = async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      if (!job) return res.status(404).json({ message: 'Job not found' });
  
      // Ensure only the owner (employer) can update the job
      if (job.employer.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to update this job' });
      }
  
      const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({
        message: 'Job updated successfully',
        job: updatedJob,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Delete a job posting
  const deleteJob = async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      if (!job) return res.status(404).json({ message: 'Job not found' });
  
      // Ensure only the owner (employer) can delete the job
      if (job.employer.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to delete this job' });
      }
  
      await job.remove();
      res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = { createJob, getJobs, getJobById, updateJob, deleteJob };
  