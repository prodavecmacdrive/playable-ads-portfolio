// Функция для показа уведомления
function showStoreNotification() {
  const notification = document.createElement('div');
  notification.innerHTML = '🎮 Store redirect blocked (Portfolio mode)';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #FF6B35 0%, #9B59B6 100%);
    color: white;
    padding: 16px 32px;
    border-radius: 50px;
    font-family: 'Fixel', sans-serif;
    font-size: 16px;
    font-weight: 600;
    box-shadow: 0 10px 40px rgba(255, 107, 53, 0.4);
    z-index: 999999;
    animation: slideInBounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    pointer-events: none;
  `;
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInBounce {
      0% { transform: translateX(-50%) translateY(-100px); opacity: 0; }
      100% { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    @keyframes slideOut {
      0% { transform: translateX(-50%) translateY(0); opacity: 1; }
      100% { transform: translateX(-50%) translateY(-100px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.5s ease-in-out';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 2500);
}

// Mock для MRAID API
window.mraid = window.mraid || {
  addEventListener: function() {},
  removeEventListener: function() {},
  open: function(url) {
    showStoreNotification();
  },
  close: function() {},
  useCustomClose: function() {},
  expand: function() {},
  isViewable: function() { return true; },
  getState: function() { return 'default'; },
  getPlacementType: function() { return 'inline'; },
  getVersion: function() { return '3.0'; },
  supports: function() { return true; },
  playVideo: function() {},
  resize: function() {},
  storePicture: function() {},
  createCalendarEvent: function() {},
  getScreenSize: function() { 
    return { 
      width: window.innerWidth, 
      height: window.innerHeight 
    }; 
  },
  getMaxSize: function() { 
    return { 
      width: window.innerWidth, 
      height: window.innerHeight 
    }; 
  },
  getCurrentPosition: function() { 
    return { 
      x: 0, 
      y: 0, 
      width: window.innerWidth, 
      height: window.innerHeight 
    }; 
  },
  getDefaultPosition: function() { 
    return { 
      x: 0, 
      y: 0, 
      width: window.innerWidth, 
      height: window.innerHeight 
    }; 
  },
  getOrientation: function() { 
    return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'; 
  }
};

// Mock для DAPI (IronSource/Unity Ads)
window.dapi = window.dapi || {
  addEventListener: function() {},
  removeEventListener: function() {},
  isReady: function() { return true; },
  getScreenSize: function() { 
    return { 
      width: window.innerWidth, 
      height: window.innerHeight 
    }; 
  },
  openStoreUrl: function(url) {
    showStoreNotification();
  },
  playVideo: function() {}
};

// Mock для Facebook Playable Ads
window.FbPlayableAd = window.FbPlayableAd || {
  onCTAClick: function() {
    showStoreNotification();
  }
};

// Mock для Unity Ads
window.UnityLoader = window.UnityLoader || {};

// Полное подавление всех console методов
(function() {
  const noop = function() {};
  
  if (window.location.pathname.includes('/assets/playables/') || 
      document.querySelector('iframe[src*="/assets/playables/"]')) {
    window.console = {
      log: noop,
      warn: noop,
      error: noop,
      info: noop,
      debug: noop,
      trace: noop,
      dir: noop,
      dirxml: noop,
      group: noop,
      groupEnd: noop,
      time: noop,
      timeEnd: noop,
      assert: noop,
      profile: noop,
      clear: noop,
      table: noop,
      count: noop,
      groupCollapsed: noop
    };
  }
})();

// Подавление ошибок
(function() {
  const originalError = window.onerror;
  window.onerror = function(message, source, lineno, colno, error) {
    const msg = message.toString();
    if (
      msg.includes('mraid') ||
      msg.includes('dapi') ||
      msg.includes('FbPlayableAd') ||
      msg.includes('UnityLoader')
    ) {
      return true; // Подавить ошибку
    }
    if (originalError) {
      return originalError(message, source, lineno, colno, error);
    }
    return false;
  };
})();
