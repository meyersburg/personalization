import { useApp } from '../context/AppContext';

export default function FaradayToggle() {
  const { mockMode, setMockMode } = useApp();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-md text-xs font-medium cursor-pointer select-none"
      onClick={() => setMockMode(m => !m)}>
      <span className={`w-2 h-2 rounded-full ${mockMode ? 'bg-amber-400' : 'bg-green-500'}`} />
      <span className="text-gray-600">{mockMode ? 'MOCK DATA' : 'LIVE DATA'}</span>
    </div>
  );
}
