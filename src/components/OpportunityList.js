// src/components/OpportunityList.js
import React from 'react';
import OpportunityCard from './OpportunityCard';

const OpportunityList = ({ opportunities }) => {
  return (
    <div className="opportunity-list">
      {opportunities.length > 0 ? (
        opportunities.map(opp => <OpportunityCard key={opp.id} opportunity={opp} />)
      ) : (
        <p>No opportunities posted yet. Check back later!</p>
      )}
    </div>
  );
};

export default OpportunityList;