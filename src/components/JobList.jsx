import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import JobCard from './Job_card.jsx';
import "./css/JobList.css";

function JobList({ url, textColor }) {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); 
  const [jobsPerPage] = useState(2); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setJobs(data.jobs || data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [url]);

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(job =>
    job.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.job_role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current jobs based on pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Pagination controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <div className="job-list-container" style={{ color: textColor }}>
      {/* Search Section */}
      <div className="search-section">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search for jobs by title, role, or location..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ color: textColor, borderColor: textColor }}
          />
        </div>
      </div>

      {/* Job Cards Grid */}
      {loading ? (
        <div className="loading">Loading jobs...</div>
      ) : currentJobs.length === 0 ? (
        <div className="no-results">No jobs found matching your search.</div>
      ) : (
        <>
          <div className="job-grid">
            {currentJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() => navigate(`/details/${job.id}`)}
                textColor={textColor}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ color: textColor, borderColor: textColor }}
              >
                Previous
              </button>

              <div className="page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <button
                    key={number}
                    className={`page-number ${currentPage === number ? 'active' : ''}`}
                    onClick={() => paginate(number)}
                    style={{
                      color: currentPage === number ? 'white' : textColor,
                      backgroundColor: currentPage === number ? textColor : 'transparent',
                      borderColor: textColor,
                    }}
                  >
                    {number}
                  </button>
                ))}
              </div>

              <button
                className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ color: textColor, borderColor: textColor }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default JobList;
