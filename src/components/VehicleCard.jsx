export default function VehicleCard({ vehicle }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 flex flex-col">
      <div className="aspect-video overflow-hidden bg-gray-50">
        <img
          src={vehicle.image}
          alt={`${vehicle.year} ${vehicle.name}`}
          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-0.5">
          <div>
            <p className="text-xs text-gray-400 font-medium">{vehicle.year}</p>
            <h3 className="font-semibold text-gray-900 text-base leading-tight">{vehicle.name}</h3>
          </div>
          {vehicle.score > 0 && (
            <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-2 py-0.5 shrink-0 font-medium">
              Top Pick
            </span>
          )}
        </div>
        <p className="text-2xl font-bold text-gray-900 mt-1 mb-1">
          ${vehicle.price.toLocaleString()}
        </p>
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <span>{vehicle.miles.toLocaleString()} mi</span>
          <span className="text-gray-200">·</span>
          <span>{vehicle.fuelType}</span>
        </div>
        <div className="mt-auto">
          <button className="w-full bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium rounded-xl py-2.5 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
