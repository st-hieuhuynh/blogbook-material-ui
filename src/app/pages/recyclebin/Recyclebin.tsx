import React from 'react';

import { Outlet } from 'react-router';

const Recyclebin = () => {
  return (
    <div className="recyclebin-container">
      <Outlet />
    </div>
  );
};

export default Recyclebin;
