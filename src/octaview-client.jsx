import React from 'react';
import JobList from './components/JobList';
import JobDetails from './components/Job_details';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function OctaviewClient({ url, background, textColor }) {
  return (
    <div style={{ background: background, color: textColor }}>
      <BrowserRouter>
        <Routes>
          <Route 
            path='/' 
            element={<JobList url={url} textColor={textColor} />} 
          />
          <Route 
            path='/details/:id' 
            element={<JobDetails url={url} textColor={textColor} />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default OctaviewClient;
