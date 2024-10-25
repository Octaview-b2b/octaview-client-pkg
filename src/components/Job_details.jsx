import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Building2, MapPin, Briefcase, GitBranch, DollarSign, Clock } from 'lucide-react';
import './css/JobDetails.css';

function JobDetails({ url, textColor }) {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await fetch(`${url}/${id}`);
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [url, id]);

  if (loading) return <div style={{ color: textColor }}>Loading...</div>;

  return job ? (
    <div className="job-details-container" style={{ color: textColor }}>
      {/* Header Section */}
      <div className="job-header">
        <div className="job-header-content">
          <h1 className="job-title" style={{ color: textColor }}>{job.job_title}</h1>
          <div className="company-location">
            <div className="detail-item">
              <Building2 className="icon" />
              <span style={{ color: textColor }}>{job.company || 'Company Name'}</span>
            </div>
            <div className="detail-item">
              <MapPin className="icon" />
              <span style={{ color: textColor }}>{job.location}</span>
            </div>
          </div>
        </div>
        <button className="apply-button" style={{ backgroundColor: textColor }}>Apply Now</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Job Description Section */}
        <div className="content-section">
          <h2 style={{ color: textColor }}>Job Description</h2>
          <p style={{ color: textColor }}>{job.description}</p>
        </div>

        {/* Job Details Section */}
        <div className="content-section">
          <h2 style={{ color: textColor }}>Job Details</h2>
          <div className="detail-item">
            <Briefcase className="icon" />
            <span style={{ color: textColor }}><strong>Job Role:</strong> {job.job_role}</span>
          </div>
          <div className="detail-item">
            <GitBranch className="icon" />
            <span style={{ color: textColor }}><strong>Skills Required:</strong> {job.skills}</span>
          </div>
          <div className="detail-item">
            <Clock className="icon" />
            <span style={{ color: textColor }}><strong>Job Level:</strong> {job.job_level}</span>
          </div>
          <div className="detail-item">
            <DollarSign className="icon" />
            <span style={{ color: textColor }}><strong>Salary Range:</strong> ${job.min_salary} - ${job.max_salary}</span>
          </div>
          <div className="detail-item">
            <MapPin className="icon" />
            <span style={{ color: textColor }}><strong>City:</strong> {job.city}</span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div style={{ color: textColor }}>No job details found</div>
  );
}

export default JobDetails;
