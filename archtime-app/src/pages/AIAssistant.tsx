// This page has been superseded by AIAnalyst.tsx.
// Kept as a redirect stub to avoid broken imports during transition.
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AIAssistant() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/analyst', { replace: true });
  }, [navigate]);
  return null;
}
