import React, { useContext, useEffect } from 'react';

import NotificationContext from '../../contexts/NotificationContext/NotificationContext';

interface NotificationOptions {
  isSuccess: boolean;
  message: string;
}

const Notification = (props: { notification: NotificationOptions | null }) => {
  const { hideNotification } = useContext(NotificationContext);
  const isSuccess = props.notification?.isSuccess ? 'success' : 'error';

  useEffect(() => {
    setTimeout(() => {
      hideNotification();
    }, 4000);
  });

  if (!props.notification) {
    return <></>;
  }

  return (
    <div className="notification">
      <p className={`notification-text ${isSuccess}`}>
        {props.notification?.message}
      </p>
    </div>
  );
};

export default Notification;
