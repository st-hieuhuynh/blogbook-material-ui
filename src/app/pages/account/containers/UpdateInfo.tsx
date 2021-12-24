import React, { useEffect } from 'react';

import FormUpdateInfo from '../components/FormUpdateInfo';

const UpdateInfo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="sub-heading mb-2">
        <h2 className="txt-center">Update Information</h2>
      </div>
      <FormUpdateInfo />
    </div>
  );
};

export default UpdateInfo;
