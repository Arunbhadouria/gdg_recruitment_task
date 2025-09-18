// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ApplicationTable from '../components/ApplicationTable';

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpp, setSelectedOpp] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Fetch opportunities posted by the current logged-in user
      const q = query(
        collection(db, "opportunities"),
        where("postedBy", "==", user.uid),
        orderBy("postedAt", "desc")
      );

      const fetchOpportunities = async () => {
        const querySnapshot = await getDocs(q);
        const userOpps = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOpportunities(userOpps);
      };

      fetchOpportunities();
    }
  }, [user]);

  const handleLogout = () => {
    signOut(auth);
    navigate('/login');
  };

  if (loading) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="dashboard-container">
      <div className='dashboard-header'>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      
      <h3>Your Posted Opportunities</h3>
      <div className="opportunity-selector">
        {opportunities.length > 0 ? (
          opportunities.map(opp => (
            <button key={opp.id} onClick={() => setSelectedOpp(opp)} className={selectedOpp?.id === opp.id ? 'active' : ''}>
              {opp.roleTitle}
            </button>
          ))
        ) : (
          <p>You haven't posted any opportunities yet. <a href="/post">Post one now!</a></p>
        )}
      </div>

      {selectedOpp && (
        <div className="application-viewer">
          <h3>Applications for {selectedOpp.roleTitle}</h3>
          <ApplicationTable opportunityId={selectedOpp.id} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;