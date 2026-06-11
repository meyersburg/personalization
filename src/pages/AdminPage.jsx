import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inventory } from '../data/inventory';

const imageModules = import.meta.glob('../assets/vehicles/*', { eager: true });

const FUEL_TYPES = ['Gasoline', 'Diesel', 'Hybrid', 'Electric', 'Plug-in Hybrid'];
const CATEGORIES = ['sedan', 'wagon', 'hatchback', 'suv', 'truck', 'minivan', 'sports'];

function toVarName(filename) {
  return filename
    .replace(/\.[^.]+$/, '')
    .split(/[-_]/)
    .map((w, i) => i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1))
    .join('') + 'Img';
}

function toId(name, year) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + year;
}

export default function AdminPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    year: new Date().getFullYear(),
    name: '',
    price: '',
    miles: '',
    fuelType: 'Gasoline',
    imageKey: '',
    category: 'passenger',
    luxury: false,
    electric: false,
    performance: false,
  });
  const [status, setStatus] = useState(null); // null | 'saving' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const imageKeys = Object.keys(imageModules).sort();

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('saving');
    setErrorMsg('');

    const filename = form.imageKey.split('/').pop();
    const varName = toVarName(filename);
    const id = toId(form.name, form.year);

    const importLine = `import ${varName} from '../assets/vehicles/${filename}';`;
    const entryCode = [
      `  {`,
      `    id: '${id}',`,
      `    year: ${form.year},`,
      `    name: '${form.name}',`,
      `    price: ${form.price},`,
      `    miles: ${form.miles},`,
      `    fuelType: '${form.fuelType}',`,
      `    image: ${varName},`,
      ``,
      `    category: '${form.category}',`,
      `    luxury: ${form.luxury},`,
      `    electric: ${form.electric},`,
      `    performance: ${form.performance},`,
      `  },`,
    ].join('\n');

    try {
      const res = await fetch('/api/add-vehicle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ importLine, entryCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');
      setStatus('success');
      setForm({ year: new Date().getFullYear(), name: '', price: '', miles: '', fuelType: 'Gasoline', imageKey: '', category: 'passenger', luxury: false, electric: false, performance: false });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
    }
  }

  const previewUrl = form.imageKey ? imageModules[form.imageKey]?.default : null;

  const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent';
  const labelClass = 'block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5';

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-bold text-gray-900 text-lg">Chittenden Auto Group</span>
          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md font-medium">Dev Tool</span>
        </div>
        <button
          onClick={() => navigate('/')}
          className="text-xs font-medium text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors"
        >
          ← Back to Site
        </button>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Add Vehicle</h1>
        <p className="text-sm text-gray-500 mb-8">Fill in the fields and click <strong>Add to Inventory</strong> — the entry will be written directly to <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">inventory.js</code> and the site will hot-reload.</p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">

          {/* Image picker */}
          <div>
            <label className={labelClass}>Vehicle Image</label>
            <select required className={inputClass} value={form.imageKey} onChange={e => set('imageKey', e.target.value)}>
              <option value="">— select from vehicles folder —</option>
              {imageKeys.map(key => (
                <option key={key} value={key}>{key.split('/').pop()}</option>
              ))}
            </select>
            {previewUrl && (
              <img src={previewUrl} alt="preview" className="mt-3 w-full rounded-xl object-contain max-h-48 bg-gray-50 border border-gray-100" />
            )}
          </div>

          <hr className="border-gray-100" />

          {/* Visible fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Year *</label>
              <input required type="number" className={inputClass} value={form.year}
                onChange={e => set('year', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Name *</label>
              <input required className={inputClass} placeholder="BMW 330i" value={form.name}
                onChange={e => set('name', e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Price ($) *</label>
              <input required type="number" className={inputClass} placeholder="53000" value={form.price}
                onChange={e => set('price', e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Miles *</label>
              <input required type="number" className={inputClass} placeholder="4" value={form.miles}
                onChange={e => set('miles', e.target.value)} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Fuel Type</label>
            <select className={inputClass} value={form.fuelType} onChange={e => set('fuelType', e.target.value)}>
              {FUEL_TYPES.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>

          <hr className="border-gray-100" />

          {/* Hidden / personalization fields */}
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Personalization Metadata</p>

          <div>
            <label className={labelClass}>Category</label>
            <select className={inputClass} value={form.category} onChange={e => set('category', e.target.value)}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex gap-6">
            {[['luxury', 'Luxury'], ['electric', 'Electric'], ['performance', 'Performance']].map(([field, label]) => (
              <label key={field} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form[field]}
                  onChange={e => set(field, e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 accent-gray-900"
                />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>

          <button type="submit" disabled={status === 'saving'}
            className="w-full bg-gray-900 hover:bg-gray-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
            {status === 'saving' ? 'Saving…' : 'Add to Inventory →'}
          </button>
        </form>

        {status === 'success' && (
          <div className="mt-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-5 py-4 text-sm font-medium">
            Vehicle added to inventory.js — Vite will hot-reload automatically.
          </div>
        )}

        {status === 'error' && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-800 rounded-xl px-5 py-4 text-sm">
            <span className="font-semibold">Error:</span> {errorMsg}
          </div>
        )}

        {/* Current inventory */}
        <div className="mt-10">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Current Inventory ({inventory.length})
          </p>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {inventory.map((v, i) => (
              <div key={v.id} className={`flex items-center gap-4 px-5 py-3.5 ${i < inventory.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <img src={v.image} alt={v.name} className="w-16 h-10 object-contain rounded-lg bg-gray-50 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{v.year} {v.name}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <p className="text-xs font-medium text-gray-500">{v.category}</p>
                  <div className="flex items-center gap-1.5">
                    {v.luxury      && <span className="text-xs bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-2.5 py-0.5 font-medium">luxury</span>}
                    {v.electric    && <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2.5 py-0.5 font-medium">electric</span>}
                    {v.performance && <span className="text-xs bg-red-50 text-red-700 border border-red-200 rounded-full px-2.5 py-0.5 font-medium">performance</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
