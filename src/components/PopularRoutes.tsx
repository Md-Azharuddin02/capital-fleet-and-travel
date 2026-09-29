import React from 'react';
import { popularRoutes } from '../data/travelData';
import { TravelService } from '../types';
import { ArrowRight, MapPin, Compass } from 'lucide-react';

interface PopularRoutesProps {
  onSelectRoute: (route: {
    from: string;
    to: string;
    service: TravelService;
  }) => void;
}

export const PopularRoutes: React.FC<PopularRoutesProps> = ({ onSelectRoute }) => {
  return (
    <section className="bg-white py-14 sm:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-[#146EF5] uppercase mb-2 block">
              POPULAR SEARCHES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071A2F] tracking-tight">
              Frequently Planned Corridors
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Explore common journey routes connecting Delhi NCR with major commercial, cultural, and scenic hubs.
            </p>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Click any corridor to instantly prepare your travel search
          </div>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularRoutes.map((rt) => (
            <div
              key={rt.id}
              className="group bg-[#F7F9FC] border border-slate-200/90 hover:border-blue-400 hover:shadow-lg rounded-2xl p-5 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {rt.serviceType}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {rt.distance}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-lg sm:text-xl font-extrabold text-[#071A2F] mb-1.5 group-hover:text-blue-600 transition-colors">
                  <span>{rt.from}</span>
                  <ArrowRight className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>{rt.to}</span>
                </div>

                <div className="text-xs text-slate-500 mb-2 font-medium">
                  {rt.duration}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {rt.highlights}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-xs text-blue-600 font-semibold group-hover:underline">
                  {rt.context}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onSelectRoute({
                      from: rt.from,
                      to: rt.to,
                      service: rt.suggestedService,
                    })
                  }
                  className="px-3.5 py-1.5 bg-[#071A2F] group-hover:bg-[#146EF5] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Book Route</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
