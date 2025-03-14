import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useAppContext } from "../JobContext";
import JobCard from "./Job_card";
import "./css/JobList.css";
import { use } from "react";

function JobList() {
  const {  textColor,userId,api } = useAppContext(); // URL and text color from context
  const [allJobs, setAllJobs] = useState([]); // All jobs fetched from server
  const [filteredJobs, setFilteredJobs] = useState([]); // Jobs after search filter
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [jobsPerPage] = useState(10); // Number of jobs per page
  const navigate = useNavigate();
  const url = `https://server.octaview.tech/api/jobs/ext/`
  
  
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${url}${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${api}`,  // Pass the API key here
            'Content-Type': 'application/json', // Adjust based on your API requirements
          },
        });
  
        const data = await res.json();
        
        setAllJobs(data.jobs || data.results); // Server returns jobs or results array
        setFilteredJobs(data.jobs || data.results); // Initialize with all jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [url, userId, api]);  // Ensure `api` is included as a dependency
  

  // Handle search input change
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
    filterJobs(query);
  };

  // Filter jobs based on the search query
  const filterJobs = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = allJobs.filter(
      (job) =>
        job.job_title.toLowerCase().includes(lowerCaseQuery) ||
        job.job_role.toLowerCase().includes(lowerCaseQuery) ||
        job.location.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredJobs(filtered);
  };

  // Get jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(filteredJobs.length / jobsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="job-list-container" style={{ color: textColor }}>
      {/* Search Section */}
      <div className="search-section">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search for jobs by title, role, or location..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ color: textColor, borderColor: textColor }}
        />
      </div>

      {/* Job List or Loading */}
      {loading ? (
        <div>Loading jobs...</div>
      ) : (
        <div className="job-grid">
          {currentJobs.length > 0 ? (
            currentJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() =>
                  navigate(`/details/${job.id}`, { state: { job } })
                }
                textColor={textColor}
              />
            ))
          ) : (
            <div>No jobs found</div>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            color: textColor,
            borderColor: textColor,
          }}
        >
          Previous
        </button>
        <span style={{ color: textColor }}>
          Page {currentPage} of {Math.ceil(filteredJobs.length / jobsPerPage)}
        </span>
        <button
          className="pagination-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredJobs.length / jobsPerPage)}
          style={{
            color: textColor,
            borderColor: textColor,
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default JobList;
