const FIELD_META = {
  vehicle_purchaser_likelihood: {
    label: 'Vehicle Purchase Likelihood',
    interpret: v => v > 0.7 ? 'Very high propensity to buy soon' : v > 0.4 ? 'Moderate purchase intent' : 'Low near-term intent',
  },
  electric_vehicle_purchase_likelihood: {
    label: 'EV Purchase Likelihood',
    interpret: v => v > 0.7 ? 'Strong EV interest — highlight electric inventory' : v > 0.4 ? 'Open to EVs' : 'Unlikely to consider EV',
  },
  luxury_vehicle_prospect_likelihood: {
    label: 'Luxury Vehicle Propensity',
    interpret: v => v > 0.6 ? 'Prime luxury buyer — offer premium walk-arounds' : v > 0.3 ? 'May consider entry-level luxury' : 'Price-sensitive buyer',
  },
  online_vehicle_shopping_likelihood: {
    label: 'Online Shopping Likelihood',
    interpret: v => v > 0.7 ? 'Highly researched buyer — skip basics' : v > 0.4 ? 'Does some research online' : 'May prefer in-person discovery',
  },
  vehicle_performance_upgrade_likelihood: {
    label: 'Performance Upgrade Propensity',
    interpret: v => v > 0.6 ? 'Interested in performance trims and accessories' : v > 0.3 ? 'Mild performance interest' : 'Not performance-driven',
  },
  new_vehicle_purchase_likelihood: {
    label: 'New Vehicle Preference',
    interpret: v => v > 0.6 ? 'Lead with new inventory' : v > 0.4 ? 'Open to new or used' : 'Strong used/CPO preference',
  },
  suv_purchase_likelihood: {
    label: 'SUV Purchase Likelihood',
    interpret: v => v > 0.6 ? 'Strong SUV preference' : v > 0.3 ? 'May consider SUV' : 'Unlikely to choose SUV',
  },
  truck_purchase_likelihood: {
    label: 'Truck Purchase Likelihood',
    interpret: v => v > 0.6 ? 'Strong truck buyer' : v > 0.3 ? 'May consider truck' : 'Not a truck buyer',
  },
  household_income_estimate: {
    label: 'Estimated Household Income',
    interpret: v => `${v}/year`,
    isText: true,
  },
  household_size_estimate: {
    label: 'Estimated Household Size',
    interpret: v => `~${v} person${v !== 1 ? 's' : ''}`,
    isText: true,
  },
  homeowner_likelihood: {
    label: 'Homeowner Likelihood',
    interpret: v => v > 0.6 ? 'Likely homeowner' : 'Likely renter',
  },
  credit_quality_estimate: {
    label: 'Credit Quality Estimate',
    interpret: v => `${v} — ${v === 'excellent' ? 'Best financing rates available' : v === 'good' ? 'Standard financing' : 'May need subprime options'}`,
    isText: true,
  },
  family_with_children_likelihood: {
    label: 'Family with Children',
    interpret: v => v > 0.6 ? 'Likely has kids — safety & space matter' : 'Probably no children at home',
  },
  outdoor_enthusiast_likelihood: {
    label: 'Outdoor Enthusiast',
    interpret: v => v > 0.5 ? 'Outdoor lifestyle — lead with capability & adventure' : 'Urban/suburban lifestyle',
  },
  environmentally_conscious_likelihood: {
    label: 'Eco-Conscious Buyer',
    interpret: v => v > 0.6 ? 'Values sustainability — highlight EV & hybrid options' : 'Not a primary eco buyer',
  },
  technology_early_adopter_likelihood: {
    label: 'Tech Early Adopter',
    interpret: v => v > 0.6 ? 'Tech enthusiast — lead with connectivity & driver-assist features' : 'Standard tech expectations',
  },
};

function signalColor(value, isText) {
  if (isText) return 'border-gray-200 bg-gray-50';
  if (value > 0.65) return 'border-emerald-200 bg-emerald-50';
  if (value > 0.4) return 'border-amber-200 bg-amber-50';
  return 'border-gray-200 bg-gray-50';
}

function signalDot(value, isText) {
  if (isText) return 'bg-gray-400';
  if (value > 0.65) return 'bg-emerald-500';
  if (value > 0.4) return 'bg-amber-400';
  return 'bg-gray-300';
}

export default function EnrichmentCard({ fieldKey, value }) {
  const meta = FIELD_META[fieldKey];
  if (!meta) return null;

  const isText = meta.isText || false;
  const displayValue = isText ? String(value) : `${Math.round(value * 100)}%`;

  return (
    <div className={`rounded-xl border p-4 ${signalColor(value, isText)}`}>
      <div className="flex items-start gap-2 mb-2">
        <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${signalDot(value, isText)}`} />
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide leading-tight">
          {meta.label}
        </span>
      </div>
      <p className="text-xl font-bold text-gray-900 mb-1">{displayValue}</p>
      <p className="text-sm text-gray-600">{meta.interpret(value)}</p>
    </div>
  );
}
