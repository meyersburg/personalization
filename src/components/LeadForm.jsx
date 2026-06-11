import { useState } from 'react';
import { getRandomLead } from '../services/fec';
import { shoppers } from '../data/shoppers';

const STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
];

const CATEGORIES = [
  { value: 'any',        label: 'No preference' },
  { value: 'sedan',      label: 'Sedan' },
  { value: 'wagon',      label: 'Wagon' },
  { value: 'hatchback',  label: 'Hatchback' },
  { value: 'suv',        label: 'SUV / Crossover' },
  { value: 'truck',      label: 'Truck / Pickup' },
  { value: 'minivan',    label: 'Minivan / Van' },
  { value: 'sports',     label: 'Sports / Coupe / Convertible' },
];

export default function LeadForm({ onSubmit, onClose }) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', address: '',
    city: '', state: '', zip: '', phone: '',
    category: 'any', luxury: false, electric: false, performance: false,
  });
  const [fecLoading, setFecLoading] = useState(false);
  const [fecError, setFecError] = useState('');
  const [fecUsed, setFecUsed] = useState(false);
  const [shopperSelected, setShopperSelected] = useState(false);
  const [showOverrides, setShowOverrides] = useState(false);

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleFec() {
    if (shoppers.length > 0) {
      const pick = shoppers[Math.floor(Math.random() * shoppers.length)];
      setForm(f => ({
        ...f,
        firstName: pick.firstName,
        lastName: pick.lastName,
        _shopperEnrichment: pick.enrichment,
      }));
      setShopperSelected(true);
      setFecUsed(true);
      return;
    }
    setFecLoading(true);
    setFecError('');
    try {
      const lead = await getRandomLead();
      setForm(f => ({ ...f, ...lead }));
      setFecUsed(true);
    } catch {
      setFecError('Could not load a random shopper. Try again.');
    } finally {
      setFecLoading(false);
    }
  }

  const hasOverrideCategory   = form.category !== 'any';
  const hasOverridePropensity = form.luxury || form.electric || form.performance;
  const overridesPartial      = hasOverrideCategory !== (!!hasOverridePropensity);
  const overridesActive       = hasOverrideCategory && hasOverridePropensity;

  function handleSubmit(e) {
    e.preventDefault();
    if (overridesPartial) return; // blocked by validation
    const { _shopperEnrichment, ...formData } = form;
    const useOverrides = overridesActive;
    onSubmit(formData, _shopperEnrichment || null, useOverrides);
  }

  const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:text-gray-300 disabled:bg-white disabled:cursor-default';
  const labelClass = 'block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5';

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Tell us about yourself</h2>
            </div>
            {onClose && (
              <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl font-light leading-none ml-4">✕</button>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>First Name</label>
              <input className={inputClass} placeholder="Jane" value={form.firstName}
                onChange={e => set('firstName', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Last Name</label>
              <input className={inputClass} placeholder="Smith" value={form.lastName}
                onChange={e => set('lastName', e.target.value)} />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" className={inputClass} placeholder="jane@example.com"
                value={shopperSelected ? 'hidden' : form.email}
                disabled={shopperSelected}
                onChange={e => set('email', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input type="tel" className={inputClass} placeholder="(555) 000-0000"
                value={shopperSelected ? 'hidden' : form.phone}
                disabled={shopperSelected}
                onChange={e => set('phone', e.target.value)} />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className={labelClass}>Street Address</label>
            <input className={inputClass} placeholder="123 Main St"
              value={shopperSelected ? 'hidden' : form.address}
              disabled={shopperSelected}
              onChange={e => set('address', e.target.value)} />
          </div>
          <div className="grid grid-cols-5 gap-3">
            <div className="col-span-2">
              <label className={labelClass}>City</label>
              <input className={inputClass} placeholder="Austin"
                value={shopperSelected ? 'hidden' : form.city}
                disabled={shopperSelected}
                onChange={e => set('city', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>State</label>
              <select className={inputClass}
                value={shopperSelected ? '' : form.state}
                disabled={shopperSelected}
                onChange={e => set('state', e.target.value)}>
                <option value="">{shopperSelected ? 'hidden' : '—'}</option>
                {!shopperSelected && STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className={labelClass}>ZIP</label>
              <input className={inputClass} placeholder="78701"
                value={shopperSelected ? 'hidden' : form.zip}
                disabled={shopperSelected}
                onChange={e => set('zip', e.target.value)} />
            </div>
          </div>

          {/* Random shopper */}
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleFec}
              disabled={fecLoading}
              className="w-full border-2 border-dashed border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors disabled:opacity-50"
            >
              {fecLoading ? 'Loading random shopper…' : '🎲 Use a random shopper'}
            </button>
            {fecUsed && (
              <p className="text-xs text-gray-400 text-center">Celeb info hidden, click Personalize</p>
            )}
            {fecError && <p className="text-xs text-red-500 text-center">{fecError}</p>}
          </div>

          {/* Data overrides — collapsible */}
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowOverrides(v => !v)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Personalization Data Overrides</span>
                <span className="text-xs text-gray-300">optional</span>
              </span>
              <span className="text-gray-400 text-xs">{showOverrides ? '▲' : '▼'}</span>
            </button>

            {showOverrides && (
              <div className="px-4 pb-4 space-y-4 border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-400">Bypass Faraday and drive results manually. Both fields required if either is set.</p>
                <div>
                  <label className={labelClass}>Vehicle Category</label>
                  <select className={inputClass} value={form.category} onChange={e => set('category', e.target.value)}>
                    {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Propensity Signals</label>
                  <div className="flex gap-2">
                    {[['luxury', 'Luxury'], ['electric', 'Electric'], ['performance', 'Performance']].map(([field, label]) => (
                      <button type="button" key={field}
                        onClick={() => set(field, !form[field])}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors
                          ${form[field]
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                {overridesPartial && (
                  <p className="text-xs text-amber-600">Set both a category and at least one propensity signal, or clear both.</p>
                )}
              </div>
            )}
          </div>

          <button type="submit"
            disabled={overridesPartial}
            className="w-full bg-gray-900 hover:bg-gray-700 disabled:opacity-40 text-white font-semibold py-3.5 rounded-xl text-base transition-colors">
            Personalize →
          </button>
        </form>
      </div>
    </div>
  );
}
