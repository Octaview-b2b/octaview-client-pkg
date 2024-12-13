import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../JobContext';
import './css/JobForm.css';

function JobApplicationForm() {
  const { id } = useParams();
  const { url, textColor, buttonColor } = useAppContext();
  const [formData, setFormData] = useState({
    fullName: '',   // Renamed to match backend
    DOB: '',
    linkedin: '',
    country: '',
    email: '',
    contactNo: '',  // Renamed to match backend
    github: '',
    resume: null, // For file input
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const formDataToSubmit = new FormData();
  
    // Loop through formData object and append all key-value pairs dynamically
    for (const key in formData) {
      if (formData[key]) {
        formDataToSubmit.append(key, formData[key]);
      }
    }
  
    try {
      const res = await fetch(`${url}/apply/${id}`, {
        method: 'POST',
        body: formDataToSubmit,
      });
  
      if (!res.ok) throw new Error('Error submitting application');
      alert('Application submitted successfully');
      setFormData({
        fullName: '',
        DOB: '',
        linkedin: '',
        country: '',
        email: '',
        contactNo: '',
        github: '',
        resume: null,
      });
    } catch (error) {
      console.error(error);
      alert('Failed to submit the application.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0], // File input for resume
    });
  };

  return (
    <form
      className="job-application-form"
      style={{ color: textColor }}
      onSubmit={handleSubmit}
    >
      <h2>Apply for Job</h2>

      <label htmlFor="fullName">Your Name</label>
      <input
        id="fullName"
        type="text"
        placeholder="Your Full Name"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        required
      />

      <label htmlFor="DOB">Date of Birth</label>
      <input
        id="DOB"
        type="date"
        value={formData.DOB}
        onChange={(e) => setFormData({ ...formData, DOB: e.target.value })}
        required
      />

      <label htmlFor="linkedin">LinkedIn</label>
      <input
        id="linkedin"
        type="url"
        placeholder="Your LinkedIn URL"
        value={formData.linkedin}
        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
        required
      />

      <label htmlFor="country">Country</label>
      <input
        id="country"
        type="text"
        placeholder="Your Country"
        value={formData.country}
        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
        required
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <label htmlFor="contactNo">Phone Number</label>
      <input
        id="contactNo"
        type="tel"
        placeholder="Your Phone Number"
        value={formData.contactNo}
        onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
        required
      />

      <label htmlFor="github">GitHub</label>
      <input
        id="github"
        type="url"
        placeholder="Your GitHub URL"
        value={formData.github}
        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
        required
      />

      <label htmlFor="resume">Resume</label>
      <input
        id="resume"
        type="file"
        name="resume"
        onChange={handleFileChange}
        required
      />

      <button
        type="submit"
        style={{ backgroundColor: buttonColor }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

export default JobApplicationForm;
