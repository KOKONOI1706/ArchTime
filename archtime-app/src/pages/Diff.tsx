// This page has been superseded by ArchitecturalChanges.tsx.
// Kept as a redirect stub.
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Diff() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/changes', { replace: true });
  }, [navigate]);
  return null;
}
