// src/pages/ClubSignUp.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ClubSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clubName, setClubName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'clubs', user.uid), {
        name: clubName,
        adminEmail: user.email
      });
      navigate('/dashboard'); // Redirect to dashboard after successful signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Club Admin Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label>Club Name</label>
        <input 
          type="text" 
          value={clubName} 
          onChange={(e) => setClubName(e.target.value)} 
          required 
        />
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password (min. 6 characters)</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
        {error && <p className="message" style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default ClubSignUp;