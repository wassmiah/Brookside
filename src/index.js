import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Only import BrowserRouter
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App'; // App now contains all routes
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById("root"); 
if (!rootElement) {
  console.error("No root element found. Check index.html.");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

reportWebVitals();