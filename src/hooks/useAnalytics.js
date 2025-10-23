import { useState, useEffect, useRef } from 'react';

export const useAnalytics = () => {
  // Check if session exists in sessionStorage
  const getInitialSessionData = () => {
    const savedSession = sessionStorage.getItem('analyticsSession');
    if (savedSession) {
      const parsed = JSON.parse(savedSession);
      return {
        ...parsed,
        pageReloads: (parsed.pageReloads || 0) + 1,
      };
    }
    return {
      visitTime: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'Direct visit',
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      platform: navigator.platform,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      openedPlayables: [],
      resumeDownloaded: false,
      sessionDuration: 0,
      devToolsOpened: false,
      externalLinksClicked: [],
      pageReloads: 0,
    };
  };

  const [analyticsData, setAnalyticsData] = useState(getInitialSessionData());

  const sessionStartTime = useRef(Date.now());
  const playableTimers = useRef({});
  const playableStats = useRef({});
  const analyticsDataRef = useRef(analyticsData);
  const dataSentRef = useRef(false);

  // Sync ref with state and save to sessionStorage
  useEffect(() => {
    analyticsDataRef.current = analyticsData;
    sessionStorage.setItem('analyticsSession', JSON.stringify(analyticsData));
  }, [analyticsData]);

  // Detect DevTools opening
  useEffect(() => {
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      const orientation = widthThreshold ? 'vertical' : 'horizontal';

      if (
        !(heightThreshold && orientation === 'vertical') &&
        ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)
      ) {
        if (!analyticsDataRef.current.devToolsOpened) {
          setAnalyticsData(prev => ({ ...prev, devToolsOpened: true }));
        }
      }
    };

    window.addEventListener('resize', detectDevTools);
    detectDevTools();

    return () => window.removeEventListener('resize', detectDevTools);
  }, []);

  // Track external link clicks
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest('a');
      if (target && target.href) {
        const url = new URL(target.href);
        const isExternal = url.hostname !== window.location.hostname;
        
        if (isExternal) {
          const linkData = {
            url: target.href,
            text: target.textContent || target.innerText,
            time: new Date().toISOString(),
          };
          
          setAnalyticsData(prev => ({
            ...prev,
            externalLinksClicked: [...prev.externalLinksClicked, linkData]
          }));
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Update session duration
  useEffect(() => {
    const interval = setInterval(() => {
      const duration = Math.floor((Date.now() - sessionStartTime.current) / 1000);
      setAnalyticsData(prev => ({ ...prev, sessionDuration: duration }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Track playable opening
  const trackPlayableOpen = (playableName) => {
    const openTime = Date.now();
    playableTimers.current[playableName] = openTime;

    // Initialize stats for playable
    if (!playableStats.current[playableName]) {
      playableStats.current[playableName] = {
        reloads: 0,
        rotations: 0,
      };
    }

    setAnalyticsData(prev => ({
      ...prev,
      openedPlayables: [
        ...prev.openedPlayables.filter(p => p.name !== playableName),
        { 
          name: playableName, 
          timeSpent: 0,
          reloads: 0,
          rotations: 0,
        }
      ]
    }));
  };

  // Track playable closing
  const trackPlayableClose = (playableName) => {
    const closeTime = Date.now();
    const openTime = playableTimers.current[playableName];
    
    if (openTime) {
      const timeSpent = Math.floor((closeTime - openTime) / 1000);
      const stats = playableStats.current[playableName] || { reloads: 0, rotations: 0 };
      
      setAnalyticsData(prev => ({
        ...prev,
        openedPlayables: prev.openedPlayables.map(p => 
          p.name === playableName ? { 
            ...p, 
            timeSpent,
            reloads: stats.reloads,
            rotations: stats.rotations,
          } : p
        )
      }));

      delete playableTimers.current[playableName];
    }
  };

  // Track playable reload
  const trackPlayableReload = (playableName) => {
    if (playableStats.current[playableName]) {
      playableStats.current[playableName].reloads += 1;
    }
  };

  // Track screen rotation in playable
  const trackPlayableRotation = (playableName) => {
    if (playableStats.current[playableName]) {
      playableStats.current[playableName].rotations += 1;
    }
  };

  // Track resume download
  const trackResumeDownload = () => {
    setAnalyticsData(prev => ({ 
      ...prev, 
      resumeDownloaded: true,
      resumeDownloadedAt: new Date().toISOString()
    }));
  };

  const getAnalyticsData = () => analyticsDataRef.current;

  const markDataAsSent = () => {
    dataSentRef.current = true;
  };

  const isDataSent = () => dataSentRef.current;

  const clearSession = () => {
    sessionStorage.removeItem('analyticsSession');
  };

  return {
    trackPlayableView: trackPlayableOpen,
    trackPlayableClose,
    trackPlayableReload,
    trackPlayableRotation,
    trackResumeDownload,
    getAnalyticsData,
    markDataAsSent,
    isDataSent,
    clearSession,
  };
};

export default useAnalytics;
