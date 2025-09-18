// src/components/ApplicationTable.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, doc, updateDoc, orderBy } from 'firebase/firestore';

const ApplicationTable = ({ opportunityId }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    setLoading(true);
    const q = query(
      collection(db, 'applications'),
      where('opportunityId', '==', opportunityId),
      orderBy('submittedAt', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const appsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setApplications(appsData);
    setLoading(false);
  };

  useEffect(() => {
    if (opportunityId) {
      fetchApplications();
    }
  }, [opportunityId]);

  const handleStatusChange = async (appId, newStatus) => {
    const appDocRef = doc(db, 'applications', appId);
    try {
      await updateDoc(appDocRef, { status: newStatus });
      // Refresh the list to show the change immediately
      fetchApplications(); 
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  if (loading) return <p>Loading applications...</p>;
  if (applications.length === 0) return <p>No applications received for this role yet.</p>;

  return (
    <table className="application-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Year</th>
          <th>Skills</th>
          <th>Task Link</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {applications.map(app => (
          <tr key={app.id}>
            <td>{app.name}</td>
            <td>{app.email}</td>
            <td>{app.year}</td>
            <td>{app.skills}</td>
            <td>{app.taskLink ? <a href={app.taskLink} target="_blank" rel="noopener noreferrer">View Task</a> : 'N/A'}</td>
            <td><span className={`status ${app.status?.toLowerCase()}`}>{app.status}</span></td>
            <td>
              <select 
                value={app.status} 
                onChange={(e) => handleStatusChange(app.id, e.target.value)}
                className="status-select"
              >
                <option value="Applied">Applied</option>
                <option value="Task Sent">Task Sent</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApplicationTable;