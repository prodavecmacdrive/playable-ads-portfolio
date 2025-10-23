import React from 'react';
import './AnalyticsButton.css';

const AnalyticsButton = ({ analyticsData, onSend }) => {
  const handleSend = async () => {
    try {
      // Format data for sending
      const formData = new FormData();
      
      formData.append('_subject', `Portfolio Visit - ${new Date().toLocaleString()}`);
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');
      formData.append('visitTime', analyticsData.visitTime);
      formData.append('userAgent', analyticsData.userAgent);
      formData.append('referrer', analyticsData.referrer);
      formData.append('screenResolution', analyticsData.screenResolution);
      formData.append('language', analyticsData.language);
      formData.append('platform', analyticsData.platform);
      formData.append('timeZone', analyticsData.timeZone);
      formData.append('sessionDuration', `${analyticsData.sessionDuration} seconds`);
      formData.append('resumeDownloaded', analyticsData.resumeDownloaded ? 'Yes' : 'No');
      formData.append('resumeDownloadedAt', analyticsData.resumeDownloadedAt || 'N/A');
      formData.append('devToolsOpened', analyticsData.devToolsOpened ? 'Yes' : 'No');
      formData.append('pageReloads', analyticsData.pageReloads || 0);
      
      const playablesText = analyticsData.openedPlayables.length > 0 
        ? analyticsData.openedPlayables.map(p => 
            `${p.name} (${p.timeSpent}s, ${p.reloads} reloads, ${p.rotations} rotations)`
          ).join(', ')
        : 'None';
      formData.append('openedPlayables', playablesText);
      formData.append('playablesDetails', JSON.stringify(analyticsData.openedPlayables, null, 2));
      
      const externalLinksText = analyticsData.externalLinksClicked.length > 0
        ? analyticsData.externalLinksClicked.map(l => `${l.url} (${l.text})`).join(', ')
        : 'None';
      formData.append('externalLinksClicked', externalLinksText);
      formData.append('externalLinksDetails', JSON.stringify(analyticsData.externalLinksClicked, null, 2));

      // Send via fetch without redirect
      const response = await fetch('https://formsubmit.co/playable.portfolio@gmail.com', {
        method: 'POST',
        body: formData,
        mode: 'no-cors', // Disable CORS for hidden sending
      });

      if (onSend) onSend();
      
      alert('Analytics data sent successfully!');
    } catch (error) {
      alert('Error sending analytics data.');
    }
  };

  return (
    <button className="analytics-button" onClick={handleSend}>
      📊 Send Analytics Report (Test)
    </button>
  );
};

export default AnalyticsButton;
