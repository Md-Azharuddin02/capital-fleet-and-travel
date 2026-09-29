import React from 'react';
import { Layers, Globe2, Car, Compass, Users2, MessageSquareText } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const WhyCapital: React.FC = () => {
  const pillars = [
    {
      icon: Layers,
      title: 'ONE TRAVEL PARTNER',
      description: 'Multiple travel services in one place. Book flights, interstate buses, local chauffeur cabs, tour coaches, and rail journeys from a single command point.',
    },
    {
      icon: Globe2,
      title: 'PAN INDIA COVERAGE',
      description: 'Comprehensive bus, coach charter, and rail booking support connecting tier-1 capitals, industrial corridors, and regional heritage destinations across India.',
    },
    {
      icon: Car,
      title: 'DELHI NCR MOBILITY',
      description: 'Dedicated car-rental operations centered across Delhi NCR, featuring airport terminal pickups at Aerocity, local 8h/80km packages, and outstation trips.',
    },
    {
      icon: Compass,
      title: 'DOMESTIC + INTERNATIONAL',
      description: 'Air ticketing for domestic trunk routes as well as worldwide international itineraries, with seat selection and baggage allowances confirmed directly.',
    },
    {
      icon: Users2,
      title: 'GROUP TRAVEL',
      description: 'Custom coach and bus rental for wedding guests, corporate offsites, educational tours, and delegations, spanning 12-seater to 50-seater multi-axle coaches.',
    },
    {
      icon: MessageSquareText,
      title: 'HUMAN ASSISTANCE',
      description: 'Customers speak directly with human travel specialists through WhatsApp for fast itinerary tweaks, custom route quotes, and personalized journey care.',
    },
  ];

  return (
    <section id="about" className="bg-[#071A2F] text-white py-16 sm:py-24 border-b border-slate-800 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Official Crest */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="flex justify-center mb-6">
            <BrandLogo variant="emblem" size="md" />
          </div>
          <span className="text-xs font-bold tracking-widest text-[#F4B942] uppercase mb-2 block">
            BUILT ON RELIABILITY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            TRAVEL WITH CONFIDENCE.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            A cohesive travel architecture combining versatile mobility assets, verified transport partners, and responsive personal coordination.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#0B1E36] border border-slate-800 hover:border-slate-700 rounded-2xl p-6 sm:p-7 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-[#146EF5] flex items-center justify-center mb-5 border border-blue-500/20">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-wide mb-2.5">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
