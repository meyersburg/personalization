const FEC_API_KEY = import.meta.env.VITE_FEC_API_KEY || 'DEMO_KEY';
const BASE = 'https://api.open.fec.gov/v1';

export async function getRandomLead() {
  // Random page offset for variety
  const offset = Math.floor(Math.random() * 5000) * 20;

  const params = new URLSearchParams({
    api_key: FEC_API_KEY,
    per_page: 20,
    page: 1,
    offset,
    is_individual: true,
    min_amount: 200,
    // Filter for records that likely have complete address data
  });

  const res = await fetch(`${BASE}/schedules/schedule_a/?${params}`);
  if (!res.ok) throw new Error('FEC API unavailable');

  const json = await res.json();
  const results = json.results || [];

  // Find a result with complete name + address
  const candidate = results.find(
    r =>
      r.contributor_first_name &&
      r.contributor_last_name &&
      r.contributor_street_1 &&
      r.contributor_city &&
      r.contributor_state &&
      r.contributor_zip
  );

  if (!candidate) throw new Error('No complete record found in this page');

  return {
    firstName: titleCase(candidate.contributor_first_name),
    lastName: titleCase(candidate.contributor_last_name),
    address: titleCase(candidate.contributor_street_1),
    city: titleCase(candidate.contributor_city),
    state: candidate.contributor_state,
    zip: candidate.contributor_zip?.slice(0, 5),
  };
}

function titleCase(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
