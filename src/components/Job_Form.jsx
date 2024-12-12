import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../JobContext';
import './css/JobForm.css'

function JobApplicationForm() {
  const { id } = useParams();
  const { url, textColor, buttonColor } = useAppContext();
  const [formData, setFormData] = useState({ name: '', email: '', resume: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${url}/${id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Error submitting application');
      alert('Application submitted successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to submit the application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="job-application-form"
      style={{ color: textColor }}
      onSubmit={handleSubmit}
    >
      <h2>Apply for Job</h2>
      <label htmlFor="name">Your Name</label>
      <input
        id="name"
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <label htmlFor="email">Your Email</label>
      <input
        id="email"
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <label htmlFor="email">Phone no</label>
      <input
        id="phone"
        type="number"
        placeholder="Your phone number"
        required
      />
      <label htmlFor="email">Resume</label>
      <input
        id="cv"
        type="file"
        required
      />
      <label htmlFor="resume">Brief Introduction</label>
      <textarea
        id="resume"
        placeholder="Brief Introduction"
        value={formData.resume}
        onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
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
