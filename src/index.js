import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App'; 
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