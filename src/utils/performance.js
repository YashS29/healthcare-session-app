export const reportWebVitals = (metric) => {
    console.log(metric);
    
    // Send to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      });
    }
  };
  
  // Add to _app.js
  export { reportWebVitals } from '../utils/performance';