"use client"
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Users, Briefcase, Filter, X, Loader, Upload, Loader2 } from 'lucide-react';
 
interface Job {    
  jobId: string;
  jobProfile: string;
  jobRole: string;
  description: string;
  experience: string;
  shift: string;
  department: string;
  employmentType: string;
  isActive: string;
  expectedSalary: string;
  postedDate: string;
  keyword: string[];
  rolesAndResponsibility: string[];
  vacancy: string;
  company?: string;
}

const WTLCareerPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  // API base URL
  const API_BASE_URL = 'https://api.webutsav.com/job';

  // Fetch WTL jobs from API with fallback when 404
  const fetchWTLJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try company-specific endpoint first
      const companyRes = await fetch(`${API_BASE_URL}/getByCompany/WTL`);

      if (companyRes.ok) {
        const jobsData: Job[] = await companyRes.json();
        setJobs(jobsData);
        return;
      }

      // If 404 or not ok, fallback to all jobs and filter client-side
      if (!companyRes.ok) {
        const allRes = await fetch(`${API_BASE_URL}/getAllJob`);
        if (!allRes.ok) {
          throw new Error(`HTTP error! status: ${allRes.status}`);
        }
        const allJobs: Job[] = await allRes.json();
        const wtlJobs = allJobs.filter(j => (j.company || '').toLowerCase() === 'wtl');
        setJobs(wtlJobs);
      }
    } catch (error) {
      console.error('Error fetching WTL jobs:', error);
      setError('Failed to load jobs. Please try again later.');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWTLJobs();
  }, []);

  // Filter jobs based on search
  const filteredJobs = jobs.filter((job: Job) => {
    const matchesSearch = searchTerm === '' ||
      (job.jobProfile && job.jobProfile.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.jobRole && job.jobRole.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.department && job.department.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  const handleApplyNow = (job: Job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const closeApplicationModal = () => {
    setShowApplicationModal(false);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-purple-600"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/30 via-transparent to-purple-600/20"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-white font-bold text-5xl md:text-6xl leading-tight mb-6">
            Careers at <span className="bg-gradient-to-r from-pink-200 to-purple-100 bg-clip-text text-transparent">WTL</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Join our mission to connect the world through innovative travel solutions.
          </p>
        </div>
      </section>

      {/* Job Search Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Open Positions at WTL
            </h2>
            <p className="text-xl text-gray-600">
              Find your next opportunity and join our growing team
            </p>
          </div>

          {/* Search */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search jobs, skills, or keywords..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600">{error}</p>
              <button 
                onClick={fetchWTLJobs}
                className="mt-2 text-red-600 hover:text-red-700 underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader className="animate-spin text-purple-600" size={48} />
              <span className="ml-3 text-gray-600">Loading jobs...</span>
            </div>
          ) : (
            /* Job Listings */
            <div className="space-y-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job: Job, index: number) => (
                  <div
                    key={job.jobId}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                          <h3 className="text-xl font-bold text-gray-900">{job.jobProfile}</h3>
                          <div className="flex flex-wrap gap-2">
                            {job.department && (
                              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                                {job.department}
                              </span>
                            )}
                            {job.employmentType && (
                              <span className="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full">
                                {job.employmentType}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                          {job.experience && (
                            <div className="flex items-center gap-1">
                              <Briefcase size={16} />
                              <span>{job.experience} Yrs</span>
                            </div>
                          )}
                          {job.postedDate && (
                            <div className="flex items-center gap-1">
                              <Clock size={16} />
                              <span>{job.postedDate}</span>
                            </div>
                          )}
                        </div>

                        {job.keyword && job.keyword.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.keyword.map((skill: string, skillIndex: number) => (
                              <span
                                key={skillIndex}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
                        <button
                          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                          onClick={() => handleApplyNow(job)}
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search size={48} className="mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No jobs found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Application Modal */}
      {showApplicationModal && selectedJob && (
        <JobApplicationModal
          job={selectedJob}
          onClose={closeApplicationModal}
        />
      )}
    </div>
  );
};

// Job Application Modal Component
const JobApplicationModal = ({ job, onClose }: { job: Job; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    resume: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF or Word document');
        return;
      }

      if (file.size > maxSize) {
        alert('File size should be less than 5MB');
        return;
      }

      setFormData(prev => ({
        ...prev,
        resume: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.experience) {
        alert('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address');
        setIsSubmitting(false);
        return;
      }

      const applicationData = new FormData();
      applicationData.append('fullName', formData.fullName);
      applicationData.append('email', formData.email);
      applicationData.append('phone', formData.phone);
      applicationData.append('jobRole', job.jobRole || job.jobProfile || '');
      applicationData.append('department', job.department || '');
      applicationData.append('experience', formData.experience);

      if (formData.resume) {
        applicationData.append('resume', formData.resume);
      }

      const response = await fetch("http://localhost:8282/employees/apply", {
        method: 'POST',
        body: applicationData,
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        onClose();
      } else {
        throw new Error('Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Apply for Position</h2>
            <p className="text-gray-600">{job.jobProfile || job.jobRole} - {job.department}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience *
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select experience</option>
                <option value="0-1 years">0-1 years</option>
                <option value="1-2 years">1-2 years</option>
                <option value="2-3 years">2-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5-7 years">5-7 years</option>
                <option value="7-10 years">7-10 years</option>
                <option value="10+ years">10+ years</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resume/CV *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
                id="resume-upload"
                required
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                <Upload className="text-gray-400 mb-2" size={24} />
                <span className="text-sm text-gray-600">
                  {formData.resume ? formData.resume.name : 'Click to upload resume (PDF, DOC, DOCX - Max 5MB)'}
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WTLCareerPage;
