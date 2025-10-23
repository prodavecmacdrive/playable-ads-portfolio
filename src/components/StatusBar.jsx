import React, { useState, useEffect } from 'react';
import './StatusBar.css';

const StatusBar = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="status-bar">
      <div className="status-bar-left">
        <span className="status-time">{time}</span>
      </div>
      <div className="status-bar-center"></div>
      <div className="status-bar-right">
        <svg className="status-icon signal" width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="8" width="2" height="4" rx="0.5" fill="currentColor"/>
          <rect x="4" y="6" width="2" height="6" rx="0.5" fill="currentColor"/>
          <rect x="8" y="4" width="2" height="8" rx="0.5" fill="currentColor"/>
          <rect x="12" y="2" width="2" height="10" rx="0.5" fill="currentColor"/>
          <rect x="16" y="0" width="2" height="12" rx="0.5" fill="currentColor"/>
        </svg>
        <svg className="status-icon battery" width="27" height="13" viewBox="0 0 27 13" fill="none">
          <rect x="0.5" y="0.5" width="22" height="12" rx="2.5" stroke="currentColor" strokeOpacity="0.35"/>
          <path opacity="0.4" d="M25 4V9C25.5 8.83 26 8.33 26 7.5V5.5C26 4.67 25.5 4.17 25 4Z" fill="currentColor"/>
          <rect x="2" y="2" width="17.5" height="9" rx="1.5" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
};

export default StatusBar;
