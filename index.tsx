import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const mountApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Mounting Error: #root not found. Retrying...");
    setTimeout(mountApp, 100);
    return;
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Start mounting process
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
