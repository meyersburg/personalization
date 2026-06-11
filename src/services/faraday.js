import { getMockEnrichment } from '../data/mockEnrichment.js';

// Field names as configured in the Faraday project dashboard.
// If the response fields don't match, check the console log on first call and update these.
export const FARADAY_FIELDS = {
  style:       'vehicle_1_style',
  purchaser:   'vehicle_purchaser_likelihood',
  luxury:      'new_luxury_vehicle_purchaser_likelihood',
  electric:    'electric_vehicle_purchase_likelihood',
  performance: 'vehicle_performance_upgrade_likelihood',
};

export async function enrichLead(leadData, mockMode = false) {
  if (mockMode) {
    await new Promise(r => setTimeout(r, 900));
    return getMockEnrichment(leadData);
  }

  const response = await fetch('/api/enrich', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email:      leadData.email,
      first_name: leadData.firstName,
      last_name:  leadData.lastName,
      address:    leadData.address,
      city:       leadData.city,
      state:      leadData.state,
      zip:        leadData.zip,
      phone:      leadData.phone,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Faraday API error ${response.status}: ${text}`);
  }

  const json = await response.json();
  const attributes = json.attributes || json;
  console.log('[Faraday] Attributes:', attributes);
  return { data: attributes, source: 'live' };
}
