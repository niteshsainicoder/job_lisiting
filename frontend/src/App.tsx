import React, { useEffect, useState } from 'react';
import { MapPin, Clock, Briefcase, DollarSign, ExternalLink, Search } from 'lucide-react';

interface Job {
  _id: string;
  jobId: string;
  title: string;
  company: string;
  location: string;
  jobLink: string;
  seniorityLevel: string;
  employmentType: string;
  source: string;
  experience: string;
  companyUrl: string;
  companyImageUrl: string;
  postedDateTime: string;
  minExp: number;
  maxExp: number;
  country: string;
  companyType: string;
  description?: string;
}

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_URL}jobs`);
      const data = await response.json();
      setJobs(data);
      if (data.length > 0) {
        setSelectedJob(data[0]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const searchJob = async()=>{
    try{
    setIsLoading(true);
    const response = await fetch(`${import.meta.env.VITE_URL}jobs/search?location=${searchTerm}`);
    const data = await response.json();
    setJobs(data);

    if (data.length > 0) {
      setSelectedJob(data[0]);
    }
  } catch (error) {
    console.error('Error fetching jobs:', error);
  } finally {
    setIsLoading(false);
  }
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(()=>{
if (searchTerm?.length > 0) {
 const timer = setTimeout(() => {
    searchJob();
  }, 1000);
  return () => clearTimeout(timer) 
}else{
  fetchJobs();
}
  },[searchTerm])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading jobs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Job Listings</h1>
        
        <div className="mb-6 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by company name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {jobs?.length === 0 ? (
              <div className="text-center py-8 text-gray-600">No jobs found</div>
            ) : (
              jobs?.map((job) => (
                <div
                  key={job._id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedJob?._id === job._id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-purple-200'
                  }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
                      <p className="text-gray-600">{job.company}</p>
                    </div>
                    <a 
                      href={job.jobLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    >
                      Apply Now
                    </a>
                  </div>
                  
                  <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase size={16} />
                      {job.experience}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {selectedJob && (
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                  <p className="text-gray-600">{selectedJob.company} - {selectedJob.location}</p>
                </div>
                <a 
                  href={selectedJob.jobLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  Apply Now
                  <ExternalLink size={16} />
                </a>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Briefcase size={16} />
                    {selectedJob.employmentType}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    {formatDate(selectedJob.postedDateTime)}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign size={16} />
                    Experience: {selectedJob.experience}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Job Details</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-medium">Seniority Level:</span> {selectedJob.seniorityLevel}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Employment Type:</span> {selectedJob.employmentType}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Experience Required:</span> {selectedJob.minExp}-{selectedJob.maxExp} years
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Company Type:</span> {selectedJob.companyType}
                    </p>
                  </div>
                </div>

                {selectedJob.description && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Job Description</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedJob.description}</p>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">About Company</h3>
                  <a 
                    href={selectedJob.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 flex items-center gap-2"
                  >
                    Visit Company Website
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;