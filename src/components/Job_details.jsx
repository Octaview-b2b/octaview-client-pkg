import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Building2, MapPin, Briefcase, GitBranch } from 'lucide-react';
import './css/JobDetails.css';
import { useAppContext } from '../JobContext';

const JobDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { job } = location.state || {}; 
  const { textColor, buttonColor,backgroundColor } = useAppContext()
  if (!job) {
    return <p>No job details available. Please go back and select a job.</p>;
  }

  const {
    job_title,
    skills,
    job_role,
    jobType,
    min_salary,
    max_salary,
    job_level,
    location: jobLocation,
    city,
    description,
    id, 
  } = job;

  const handleApplyNow = () => {
    
    navigate(`/apply/${id}`);
  };

  return (
    <div className="job-details-container"  style={{ backgroundColor: backgroundColor }}>
      <div className="job-header">
        <div className="job-header-content">
          <h1 className="job-title">{job_title}</h1>
          <div className="company-location">
            <div className="detail-item">
              <span className="icon"><MapPin/></span>
              {jobLocation}, {city}
            </div>
            <div className="detail-item">
              <span className="icon"><Briefcase/></span>
              {job_role}
            </div>
          </div>
        </div>
      </div>

      <div className="quick-info">
        <div className="info-card">
          <div className="info-content">
            <span className="info-label">Job Type: </span>
            <span className="info-value">{jobType}</span>
          </div>
        </div>
        <div className="info-card">
          <div className="info-content">
            <span className="info-label">Salary Range: </span>
            <span className="info-value">
              ${min_salary} - ${max_salary}
            </span>
          </div>
        </div>
        <div className="info-card">
          <div className="info-content">
            <span className="info-label">Job Level: </span>
            <span className="info-value">{job_level}</span>
          </div>
        </div>
      </div>
      

      <div className="main-content">
        <div className="content-section">
          <h2>Job Description</h2>
          <p>{description}</p>
        </div>

        <div className="content-section">
          <h2>Skills Required</h2>
          <div className="skills-container">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button className="apply-button" onClick={handleApplyNow} style={{ backgroundColor: buttonColor }}>Apply Now</button>
      <button className="mobile-apply-button"  style={{ backgroundColor: buttonColor }} onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default JobDetails;
