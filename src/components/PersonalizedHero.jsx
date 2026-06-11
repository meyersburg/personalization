import { useApp } from '../context/AppContext';

export default function PersonalizedHero() {
  const { personalization, leadData } = useApp();
  if (!personalization) return null;

  const { creative } = personalization;
  const firstName = leadData?.firstName;

  return (
    <div className="relative w-full h-[480px] overflow-hidden">
      <img
        src={creative.image}
        alt="hero"
        className="w-full h-full object-cover"
        style={{ objectPosition: creative.objectPosition || 'center center' }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-center px-12 max-w-2xl">
        {firstName && (
          <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-3">
            Welcome, {firstName}
          </p>
        )}
        <h1 className="text-white text-5xl font-bold leading-tight mb-4 whitespace-pre-line">
          {creative.headline}
        </h1>
        <p className="text-white/80 text-lg mb-8">{creative.subhead}</p>
        <button
          onClick={() => window.location.reload()}
          className="w-fit bg-white text-gray-900 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors">
          Reset Variables
        </button>
      </div>
    </div>
  );
}
