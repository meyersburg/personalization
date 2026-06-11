import { useState } from 'react';
import LeadForm from '../components/LeadForm';
import PersonalizedHero from '../components/PersonalizedHero';
import InventoryGrid from '../components/InventoryGrid';
import CustomerCard from '../components/CustomerCard';
import { useApp } from '../context/AppContext';
import { enrichLead } from '../services/faraday';
import { derivePrefs, selectCreative, rankInventory, buildRationale } from '../services/personalization';
import VehicleCard from '../components/VehicleCard';
import { inventory } from '../data/inventory';
import defaultHero from '../assets/hero_images/default_hero.jpg';
import logo1 from '../assets/Icons/Monster.png';

const HERO_URL = defaultHero;
const DEFAULT_VEHICLES = inventory.slice(0, 3).map(v => ({ ...v, score: 0 }));

export default function CustomerPage() {
  const { leadData, personalization, setLeadData, setEnrichment, setPersonalization } = useApp();
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCard, setShowCard] = useState(false);

  async function handleSubmit(formData, shopperEnrichment = null, useOverrides = false) {
    setSubmitting(true);
    try {
      const result = shopperEnrichment
        ? { data: shopperEnrichment, source: 'shopper' }
        : useOverrides
        ? { data: {
              vehicle_purchaser_likelihood:           100,
              vehicle_1_style:                        formData.category,
              new_luxury_vehicle_purchaser_likelihood: formData.luxury      ? 100 : 0,
              electric_vehicle_purchase_likelihood:   formData.electric    ? 100 : 0,
              vehicle_performance_upgrade_likelihood: formData.performance  ? 100 : 0,
            }, source: 'override' }
        : await enrichLead(formData);
      const enrichmentData = result.data;

      const prefs = derivePrefs(formData, enrichmentData);
      const creative = selectCreative(prefs.category);
      const rankedInventory = rankInventory(prefs, prefs.category);
      const rationale = buildRationale(formData, enrichmentData, prefs, prefs.category, creative, rankedInventory);

      setLeadData(formData);
      setEnrichment({ data: enrichmentData, source: result.source });
      setPersonalization({ creative, rankedInventory, rationale });

      // Persist real Faraday results to the shoppers list (require at least 4 of 5 fields)
      const faradayFields = ['vehicle_1_style', 'vehicle_purchaser_likelihood', 'new_luxury_vehicle_purchaser_likelihood', 'electric_vehicle_purchase_likelihood', 'vehicle_performance_upgrade_likelihood'];
      const fieldsReturned = faradayFields.filter(f => enrichmentData[f] != null).length;
      if (import.meta.env.DEV && result.source !== 'shopper' && result.source !== 'override' && formData.firstName && fieldsReturned >= 4 && enrichmentData.vehicle_1_style != null) {
        const shopper = {
          id: `${formData.firstName}-${formData.lastName}-${Date.now()}`.toLowerCase().replace(/\s+/g, '-'),
          firstName: formData.firstName,
          lastName: formData.lastName,
          enrichment: enrichmentData,
        };
        fetch('/api/save-shopper', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(shopper),
        }).catch(() => {}); // fire-and-forget
      }
    } catch (err) {
      console.error('Enrichment failed:', err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-bold text-gray-900 text-2xl">Chittenden Auto Group</span>
          <a href="/" onClick={e => { e.preventDefault(); window.location.reload(); }}>
            <img src={logo1} alt="Logo option 1" className="h-10 w-auto" />
          </a>
        </div>
        {leadData && (
          <button
            onClick={() => setShowCard(c => !c)}
            className="text-xs font-medium text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors"
          >
            Customer Card
          </button>
        )}
        {showCard && <CustomerCard onClose={() => setShowCard(false)} />}
      </nav>

      {/* Loading overlay */}
      {submitting && (
        <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur flex flex-col items-center justify-center gap-4">
          <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Personalizing your experience…</p>
        </div>
      )}

      {/* Homepage hero */}
      {!personalization && !submitting && (
        <div className="relative w-full h-[580px] overflow-hidden">
          <img src={HERO_URL} alt="Chittenden Auto Group" className="w-full h-full object-cover object-[center_75%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-12 max-w-2xl">
           <h1 className="text-white text-5xl font-bold leading-tight mb-4">Find Your Perfect Drive</h1>
            <p className="text-white/80 text-lg mb-8">
              Tell us a little about yourself and we'll match you with the right vehicle for your lifestyle and budget.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="w-fit bg-white text-gray-900 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Personalize My Experience
            </button>
          </div>
        </div>
      )}

      {/* Default vehicle cards */}
      {!personalization && !submitting && (
        <div className="max-w-6xl mx-auto px-6 py-10">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">Featured Vehicles</p>
          <div className="grid grid-cols-3 gap-6">
            {DEFAULT_VEHICLES.map(v => <VehicleCard key={v.id} vehicle={v} />)}
          </div>
        </div>
      )}

      {/* Lead form modal */}
      {showModal && !personalization && (
        <LeadForm onSubmit={handleSubmit} onClose={() => setShowModal(false)} />
      )}

      {/* Personalized experience */}
      {personalization && (
        <>
          <PersonalizedHero />
          <InventoryGrid />
        </>
      )}

    </div>
  );
}
