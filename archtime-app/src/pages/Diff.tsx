import DiffView from '../components/DiffView';

export default function Diff() {
  return (
    <div className="h-full overflow-y-auto" style={{ background: '#050505' }}>
      <DiffView inline />
    </div>
  );
}
