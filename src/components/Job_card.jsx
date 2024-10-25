import React from 'react';
import { Building2, MapPin, Briefcase, GitBranch } from 'lucide-react';
import './css/JobCard.css';

const JobCard = ({ job, onClick, textColor }) => {
  return (
    <div className="job-card" onClick={onClick}>
      <div className="job-card-header">
        <div className="job-id" style={{ color: textColor }}>ID: {job.id}</div>
        <h2 className="job-title" style={{ color: textColor }}>{job.job_title}</h2>
      </div>

      <div className="job-details">
        <div className="detail-item">
          <Briefcase className="icon" />
          <span style={{ color: textColor }}>{job.job_role}</span>
        </div>

        <div className="detail-item">
          <GitBranch className="icon" />
          <span style={{ color: textColor }}>{job.job_level}</span>
        </div>

        <div className="detail-item">
          <Building2 className="icon" />
          <span style={{ color: textColor }}>{job.city}</span>
        </div>

        <div className="detail-item">
          <MapPin className="icon" />
          <span className="location-text" style={{ color: textColor }}>{job.location}</span>
        </div>
      </div>

      <button className="apply-button" style={{ backgroundColor: textColor }}>Apply Now</button>
    </div>
  );
};

export default JobCard;
