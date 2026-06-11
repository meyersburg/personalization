import { creativeAssets } from '../data/creative.js';
import { inventory } from '../data/inventory.js';
import { FARADAY_FIELDS } from './faraday.js';

function mapStyleToCategory(style) {
  if (!style) return null;
  switch (style.toLowerCase()) {
    // vehicle_1_style values
    case 'sedan':        return 'sedan';
    case 'wagon':        return 'wagon';
    case 'hatchback':    return 'hatchback';
    case 'utility':      return 'suv';
    case 'pickup':       return 'truck';
    case 'van':          return 'minivan';
    case 'coupe 2 door':
    case 'convertible':  return 'sports';
    default:             return null;
  }
}

// Merge Faraday enrichment + form inputs into prefs.
// vehicle_category (10% populated) → vehicle_1_style mapping (60%) → form input
export function derivePrefs(leadData, enrichment) {
  const e = enrichment || {};

  const luxuryScore  = e[FARADAY_FIELDS.luxury]      ?? 0;
  const electricScore = e[FARADAY_FIELDS.electric]   ?? 0;
  const performScore = e[FARADAY_FIELDS.performance] ?? 0;

  const faradayCategory = mapStyleToCategory(e[FARADAY_FIELDS.style]);

  // Faraday returns scores as integers 0–100; threshold at 60
  return {
    category:    faradayCategory || leadData.category || 'any',
    luxury:      leadData.luxury      || luxuryScore    > 60,
    electric:    leadData.electric    || electricScore  > 60,
    performance: leadData.performance || performScore   > 60,
  };
}

// Roll any unmapped style variants up to a base creative
const CREATIVE_MAP = {};

// Pick creative based solely on category — tags never override the hero
export function selectCreative(category) {
  const creativeId = CREATIVE_MAP[category] || category;
  return creativeAssets.find(a => a.id === creativeId)
      || creativeAssets.find(a => a.id === 'default');
}

// Fisher-Yates shuffle
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Hard filter by category, score 0–3 by boolean flag matches,
// then shuffle within each score tier so tied vehicles rotate
export function rankInventory(prefs, category) {
  const pool = (category && category !== 'any')
    ? inventory.filter(v => v.category === category)
    : [...inventory];

  const scored = pool.map(vehicle => ({
    ...vehicle,
    score: (prefs.luxury      && vehicle.luxury      ? 1 : 0) +
           (prefs.electric    && vehicle.electric    ? 1 : 0) +
           (prefs.performance && vehicle.performance ? 1 : 0),
  }));

  // Group by score, shuffle each group, then reassemble high→low
  const groups = {};
  for (const v of scored) {
    (groups[v.score] = groups[v.score] || []).push(v);
  }
  return Object.keys(groups)
    .map(Number)
    .sort((a, b) => b - a)
    .flatMap(score => shuffle(groups[score]));
}

export function buildRationale(leadData, enrichment, prefs, category, creative, vehicles) {
  const e = enrichment || {};
  const topVehicles = vehicles.slice(0, 4);

  const vehicleRules = topVehicles.map(v => {
    const matched = [];
    if (prefs.luxury      && v.luxury)      matched.push('luxury');
    if (prefs.electric    && v.electric)    matched.push('electric');
    if (prefs.performance && v.performance) matched.push('performance');
    return `${v.name} (score ${v.score}${matched.length ? `: matched [${matched.join(', ')}]` : ''})`;
  });

  const talkingPoints = [];
  if ((e.new_vehicle_purchase_likelihood   || 0) > 0.6) talkingPoints.push('High new-vehicle propensity — lead with new inventory.');
  if ((e.online_vehicle_shopping_likelihood || 0) > 0.6) talkingPoints.push('Likely well-researched — skip basics, focus on differentiators.');
  if (prefs.electric)    talkingPoints.push('EV interest — highlight charging infrastructure and total cost of ownership.');
  if (prefs.luxury)      talkingPoints.push('Luxury propensity — offer premium trim walk-around.');
  if (prefs.performance) talkingPoints.push('Performance interest — lead with engine specs and driving dynamics.');

  return {
    activePrefs: prefs,
    category,
    selectedCreative: creative.id,
    creativeReason: [
      `Creative "${creative.id}" selected for category "${category}"`,
      prefs.electric    ? 'EV preference'          : null,
      prefs.luxury      ? 'luxury preference'       : null,
      prefs.performance ? 'performance preference'  : null,
    ].filter(Boolean).join(', ') + '.',
    vehicleRules,
    talkingPoints: talkingPoints.length ? talkingPoints : ['No specific signals — standard discovery conversation recommended.'],
  };
}
