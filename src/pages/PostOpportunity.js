// src/pages/PostOpportunity.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, Timestamp, doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const PostOpportunity = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

  const [roleTitle, setRoleTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const [clubName, setClubName] = useState('');

   useEffect(() => {
    const fetchClubName = async () => {
      if (user) {
        const clubDocRef = doc(db, 'clubs', user.uid);
        const clubDocSnap = await getDoc(clubDocRef);
        if (clubDocSnap.exists()) {
          setClubName(clubDocSnap.data().name);
        } else {
          console.log("No such club document!");
          // Handle case where user exists but club profile doesn't
        }
      }
    };
    fetchClubName();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage('Error: You must be logged in to post an opportunity.');
      return;
    }
    if (!roleTitle || !description || !deadline || !contactInfo) {
      setMessage('Error: All fields are required.');
      return;
    }

    try {
      // Add a new document with a generated id to the "opportunities" collection
      await addDoc(collection(db, "opportunities"), {
        roleTitle,
        description,
        deadline,
        contactInfo,
        postedBy: user.uid,
        clubName: clubName,
        postedAt: Timestamp.now()
      });

      // Reset form and show success message
      setMessage('Success! Your opportunity has been posted.');
      navigate('/');

    } catch (error) {
      console.error("Error adding document: ", error);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Post a New Opportunity for {clubName || 'your club'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Role Title</label>
        <input
          type="text"
          value={roleTitle}
          onChange={(e) => setRoleTitle(e.target.value)}
          required
        />
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <label>Application Deadline</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <label>Contact Info (Email/Link)</label>
        <input
          type="text"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
        />
        <button type="submit">Post</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default PostOpportunity;