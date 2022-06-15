import { createRoot } from 'react-dom/client';
import React from 'react';
import './style/index.scss';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
