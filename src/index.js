// src/index.js (최종 수정본)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// === 경로가 정확히 수정된 부분 ===
import './styles/index.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
);