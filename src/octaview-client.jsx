import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppProvider } from './JobContext';
import JobList from './components/JobList';
import JobDetails from './components/Job_details';
import JobApplicationForm from './components/Job_Form';

function OctaviewClient({ url, background, textColor, buttonColor,api }) {
  return (
    <AppProvider url={url} background={background} textColor={textColor} buttonColor={buttonColor} api={api}>
      <div style={{ background, color: textColor }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/details/:id" element={<JobDetails />} />
            <Route path="/apply/:id" element={<JobApplicationForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppProvider>
  );
}

export default OctaviewClient;
