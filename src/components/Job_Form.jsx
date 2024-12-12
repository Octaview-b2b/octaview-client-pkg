import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../JobContext';
import './css/JobForm.css';

function JobApplicationForm() {
  const { id } = useParams();
  const { url, textColor, buttonColor } = useAppContext();
  const [formData, setFormData] = useState({
    full_Name: '',
    DOB: '',
    linkedin: '',
    profile: '',
    country: '',
    email: '',
    contact_no: '',
    status: {}, // Can be an object, adjust this according to your logic
    github: '',
    resume: null, // For file input
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSubmit = new FormData();

    // Append the data to FormData
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    try {
      const res = await fetch(`${url}/${id}/apply`, {
        method: 'POST',
        body: formDataToSubmit, // Sending FormData for file upload
      });

      if (!res.ok) throw new Error('Error submitting application');
      alert('Application submitted successfully');
      setFormData({
        full_Name: '',
        DOB: '',
        linkedin: '',
        profile: '',
        country: '',
        email: '',
        contact_no: '',
        status: {},
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

      <label htmlFor="full_Name">Your Name</label>
      <input
        id="full_Name"
        type="text"
        placeholder="Your Full Name"
        value={formData.full_Name}
        onChange={(e) => setFormData({ ...formData, full_Name: e.target.value })}
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

      <label htmlFor="profile">Profile</label>
      <input
        id="profile"
        type="text"
        placeholder="Your Profile"
        value={formData.profile}
        onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
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

      <label htmlFor="contact_no">Phone Number</label>
      <input
        id="contact_no"
        type="tel"
        placeholder="Your Phone Number"
        value={formData.contact_no}
        onChange={(e) => setFormData({ ...formData, contact_no: e.target.value })}
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

      <label htmlFor="cv">Resume</label>
      <input
        id="cv"
        type="file"
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
