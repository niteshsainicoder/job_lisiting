import {Job} from '../models/job.models.js';

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().limit(100);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
};


const searchJobsByLocation = async (req, res) => {
  const location = req.query.location;

  if (!location) {
    return res.status(400).json({ message: 'Location is required' });
  }

  try {
    const jobs = await Job.find({ location: { $regex: location, $options: 'i' } }).limit(100);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs by location', error });
  }
};

export  {
  getAllJobs,
  searchJobsByLocation,
};
