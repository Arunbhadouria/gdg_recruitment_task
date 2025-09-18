// src/pages/BrowseOpportunities.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import OpportunityList from '../components/OpportunityList';

const BrowseOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        // Create a query to get opportunities ordered by post date
        const q = query(collection(db, "opportunities"), orderBy("postedAt", "desc"));
        const querySnapshot = await getDocs(q);
        const opportunitiesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOpportunities(opportunitiesData);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      <h2>Available Opportunities</h2>
      {loading ? (
        <p>Loading opportunities...</p>
      ) : (
        <OpportunityList opportunities={opportunities} />
      )}
    </div>
  );
};

export default BrowseOpportunities;