import React from 'react';
import { Bus, Car, Plane, Users, Train, Building2 } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const items = [
    { label: 'PAN INDIA BUS BOOKINGS', icon: Bus },
    { label: 'DELHI NCR CAR RENTALS', icon: Car },
    { label: 'DOMESTIC & INTERNATIONAL FLIGHTS', icon: Plane },
    { label: 'PAN INDIA COACH RENTALS', icon: Users },
    { label: 'PAN INDIA RAIL BOOKINGS', icon: Train },
    { label: 'CORPORATE TRAVEL SOLUTIONS', icon: Building2 },
  ];

  return (
    <section className="bg-[#051322] border-y border-slate-800 py-3.5 sm:py-4 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 overflow-x-auto no-scrollbar py-1">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2.5 text-xs sm:text-[13px] font-semibold tracking-wider text-slate-300 shrink-0 hover:text-white transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-slate-800/80 flex items-center justify-center text-blue-400">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span>{item.label}</span>
                {index < items.length - 1 && (
                  <span className="text-slate-600 ml-4 hidden lg:inline" aria-hidden="true">
                    /
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
