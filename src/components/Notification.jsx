import React, { useEffect } from 'react';
import './Notification.scss';

const Notification = ({ message, type = 'success', onClose, visible }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div className={`notification notification--${type} ${visible ? 'notification--visible' : ''}`}>
      {message}
    </div>
  );
};

export default Notification;
