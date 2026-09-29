import React, { useState } from 'react';
import { MapPin, Navigation, Compass, ArrowRight } from 'lucide-react';
import { TravelService } from '../types';

interface DestinationNetworkProps {
  onRouteSelect: (from: string, to: string, service: TravelService) => void;
}

export const DestinationNetwork: React.FC<DestinationNetworkProps> = ({ onRouteSelect }) => {
  const [selectedHub, setSelectedHub] = useState<string>('DELHI');

  // Hub network connectivity graph
  const hubs = [
    { id: 'DELHI', label: 'Delhi NCR Hub', x: 260, y: 120, tag: 'Primary Hub', services: ['Flights', 'Buses', 'Cars', 'Coaches', 'Rail'] },
    { id: 'JAIPUR', label: 'Jaipur', x: 210, y: 160, tag: 'Expressway Route', services: ['Buses', 'Car Rentals', 'Flights'] },
    { id: 'CHANDIGARH', label: 'Chandigarh', x: 250, y: 80, tag: 'North Corridor', services: ['Cars', 'Rail', 'Buses'] },
    { id: 'LUCKNOW', label: 'Lucknow', x: 340, y: 160, tag: 'East Express Corridor', services: ['Rail', 'Buses', 'Flights'] },
    { id: 'MUMBAI', label: 'Mumbai', x: 170, y: 280, tag: 'Financial Trunk', services: ['Flights', 'Rail', 'Coaches'] },
    { id: 'BANGALORE', label: 'Bengaluru', x: 250, y: 390, tag: 'Tech Corridor', services: ['Flights', 'Rail'] },
    { id: 'GOA', label: 'Goa', x: 180, y: 340, tag: 'Leisure & Event Coast', services: ['Flights', 'Coaches'] },
    { id: 'HYDERABAD', label: 'Hyderabad', x: 270, y: 300, tag: 'Central Transit Hub', services: ['Flights', 'Rail'] },
    { id: 'KOLKATA', label: 'Kolkata', x: 440, y: 220, tag: 'Eastern Gateway', services: ['Flights', 'Rail'] },
  ];

  const connections = [
    { from: 'DELHI', to: 'JAIPUR' },
    { from: 'DELHI', to: 'CHANDIGARH' },
    { from: 'DELHI', to: 'LUCKNOW' },
    { from: 'DELHI', to: 'MUMBAI' },
    { from: 'MUMBAI', to: 'GOA' },
    { from: 'MUMBAI', to: 'HYDERABAD' },
    { from: 'HYDERABAD', to: 'BANGALORE' },
    { from: 'DELHI', to: 'KOLKATA' },
    { from: 'KOLKATA', to: 'HYDERABAD' },
  ];

  return (
    <section className="bg-[#051120] text-white py-16 sm:py-24 border-b border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-[#F4B942] uppercase mb-2 block">
              PAN INDIA TRAVEL NETWORK
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Interconnected Transit Corridors
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              A stylized visualization of key Indian transit hubs coordinated across air, rail, express buses, and executive charter services.
            </p>
          </div>

          <div className="text-xs text-slate-400">
            Interactive Node Map · Click hubs to view connections
          </div>
        </div>

        {/* Visual Network Grid: SVG Canvas + Details Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Stylized Network Canvas */}
          <div className="lg:col-span-8 bg-[#08182E] border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center">
            
            <svg
              viewBox="100 40 400 400"
              className="w-full h-full max-h-[460px] select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Connection Lines */}
              {connections.map((conn, idx) => {
                const hubA = hubs.find((h) => h.id === conn.from);
                const hubB = hubs.find((h) => h.id === conn.to);
                if (!hubA || !hubB) return null;
                const isHighlighted = selectedHub === conn.from || selectedHub === conn.to;
                return (
                  <g key={idx}>
                    <line
                      x1={hubA.x}
                      y1={hubA.y}
                      x2={hubB.x}
                      y2={hubB.y}
                      stroke={isHighlighted ? '#146EF5' : '#1E3A5F'}
                      strokeWidth={isHighlighted ? '2' : '1'}
                      strokeDasharray={isHighlighted ? 'none' : '4 4'}
                    />
                    {isHighlighted && (
                      <circle
                        cx={(hubA.x + hubB.x) / 2}
                        cy={(hubA.y + hubB.y) / 2}
                        r="2.5"
                        fill="#F4B942"
                      />
                    )}
                  </g>
                );
              })}

              {/* Hub Nodes */}
              {hubs.map((hub) => {
                const isSelected = selectedHub === hub.id;
                return (
                  <g
                    key={hub.id}
                    onClick={() => setSelectedHub(hub.id)}
                    className="cursor-pointer transition-transform hover:scale-110"
                  >
                    {/* Pulsing ring for selected */}
                    {isSelected && (
                      <circle
                        cx={hub.x}
                        cy={hub.y}
                        r="14"
                        fill="#146EF5"
                        opacity="0.25"
                        className="animate-ping"
                      />
                    )}
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r={isSelected ? '8' : '6'}
                      fill={isSelected ? '#146EF5' : '#3B82F6'}
                      stroke="#FFFFFF"
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                    />
                    <text
                      x={hub.x + 12}
                      y={hub.y + 4}
                      fill={isSelected ? '#F4B942' : '#E2E8F0'}
                      fontSize="9.5"
                      fontFamily="'Inter', sans-serif"
                      fontWeight={isSelected ? '700' : '500'}
                    >
                      {hub.id}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="absolute bottom-3 left-4 text-[10px] text-slate-500">
              *Stylized schematic map representing travel corridors; not geographical bounds.
            </div>
          </div>

          {/* Right Panel: Selected Hub Details */}
          <div className="lg:col-span-4 bg-[#0B1E36] border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-6">
            {(() => {
              const current = hubs.find((h) => h.id === selectedHub) || hubs[0];
              return (
                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-semibold text-[#F4B942] uppercase tracking-wider block">
                      {current.tag}
                    </span>
                    <h3 className="text-2xl font-extrabold text-white mt-1">
                      {current.label}
                    </h3>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="text-slate-400 font-medium">Supported Services:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {current.services.map((srv, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-slate-800 text-slate-200 rounded-md border border-slate-700 font-medium"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    Connecting daily travelers and groups between {current.id} and capital terminals with real-time human assistance.
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onRouteSelect('Delhi', current.label, 'buses')}
                      className="w-full py-3 bg-[#146EF5] hover:bg-[#0E5AD0] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-transform active:scale-95"
                    >
                      <span>Search Travel to {current.id}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>

        </div>

      </div>
    </section>
  );
};
