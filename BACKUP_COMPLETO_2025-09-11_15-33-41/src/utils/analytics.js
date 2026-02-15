// Analytics e métricas de performance
export const initAnalytics = () => {
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: document.title,
      page_location: window.location.href,
    })
  }
}

// Métricas de performance
export const trackPerformance = () => {
  if ('performance' in window) {
    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          console.log('FCP:', entry.startTime)
          // Enviar para analytics
        }
      })
    })
    
    fcpObserver.observe({ entryTypes: ['paint'] })
    
    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      console.log('LCP:', lastEntry.startTime)
    })
    
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
  }
}

// Error tracking
export const trackError = (error, errorInfo) => {
  console.error('Error:', error, errorInfo)
  
  // Enviar para serviço de monitoramento
  if (typeof window !== 'undefined' && window.Sentry) {
    window.Sentry.captureException(error, { extra: errorInfo })
  }
}

// User interactions
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

// Page views
export const trackPageView = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: url,
    })
  }
}

