import { useApp } from '../context/AppContext';

const PROPENSITIES = [
  { label: 'Luxury',      field: 'new_luxury_vehicle_purchaser_likelihood' },
  { label: 'EV',          field: 'electric_vehicle_purchase_likelihood'    },
  { label: 'Performance', field: 'vehicle_performance_upgrade_likelihood'  },
];

function PropensityPill({ label, value }) {
  const num = value ?? null;
  const color = num === null
    ? 'bg-gray-100 text-gray-400'
    : num >= 70
    ? 'bg-emerald-100 text-emerald-700'
    : num >= 40
    ? 'bg-amber-100 text-amber-700'
    : 'bg-gray-100 text-gray-500';

  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-xs text-gray-400 font-medium">{label}</span>
      <span className={`text-sm font-bold px-3 py-1 rounded-full ${color}`}>
        {num ?? '—'}
      </span>
    </div>
  );
}

function PurchaserBadge({ value }) {
  if (value == null) return <p className="text-2xl font-bold text-gray-300">—</p>;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  const label = num >= 70 ? 'High' : num >= 40 ? 'Medium' : 'Low';
  const color = num >= 70 ? 'text-emerald-600' : num >= 40 ? 'text-amber-500' : 'text-gray-400';
  return (
    <div className="flex items-baseline gap-2">
      <p className={`text-3xl font-bold ${color}`}>{label}</p>
      <p className="text-sm text-gray-400">{num}</p>
    </div>
  );
}

export default function CustomerCard({ onClose }) {
  const { enrichment, leadData } = useApp();
  const e = enrichment?.data || {};

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div className="fixed top-16 right-4 z-50 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Lead Name</p>
            <p className="text-lg font-bold text-gray-900 mt-0.5">
              {leadData?.firstName} {leadData?.lastName}
            </p>
            {e.vehicle_purchaser_likelihood == null && (
              <p className="text-xs text-gray-400 mt-0.5">Identity not resolved</p>
            )}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-lg leading-none">✕</button>
        </div>

        <div className="px-5 py-4 space-y-4">
          {/* Propensity to Purchase */}
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Propensity to Purchase</p>
            <PurchaserBadge value={e.vehicle_purchaser_likelihood} />
          </div>

          <hr className="border-gray-100" />

          {/* Vehicle Category */}
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">Current Vehicle Category</p>
            <p className="text-lg font-semibold text-gray-900 capitalize">
              {e.vehicle_1_style || '—'}
            </p>
          </div>

          <hr className="border-gray-100" />

          {/* Propensities */}
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Attribute Propensities</p>
            <div className="flex justify-between">
              {PROPENSITIES.map(({ label, field }) => (
                <PropensityPill key={field} label={label} value={e[field]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
