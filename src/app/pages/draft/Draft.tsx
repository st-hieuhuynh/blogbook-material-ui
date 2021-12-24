import React from 'react';

import { Outlet } from 'react-router';

const Draft = () => {
  return (
    <div className="draft-container">
      <Outlet />
    </div>
  );
};

export default Draft;
