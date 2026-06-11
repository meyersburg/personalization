import VehicleCard from './VehicleCard';
import { useApp } from '../context/AppContext';

export default function InventoryGrid() {
  const { personalization, leadData } = useApp();
  if (!personalization) return null;

  const topVehicles = personalization.rankedInventory.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topVehicles.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </section>
  );
}
