// src/components/ApplicationForm.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const ApplicationForm = ({ opportunityId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [year, setYear] = useState('');
  // MODIFICATION: Replaced resumeLink with skills and taskLink
  const [skills, setSkills] = useState('');
  const [taskLink, setTaskLink] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // MODIFICATION: Updated validation check
    if (!name || !email || !year || !skills) {
        setMessage('Error: Please fill out all required fields.');
        return;
    }

    try {
      await addDoc(collection(db, "applications"), {
        opportunityId,
        name,
        email,
        year,
        // MODIFICATION: Saving new fields to Firestore
        skills,
        taskLink, // This can be empty initially
        submittedAt: Timestamp.now(),
        status: 'Applied' // NEW: Add a default status for tracking
      });
      setMessage('Success! Your application has been submitted.');
      // Reset form
      setName('');
      setEmail('');
      setYear('');
      setSkills('');
      setTaskLink('');
    } catch (error) {
      console.error("Error submitting application: ", error);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="form-container">
      <h4>Apply for this Role</h4>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        
        <label>Year (e.g., Sophomore)</label>
        <input type="text" value={year} onChange={(e) => setYear(e.target.value)} required />
        
        {/* MODIFICATION: New "Skills" field */}
        <label>Relevant Skills (e.g., Python, Photoshop, Public Speaking)</label>
        <textarea value={skills} onChange={(e) => setSkills(e.target.value)} required></textarea>
        
        {/* MODIFICATION: New optional "Task Submission" field */}
        <label>Task Submission Link (Optional, if a task was assigned)</label>
        <input type="url" value={taskLink} onChange={(e) => setTaskLink(e.target.value)} />
        
        <button type="submit">Submit Application</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ApplicationForm;