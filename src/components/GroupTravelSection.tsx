import React from 'react';
import { Users, HeartHandshake, GraduationCap, Building2, Trees, Landmark, PartyPopper, Compass, ArrowRight, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../data/travelData';

interface GroupTravelSectionProps {
  onPlanGroupClick: () => void;
}

export const GroupTravelSection: React.FC<GroupTravelSectionProps> = ({ onPlanGroupClick }) => {
  const useCases = [
    { title: 'Weddings & Celebrations', desc: 'Guest shuttles from airports to royal resorts in Rajasthan or Goa.', icon: HeartHandshake },
    { title: 'Corporate Offsites', desc: 'Air-conditioned Volvo charters for annual conferences and retreat venues.', icon: Building2 },
    { title: 'School & College Tours', desc: 'Verified speed-governed coaches with high-safety standards and background-checked drivers.', icon: GraduationCap },
    { title: 'Religious & Pilgrimage', desc: 'Custom sacred circuit itineraries across North and Central Indian shrines.', icon: Landmark },
    { title: 'Family Holidays', desc: 'Plush luxury Tempo Travellers for scenic Himachal and Uttarakhand getaways.', icon: Trees },
    { title: 'Event Delegations', desc: 'Sports squad transit and convention delegation logistics with luggage vans.', icon: PartyPopper },
  ];

  const waGroupMessage = `Hi CAPITAL FLEET & TRAVELS, I'm planning group transportation for an upcoming event/tour. I would like to explore coach rental options.`;

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Container */}
        <div className="bg-[#071A2F] rounded-3xl text-white overflow-hidden border border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Left Column: Copy & Highlights */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-widest text-[#F4B942] uppercase block">
                GROUP MOBILITY SPECIALISTS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                MOVING A GROUP? <br />
                <span className="text-blue-400">WE’VE GOT THE ROAD COVERED.</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Charter private luxury coaches and tempo travellers with all-India tourist permits. From 12-seater mini-vans to 50-seater multi-axle super-luxury highway coaches, we ensure seamless group logistics.
              </p>
            </div>

            {/* Use Case Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {useCases.slice(0, 4).map((uc, i) => {
                const Icon = uc.icon;
                return (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <Icon className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white">{uc.title}</div>
                      <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{uc.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onPlanGroupClick}
                className="px-6 py-3.5 bg-[#146EF5] hover:bg-[#0E5AD0] text-white font-bold text-sm rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
              >
                <span>Plan Group Travel</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={getWhatsAppUrl(waGroupMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer border border-slate-700"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Group Desk</span>
              </a>
            </div>
          </div>

          {/* Right Column: Stylized Coach Vector Showcase */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-[#0A223E] p-6 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800 relative">
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#F4B942] uppercase tracking-wider">
                PAN INDIA FLEET CAPACITIES
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Multi-Axle & Executive Comfort
              </h3>
            </div>

            {/* Coach Vector Graphic Silhouette */}
            <div className="my-8 py-6 px-4 bg-slate-950/40 rounded-2xl border border-slate-800 text-center relative overflow-hidden">
              <svg viewBox="0 0 340 120" className="w-full h-auto text-blue-400 drop-shadow-md" fill="none">
                {/* Modern Luxury Coach Outline */}
                <rect x="20" y="24" width="280" height="64" rx="14" fill="#0A2447" stroke="#1E5BB5" strokeWidth="2.5" />
                <path d="M20 54 L300 54" stroke="#DC2626" strokeWidth="3" />
                {/* Windshield */}
                <path d="M260 28 L294 36 L294 54 L260 54 Z" fill="#60A5FA" opacity="0.7" />
                {/* Passenger Panoramic Windows */}
                <rect x="36" y="32" width="28" height="18" rx="3" fill="#93C5FD" opacity="0.6" />
                <rect x="70" y="32" width="28" height="18" rx="3" fill="#93C5FD" opacity="0.6" />
                <rect x="104" y="32" width="28" height="18" rx="3" fill="#93C5FD" opacity="0.6" />
                <rect x="138" y="32" width="28" height="18" rx="3" fill="#93C5FD" opacity="0.6" />
                <rect x="172" y="32" width="28" height="18" rx="3" fill="#93C5FD" opacity="0.6" />
                <rect x="206" y="32" width="28" height="18" rx="3" fill="#93C5FD" opacity="0.6" />
                {/* Underbelly Luggage Hatches */}
                <rect x="60" y="62" width="45" height="18" rx="2" stroke="#475569" strokeWidth="1" />
                <rect x="115" y="62" width="45" height="18" rx="2" stroke="#475569" strokeWidth="1" />
                <rect x="170" y="62" width="45" height="18" rx="2" stroke="#475569" strokeWidth="1" />
                {/* Wheels */}
                <circle cx="70" cy="88" r="14" fill="#020617" stroke="#94A3B8" strokeWidth="2" />
                <circle cx="70" cy="88" r="6" fill="#CBD5E1" />
                <circle cx="230" cy="88" r="14" fill="#020617" stroke="#94A3B8" strokeWidth="2" />
                <circle cx="230" cy="88" r="6" fill="#CBD5E1" />
                <circle cx="264" cy="88" r="14" fill="#020617" stroke="#94A3B8" strokeWidth="2" />
                <circle cx="264" cy="88" r="6" fill="#CBD5E1" />
              </svg>
              <div className="text-[11px] text-slate-400 font-medium mt-2">
                Electronic Air-Suspension · Pushback Berthes · Dual AC Louvres
              </div>
            </div>

            {/* Quick stats checklist */}
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Available Sizes:</span>
                <span className="font-semibold text-white">12, 17, 26, 35, 45 & 50 Seaters</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-400">Coverage:</span>
                <span className="font-semibold text-white">PAN India All-States Permit</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Driver Experience:</span>
                <span className="font-semibold text-white">Hill & Highway Certified Chauffeurs</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
