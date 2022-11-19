import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import './index.css'
import { AuthProvider } from "../src/context/authContext";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
    </AuthProvider>
);

