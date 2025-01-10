import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../JobContext';
import Alert from './Alert'; // Import the Alert component
import './css/JobForm.css';

function JobApplicationForm() {
  const { id } = useParams(); // Extracting the job ID from the URL
  const { textColor, buttonColor, api, userId } = useAppContext(); // Accessing the URL, colors, and API key from context
  const [formData, setFormData] = useState({
    fullName: '',
    DOB: '',
    linkedin: '',
    country: '',
    email: '',
    contactNo: '',
    github: '',
    resume: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Track the submission state
  const [alert, setAlert] = useState({ message: '', type: '', visible: false }); // Alert state
console.log('id : ',id);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSubmit = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        formDataToSubmit.append(key, formData[key]);
      }
    }

    try {
      const res = await fetch(`http://localhost:5000/api/jobs/ext/apply/${userId}/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${api}`,
        },
        body: formDataToSubmit,
      });

      if (!res.ok) throw new Error('Error submitting application');

      // Show success alert
      setAlert({
        message: 'Application submitted successfully!',
        type: 'success',
        visible: true,
      });

      // Reset the form data
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

      // Show error alert
      setAlert({
        message: `Error: ${error.message}`,
        type: 'error',
        visible: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle file input change (resume upload)
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  };

  // Close the alert
  const closeAlert = () => {
    setAlert({ ...alert, visible: false });
  };

  return (
    <div>
      {/* Render Alert component if alert is visible */}
      {alert.visible && <Alert message={alert.message} type={alert.type} onClose={closeAlert} />}

      <form
        className="job-application-form"
        style={{ color: textColor }}
        onSubmit={handleSubmit}
      >
        <h2>Apply for Job</h2>

        {/* Full Name */}
        <label htmlFor="fullName">Your Name</label>
        <input
          id="fullName"
          type="text"
          placeholder="Your Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
        />

        {/* Date of Birth */}
        <label htmlFor="DOB">Date of Birth</label>
        <input
          id="DOB"
          type="date"
          value={formData.DOB}
          onChange={(e) => setFormData({ ...formData, DOB: e.target.value })}
          required
        />

        {/* LinkedIn URL */}
        <label htmlFor="linkedin">LinkedIn</label>
        <input
          id="linkedin"
          type="url"
          placeholder="Your LinkedIn URL"
          value={formData.linkedin}
          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
          required
        />

        {/* Country */}
        <label htmlFor="country">Country</label>
        <input
          id="country"
          type="text"
          placeholder="Your Country"
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          required
        />

        {/* Email */}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        {/* Phone Number */}
        <label htmlFor="contactNo">Phone Number</label>
        <input
          id="contactNo"
          type="tel"
          placeholder="Your Phone Number"
          value={formData.contactNo}
          onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
          required
        />

        {/* GitHub URL */}
        <label htmlFor="github">GitHub</label>
        <input
          id="github"
          type="url"
          placeholder="Your GitHub URL"
          value={formData.github}
          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
          required
        />

        {/* Resume Upload */}
        <label htmlFor="resume">Resume</label>
        <input
          id="resume"
          type="file"
          name="resume"
          onChange={handleFileChange}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          style={{ backgroundColor: buttonColor }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default JobApplicationForm;
