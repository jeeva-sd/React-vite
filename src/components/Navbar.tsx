import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/user-dashboard">User Dashboard</Link></li>
        <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
      </ul>
    </nav>
  );
};

export { Navbar };
