import express from "express"
import {getAllJobs,searchJobsByLocation}  from "../controllers/job.controller.js"
 const router = express.Router();

// Route to fetch all job data
router.get('/jobs', getAllJobs);

// Route to filter jobs by location
router.get('/jobs/search', searchJobsByLocation);

export {router}
