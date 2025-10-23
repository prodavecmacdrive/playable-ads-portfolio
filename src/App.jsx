import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Header from './components/Header';
import ProjectGrid from './components/ProjectGrid';
import PDFSection from './components/PDFSection';
import ProjectModal from './components/ProjectModal';
import useAnalytics from './hooks/useAnalytics';
import './App.css';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [clickPosition, setClickPosition] = useState(null);
  const lenisRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Initialize analytics
  const { 
    trackPlayableView, 
    trackPlayableClose, 
    trackPlayableReload, 
    trackPlayableRotation, 
    trackResumeDownload, 
    getAnalyticsData,
    markDataAsSent,
    isDataSent,
    clearSession,
  } = useAnalytics();

  // Send analytics when user leaves the site (only on actual close, not reload)
  useEffect(() => {
    const sendAnalyticsOnLeave = (event) => {
      // Don't send if already sent or if it's just a page reload
      if (isDataSent() || event.persisted) {
        return;
      }

      const analyticsData = getAnalyticsData();
      
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

      // Use sendBeacon for reliable sending on page unload
      const blob = new Blob([new URLSearchParams(formData).toString()], {
        type: 'application/x-www-form-urlencoded'
      });
      
      const sent = navigator.sendBeacon('https://formsubmit.co/playable.portfolio@gmail.com', blob);
      if (sent) {
        markDataAsSent();
        clearSession();
      }
    };

    const handleVisibilityChange = () => {
      // Only send when page is being hidden and document is about to be unloaded
      if (document.visibilityState === 'hidden' && !isDataSent()) {
        // Check if it's a real close (not just tab switch)
        setTimeout(() => {
          if (document.visibilityState === 'hidden') {
            sendAnalyticsOnLeave({ persisted: false });
          }
        }, 100);
      }
    };

    // Handle actual page close (not reload or tab switch)
    window.addEventListener('pagehide', sendAnalyticsOnLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('pagehide', sendAnalyticsOnLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [getAnalyticsData, markDataAsSent, isDataSent, clearSession]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Handle project opening
  const handleProjectClick = (project, event) => {
    if (event) {
      const rect = event.currentTarget.getBoundingClientRect();
      setClickPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    setSelectedProject(project);
    
    // Track playable opening
    if (project && project.name) {
      trackPlayableView(project.name);
    }
    
    // Calculate scrollbar width and set CSS variable
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    
    // Stop Lenis and block scroll
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
    
    setIsModalOpen(true);
  };

  // Handle modal closing
  const handleCloseModal = () => {
    // Track playable closing
    if (selectedProject && selectedProject.name) {
      trackPlayableClose(selectedProject.name);
    }
    
    setSelectedProject(null);
    setClickPosition(null);
    
    // Delay removing modal-open class to wait for exit animation
    setTimeout(() => {
      setIsModalOpen(false);
      // Resume Lenis after modal animation completes
      if (lenisRef.current) {
        lenisRef.current.start();
      }
    }, 300);
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedProject]);

  // Restore modal window on mobile reload
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const savedProject = sessionStorage.getItem('openProject');
    
    if (isMobile && savedProject) {
      const project = JSON.parse(savedProject);
      setSelectedProject(project);
      
      // Stop Lenis and block scroll on mobile
      if (lenisRef.current) {
        lenisRef.current.stop();
      }
      setIsModalOpen(true);
    }
  }, []);

  // Save opened project for mobile version
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile && selectedProject) {
      sessionStorage.setItem('openProject', JSON.stringify(selectedProject));
    } else {
      sessionStorage.removeItem('openProject');
    }
  }, [selectedProject]);

  return (
    <div className={`app ${isModalOpen ? 'modal-open' : ''}`}>
      <Header />
      
      <main className="main-content">
        <ProjectGrid onProjectClick={handleProjectClick} />
        
        <PDFSection onDownload={trackResumeDownload} />
      </main>

      {/* Modal window */}
      <ProjectModal
        project={selectedProject}
        onClose={handleCloseModal}
        clickPosition={clickPosition}
        onReload={trackPlayableReload}
        onRotation={trackPlayableRotation}
      />
    </div>
  );
}

export default App;
