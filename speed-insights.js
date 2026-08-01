// Vercel Speed Insights initialization
// This script injects the Speed Insights tracking code into the page

(function() {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return;

  // Initialize the Speed Insights queue
  window.si = window.si || function() {
    (window.siq = window.siq || []).push(arguments);
  };

  // Determine the appropriate script source
  var scriptSrc = '/_vercel/speed-insights/script.js';
  
  // Check if script is already loaded
  if (document.head.querySelector('script[src*="' + scriptSrc + '"]')) {
    return;
  }

  // Create and inject the Speed Insights script
  var script = document.createElement('script');
  script.src = scriptSrc;
  script.defer = true;
  script.dataset.sdkn = '@vercel/speed-insights';
  script.dataset.sdkv = '1.3.1';
  
  script.onerror = function() {
    console.log('[Vercel Speed Insights] Failed to load script from ' + scriptSrc + '. Please check if any content blockers are enabled and try again.');
  };
  
  document.head.appendChild(script);
})();
