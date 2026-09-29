import React from 'react';
import { TravelService } from '../types';
import { Plane, Bus, Car, Users, Train, Building2, ArrowRight } from 'lucide-react';

interface ServiceDiscoveryProps {
  onSelectService: (service: TravelService) => void;
}

export const ServiceDiscovery: React.FC<ServiceDiscoveryProps> = ({ onSelectService }) => {
  const services = [
    {
      id: 'flights' as TravelService,
      title: 'FLIGHTS',
      badge: 'Domestic + International',
      subtitle: 'Worldwide & Interstate Aviation Ticketing',
      description: 'Access scheduled commercial flights, corporate seat bookings, and international connections with clear luggage guidelines and direct airline confirmation.',
      cta: 'Explore Flights',
      accentColor: 'from-blue-600 to-indigo-900',
      icon: Plane,
      visualType: 'flight',
    },
    {
      id: 'buses' as TravelService,
      title: 'BUS TICKETS',
      badge: 'PAN India Network',
      subtitle: 'Intercity AC Sleeper & Seater Coaches',
      description: 'Connect across India’s expressway grid. Choose premium Volvo 9600 sleepers, electric transit buses, and verified scheduled operators with GPS tracking.',
      cta: 'Search Buses',
      accentColor: 'from-emerald-700 to-teal-950',
      icon: Bus,
      visualType: 'bus',
    },
    {
      id: 'cars' as TravelService,
      title: 'CAR RENTAL',
      badge: 'Delhi NCR Specialized',
      subtitle: 'Executive Sedans, SUVs & Chauffeur Services',
      description: 'Reliable mobility across Delhi, Gurgaon, Noida, and Aerocity. Available for local 8h/80km daily hire, airport terminal transfers, and outstation trips.',
      cta: 'Find a Car',
      accentColor: 'from-amber-600 to-slate-900',
      icon: Car,
      visualType: 'car',
    },
    {
      id: 'coaches' as TravelService,
      title: 'COACH / BUS RENTAL',
      badge: 'PAN India Group Charters',
      subtitle: '12 to 50-Seater Deluxe & Luxury Coaches',
      description: 'Turnkey group transport for destination weddings, corporate summits, school tours, and family holidays with licensed chauffeurs and tourist permits.',
      cta: 'Rent a Coach',
      accentColor: 'from-rose-600 to-red-950',
      icon: Users,
      visualType: 'coach',
    },
    {
      id: 'trains' as TravelService,
      title: 'RAIL TICKETS',
      badge: 'PAN India Assistance',
      subtitle: 'Vande Bharat, Rajdhani & Express Facilitation',
      description: 'Hassle-free rail enquiry and booking facilitation for India’s premier passenger trains. Direct assistance with quota options and journey schedules.',
      cta: 'Book Rail Ticket',
      accentColor: 'from-sky-600 to-slate-900',
      icon: Train,
      visualType: 'train',
    },
    {
      id: 'corporate' as TravelService,
      title: 'CORPORATE TRAVEL',
      badge: 'Enterprise Mobility',
      subtitle: 'Business Travel Coordination & Fleet Management',
      description: 'Consolidated corporate logistics for HR, admin, and procurement teams. GST compliant invoicing, dedicated account managers, and priority vehicle dispatch.',
      cta: 'Corporate Enquiry',
      accentColor: 'from-slate-800 to-slate-950',
      icon: Building2,
      visualType: 'corporate',
    },
  ];

  const handleCardClick = (srvId: TravelService) => {
    onSelectService(srvId);
    const searchSection = document.getElementById('search-module');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="bg-[#F7F9FC] py-16 sm:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-widest text-[#146EF5] uppercase mb-2 block">
            SERVICE DISCOVERY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A2F] tracking-tight">
            Integrated Travel Services
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            Whether booking an individual flight or mobilizing a 200-person corporate conference, our desks are configured for your journey.
          </p>
        </div>

        {/* 6 Cards Grid (Distinctive Visual Treatments) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-400 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                {/* Visual Header Banner with thematic SVG Artwork */}
                <div className={`relative h-40 bg-gradient-to-br ${item.accentColor} p-5 flex flex-col justify-between text-white overflow-hidden`}>
                  
                  {/* Thematic SVG Graphic Silhouette */}
                  <div className="absolute right-2 -bottom-2 opacity-25 group-hover:scale-105 transition-transform duration-500 pointer-events-none">
                    <Icon className="w-28 h-28 text-white" />
                  </div>

                  <div className="flex items-center justify-between z-10">
                    <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 bg-black/30 backdrop-blur-xs rounded-full border border-white/20">
                      {item.badge}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-xs flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div className="z-10">
                    <h3 className="text-xl font-extrabold tracking-tight text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/80 font-medium">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleCardClick(item.id)}
                    className="w-full py-2.5 px-4 bg-slate-900 group-hover:bg-[#146EF5] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>{item.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
