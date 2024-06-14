import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId='915546874060-0d6afihafvf3p99at00k4ifq8jnlaloe.apps.googleusercontent.com'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
 <App />
    </GoogleOAuthProvider>;
   
  </React.StrictMode>
);


reportWebVitals();
