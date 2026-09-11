import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell';
import Overview from './pages/Overview';
import Timeline from './pages/Timeline';
import Architecture from './pages/Architecture';
import Diff from './pages/Diff';
import Evidence from './pages/Evidence';
import AIAssistant from './pages/AIAssistant';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/diff" element={<Diff />} />
          <Route path="/evidence" element={<Evidence />} />
          <Route path="/ai" element={<AIAssistant />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
