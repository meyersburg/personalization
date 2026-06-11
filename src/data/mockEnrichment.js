export const mockEnrichmentBase = {
  vehicle_purchaser_likelihood: 0.82,
  electric_vehicle_purchase_likelihood: 0.34,
  luxury_vehicle_prospect_likelihood: 0.21,
  online_vehicle_shopping_likelihood: 0.74,
  vehicle_performance_upgrade_likelihood: 0.18,
  new_vehicle_purchase_likelihood: 0.71,
  suv_purchase_likelihood: 0.65,
  truck_purchase_likelihood: 0.29,
  household_income_estimate: '75000-100000',
  household_size_estimate: 3,
  homeowner_likelihood: 0.68,
  credit_quality_estimate: 'good',
  family_with_children_likelihood: 0.72,
  outdoor_enthusiast_likelihood: 0.41,
  environmentally_conscious_likelihood: 0.38,
  technology_early_adopter_likelihood: 0.55,
};

export function getMockEnrichment(leadData) {
  const enrichment = { ...mockEnrichmentBase };

  const category = leadData.category || 'any';

  // When the user explicitly picks a category, boost matching signals and
  // suppress competing ones so the ranking reflects their stated intent.
  if (category === 'truck') {
    enrichment.truck_purchase_likelihood = 0.74;
    enrichment.outdoor_enthusiast_likelihood = 0.62;
    enrichment.suv_purchase_likelihood = 0.35;
    enrichment.family_with_children_likelihood = 0.45;
  } else if (category === 'suv') {
    enrichment.suv_purchase_likelihood = 0.81;
    enrichment.family_with_children_likelihood = 0.77;
  } else if (category === 'passenger' || category === 'sports') {
    enrichment.suv_purchase_likelihood = 0.35;
    enrichment.family_with_children_likelihood = 0.45;
  } else if (category === 'minivan') {
    enrichment.family_with_children_likelihood = 0.85;
    enrichment.suv_purchase_likelihood = 0.35;
  }

  if (leadData.electric) {
    enrichment.electric_vehicle_purchase_likelihood = 0.78;
    enrichment.environmentally_conscious_likelihood = 0.71;
  }
  if (leadData.luxury) {
    enrichment.luxury_vehicle_prospect_likelihood = 0.73;
    enrichment.household_income_estimate = '150000+';
  }

  return Promise.resolve({ data: enrichment, source: 'mock' });
}
