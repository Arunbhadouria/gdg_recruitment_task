// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const [user] = useAuthState(auth);

  return (
    <nav className="navbar">
      <h1>Club Recruit</h1>
      <div className="links">
        <NavLink to="/">Browse</NavLink>
        <NavLink to="/post">Post Opportunity</NavLink>
        {user ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </>
        ) : (
          <NavLink to="/login">Admin Login</NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;