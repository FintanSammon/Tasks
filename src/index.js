import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE5vsDLFQwWvBvuHCD1QO-sgr6Hf1G1b0",
  authDomain: "taskmanager-523b7.firebaseapp.com",
  projectId: "taskmanager-523b7",
  storageBucket: "taskmanager-523b7.appspot.com",
  messagingSenderId: "77800979133",
  appId: "1:77800979133:web:607df88fb4a57f3c7855d4",
  measurementId: "G-FLVVLGYLL6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
