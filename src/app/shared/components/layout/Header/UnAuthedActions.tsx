import React from 'react';

import { Link } from 'react-router-dom';

const UnAuthedActions = () => {
  return (
    <ul className="nav-actions-list">
      <li className="nav-actions-item">
        <Link className="btn btn-outline" to="/auth/register">
          Sign Up
        </Link>
      </li>
      <li className="nav-actions-item">
        <Link className="btn btn-primary" to="/auth/login">
          Sign In
        </Link>
      </li>
    </ul>
  );
};

export default UnAuthedActions;
