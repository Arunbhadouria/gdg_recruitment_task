// src/components/OpportunityCard.js
import React, { useState } from 'react';
import ApplicationForm from './ApplicationForm';

const OpportunityCard = ({ opportunity }) => {
  const [showApplyForm, setShowApplyForm] = useState(false);

  return (
    <div className="opportunity-card">
      {opportunity.clubName && <h4 className="club-name">{opportunity.clubName}</h4>}
      <h3>{opportunity.roleTitle}</h3>
      <p><strong>Description:</strong> {opportunity.description}</p>
      <p><strong>Deadline:</strong> {opportunity.deadline}</p>
      <p><strong>Contact:</strong> {opportunity.contactInfo}</p>
      <button onClick={() => setShowApplyForm(true)}>Apply Now</button>
      
      {showApplyForm && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowApplyForm(false)}>&times;</span>
            <ApplicationForm opportunityId={opportunity.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OpportunityCard;