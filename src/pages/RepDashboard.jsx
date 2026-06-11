import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import EnrichmentCard from '../components/EnrichmentCard';
import FaradayToggle from '../components/FaradayToggle';

export default function RepDashboard() {
  const navigate = useNavigate();
  const { leadData, enrichment, personalization } = useApp();

  if (!leadData || !enrichment || !personalization) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-sm">No lead submitted yet.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-gray-700 transition-colors"
        >
          ← Go to Customer Page
        </button>
      </div>
    );
  }

  const { rationale, rankedInventory, creative } = personalization;
  const e = enrichment.data;

  const enrichmentKeys = Object.keys(e);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div>
          <span className="font-bold text-gray-900 text-lg">Chittenden Auto Group</span>
          <span className="ml-2 text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">Rep Intelligence</span>
        </div>
        <button
          onClick={() => navigate('/')}
          className="text-xs font-medium text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors"
        >
          ← Customer View
        </button>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Lead Summary */}
        <section>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Lead Summary</h2>
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {leadData.firstName} {leadData.lastName}
                </h3>
                <p className="text-gray-500 text-sm mt-0.5">{leadData.email}</p>
                <p className="text-gray-400 text-sm">
                  {leadData.address}, {leadData.city}, {leadData.state} {leadData.zip}
                </p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                enrichment.source === 'live'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {enrichment.source === 'live' ? 'LIVE ENRICHMENT' : 'MOCK ENRICHMENT'}
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-gray-100">
              {[
                { label: 'Category',    value: leadData.category    || 'Any' },
                { label: 'Luxury',      value: leadData.luxury      ? 'Yes' : 'No' },
                { label: 'Electric',    value: leadData.electric    ? 'Yes' : 'No' },
                { label: 'Performance', value: leadData.performance ? 'Yes' : 'No' },
                { label: 'Phone',       value: leadData.phone       || '—' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">{label}</p>
                  <p className="text-sm font-medium text-gray-800 mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enrichment Signals */}
        <section>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Faraday Enrichment Signals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {enrichmentKeys.map(key => (
              <EnrichmentCard key={key} fieldKey={key} value={e[key]} />
            ))}
          </div>
        </section>

        {/* Personalization Rationale */}
        <section>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Personalization Rationale</h2>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Active Preferences</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1 font-medium capitalize">
                  {rationale.category || 'any'}
                </span>
                {rationale.activePrefs.luxury      && <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1 font-medium">luxury</span>}
                {rationale.activePrefs.electric    && <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1 font-medium">electric</span>}
                {rationale.activePrefs.performance && <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1 font-medium">performance</span>}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Creative Selection</p>
              <p className="text-sm text-gray-700">{rationale.creativeReason}</p>
              <div className="mt-3 flex items-center gap-3">
                <img
                  src={creative.image}
                  alt={creative.id}
                  className="w-24 h-14 object-cover rounded-lg"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">"{creative.headline}"</p>
                  <p className="text-xs text-gray-500">{creative.subhead}</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Vehicle Surfacing Rules</p>
              <ul className="space-y-1">
                {rationale.vehicleRules.map((rule, i) => (
                  <li key={i} className="text-sm text-gray-700 flex gap-2">
                    <span className="text-gray-300 shrink-0">{i + 1}.</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Rep Action Notes */}
        <section>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Suggested Talking Points</h2>
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <ul className="space-y-3">
              {rationale.talkingPoints.map((point, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-700">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Top Recommended Vehicles */}
        <section>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Ranked Inventory (top 4)</h2>
          <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
            {rankedInventory.slice(0, 4).map((v, i) => (
              <div key={v.id} className="flex items-center gap-4 px-6 py-4">
                <span className="text-lg font-bold text-gray-200 w-6 shrink-0">{i + 1}</span>
                <img src={v.image} alt={v.name} className="w-16 h-10 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{v.name}</p>
                  <p className="text-xs text-gray-400">{v.specs}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-gray-900">${v.price.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">Score: {v.score}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <FaradayToggle />
    </div>
  );
}
