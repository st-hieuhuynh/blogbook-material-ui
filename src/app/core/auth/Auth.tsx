import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { Outlet } from 'react-router-dom';

import { RootState } from '@app/App';

const Auth = () => {
  const authState = useSelector((state: RootState) => state.authReducer);

  if (!!authState.data?.userInfo) {
    return <Navigate to="/" />;
  }

  return (
    <div className="auth-page">
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
