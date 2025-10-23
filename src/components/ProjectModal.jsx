import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StatusBar from './StatusBar';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose, clickPosition, onReload, onRotation }) => {
  const [isPortrait, setIsPortrait] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [loadIframe, setLoadIframe] = useState(false);
  const iframeRef = useRef(null);

  const injectMockScript = (iframe) => {
    if (!iframe || !iframe.contentWindow || !iframe.contentWindow.document) {
      return;
    }
    
    const doc = iframe.contentWindow.document;
    const script = doc.createElement('script');
    script.textContent = `
      (function() {
        const noop = function() {};
        window.console = {
          log: noop, warn: noop, error: noop, info: noop, debug: noop,
          trace: noop, dir: noop, dirxml: noop, group: noop, groupEnd: noop,
          time: noop, timeEnd: noop, assert: noop, profile: noop, clear: noop,
          table: noop, count: noop, groupCollapsed: noop
        };

        window.onerror = function() { return true; };

        window.showStoreNotification = function() {
          const notification = document.createElement('div');
          notification.innerHTML = '🎮 Store redirect blocked (Portfolio mode)';
          notification.style.cssText = 'position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #FF6B35 0%, #9B59B6 100%); color: white; padding: 16px 32px; border-radius: 50px; font-family: system-ui, -apple-system, sans-serif; font-size: 16px; font-weight: 600; box-shadow: 0 10px 40px rgba(255, 107, 53, 0.4); z-index: 999999; animation: slideInBounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); pointer-events: none;';
          const style = document.createElement('style');
          style.textContent = '@keyframes slideInBounce { 0% { transform: translateX(-50%) translateY(-100px); opacity: 0; } 100% { transform: translateX(-50%) translateY(0); opacity: 1; } } @keyframes slideOut { 0% { transform: translateX(-50%) translateY(0); opacity: 1; } 100% { transform: translateX(-50%) translateY(-100px); opacity: 0; } }';
          document.head.appendChild(style);
          document.body.appendChild(notification);
          setTimeout(function() {
            notification.style.animation = 'slideOut 0.5s ease-in-out';
            setTimeout(function() { if (notification.parentNode) document.body.removeChild(notification); }, 500);
          }, 2500);
        };

        window.mraid = {
          addEventListener: function() {}, removeEventListener: function() {},
          open: function() { window.showStoreNotification(); },
          close: function() {}, useCustomClose: function() {}, expand: function() {},
          isViewable: function() { return true; }, getState: function() { return 'default'; },
          getPlacementType: function() { return 'inline'; }, getVersion: function() { return '3.0'; },
          supports: function() { return true; }, playVideo: function() {}, resize: function() {},
          storePicture: function() {}, createCalendarEvent: function() {},
          getScreenSize: function() { return { width: window.innerWidth, height: window.innerHeight }; },
          getMaxSize: function() { return { width: window.innerWidth, height: window.innerHeight }; },
          getCurrentPosition: function() { return { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight }; },
          getDefaultPosition: function() { return { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight }; },
          getOrientation: function() { return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'; }
        };
        
        window.dapi = {
          addEventListener: function() {}, removeEventListener: function() {},
          isReady: function() { return true; },
          getScreenSize: function() { return { width: window.innerWidth, height: window.innerHeight }; },
          openStoreUrl: function() { window.showStoreNotification(); },
          playVideo: function() {}
        };
        
        window.FbPlayableAd = { onCTAClick: function() { window.showStoreNotification(); } };
        window.UnityLoader = {};
      })();
    `;
    // Insert script into iframe head or body
    const target = doc.head || doc.body;
    if (target) {
      target.insertBefore(script, target.firstChild);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Delay iframe loading for smooth animation
  useEffect(() => {
    if (project) {
      setLoadIframe(false);
      const timer = setTimeout(() => {
        setLoadIframe(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [project]);

  // Reload iframe
  const reloadAd = () => {
    if (iframeRef.current) {
      iframeRef.current.src = project.url;
      if (onReload && project.name) {
        onReload(project.name);
      }
    }
  };

  // Toggle orientation
  const toggleOrientation = () => {
    setIsPortrait(!isPortrait);
    if (onRotation && project.name) {
      onRotation(project.name);
    }
    
    // Force reload for this specific playable
    if (project.name === 'Rembo') {
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = project.url;
        }
      }, 100);
      return;
    }
    
    // Trigger resize event 100ms after orientation change
    setTimeout(() => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        // Temporarily increase size by 2px to trigger resize
        const iframe = iframeRef.current;
        const originalWidth = iframe.style.width;
        const originalHeight = iframe.style.height;
        
        iframe.style.width = `calc(100% + 2px)`;
        iframe.style.height = `calc(100% + 2px)`;
        
        // Return back after 50ms
        setTimeout(() => {
          iframe.style.width = originalWidth;
          iframe.style.height = originalHeight;
          
          // Dispatch resize event to iframe
          try {
            iframe.contentWindow.dispatchEvent(new Event('resize'));
          } catch (e) {
            // Silent fail
          }
        }, 50);
      }
    }, 100);
  };

  // iPhone 17 Pro dimensions
  const phoneWidth = isPortrait ? 393 : 852;
  const phoneHeight = isPortrait ? 852 : 393;

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className={`modal-content ${isMobile ? 'mobile' : 'desktop'}`}
            initial={
              isMobile
                ? { scale: 0.8, opacity: 0 }
                : {
                    scale: 0.2,
                    opacity: 0,
                  }
            }
            animate={
              isMobile
                ? { scale: 1, opacity: 1 }
                : { scale: 1, opacity: 1 }
            }
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            {/* iPhone Frame */}
            <div
              className={`iphone-frame ${isPortrait ? 'portrait' : 'landscape'}`}
              style={{
                width: `${phoneWidth}px`,
                height: `${phoneHeight}px`,
              }}
            >
              {/* Status Bar */}
              <StatusBar />
              
              {/* Dynamic Island */}
              <div className="dynamic-island"></div>

              {/* Screen */}
              <div className="iphone-screen">
                {loadIframe && (
                  <iframe
                    ref={iframeRef}
                    className="playable-iframe"
                    src={project.url}
                    title={project.name}
                    onLoad={() => injectMockScript(iframeRef.current)}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope"
                    allowFullScreen
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
                  />
                )}
              </div>

              {/* Buttons (desktop only) */}
              {!isMobile && (
                <>
                  <button
                    className="reload-button"
                    onClick={reloadAd}
                    title="Reload ad"
                  >
                    ↻
                  </button>

                  <button
                    className="orientation-button"
                    onClick={toggleOrientation}
                    title="Change orientation"
                  >
                    ⟲
                  </button>
                </>
              )}

              {/* Close Button */}
              <button className="close-button" onClick={onClose} title="Закрыть">
                ✕
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
