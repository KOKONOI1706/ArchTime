import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell';
import Overview from './pages/Overview';
import Timeline from './pages/Timeline';
import Architecture from './pages/Architecture';
import ArchitecturalChanges from './pages/ArchitecturalChanges';
import Evidence from './pages/Evidence';
import AIAnalyst from './pages/AIAnalyst';
import Settings from './pages/Settings';
import Onboarding from './pages/Onboarding';

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/"             element={<Overview />} />
          <Route path="/timeline"     element={<Timeline />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/changes"      element={<ArchitecturalChanges />} />
          <Route path="/evidence"     element={<Evidence />} />
          <Route path="/analyst"      element={<AIAnalyst />} />
          <Route path="/settings"     element={<Settings />} />
          <Route path="/onboarding"   element={<Onboarding />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
