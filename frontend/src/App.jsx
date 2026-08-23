import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { MessageAnalysis } from './pages/MessageAnalysis';
import { URLAnalysis } from './pages/URLAnalysis';
import { History } from './pages/History';
import { SafetyTips } from './pages/SafetyTips';
import { About } from './pages/About';
import { Settings } from './pages/Settings';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analyze-message" element={<MessageAnalysis />} />
          <Route path="analyze-url" element={<URLAnalysis />} />
          <Route path="history" element={<History />} />
          <Route path="safety-tips" element={<SafetyTips />} />
          <Route path="about" element={<About />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
