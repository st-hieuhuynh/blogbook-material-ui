import React from 'react';

import { Outlet } from 'react-router';

const Bookmarks = () => {
  return (
    <div className="bookmark-container">
      <Outlet />
    </div>
  );
};

export default Bookmarks;
