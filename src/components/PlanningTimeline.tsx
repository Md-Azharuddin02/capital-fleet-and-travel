import React, { useState } from 'react';
import { Compass, Search, CheckSquare, MessageCircle, Navigation, ChevronRight } from 'lucide-react';

export const PlanningTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'PLAN',
      icon: Compass,
      tagline: 'Define your journey specifics',
      description: 'Select your service type, travel date, passenger count, and route preference—whether a flight across states or local airport car rental in Delhi NCR.',
    },
    {
      step: '02',
      title: 'SEARCH',
      icon: Search,
      tagline: 'Review filtered travel options',
      description: 'Our dynamic engine presents real-world carrier options, bus coach types, timings, indicative rates, and luggage capacities tailored to your itinerary.',
    },
    {
      step: '03',
      title: 'CHOOSE',
      icon: CheckSquare,
      tagline: 'Select the optimal vehicle or flight',
      description: 'Pick your preferred seat class, boarding terminal, pickup window, or bus operator without cumbersome multi-page forms.',
    },
    {
      step: '04',
      title: 'CONFIRM',
      icon: MessageCircle,
      tagline: 'Direct WhatsApp verification',
      description: 'Your details format automatically into WhatsApp. Our direct travel desk verifies seat availability, live airline manifests, or chauffeur details before billing.',
    },
    {
      step: '05',
      title: 'TRAVEL',
      icon: Navigation,
      tagline: 'Depart with complete confidence',
      description: 'Receive verified e-tickets, driver contact credentials, and vehicle registration well ahead of departure with 24/7 journey support.',
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs font-bold tracking-widest text-[#146EF5] uppercase mb-2 block">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A2F] tracking-tight mb-4">
            WHATEVER THE JOURNEY, WE’LL HELP YOU GET THERE.
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            A frictionless editorial flow engineered for speed, human accountability, and total transparency.
          </p>
        </div>

        {/* Interactive Step Strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#071A2F] text-white border-[#071A2F] shadow-lg scale-[1.02]'
                    : 'bg-[#F7F9FC] text-slate-800 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-[#F4B942]' : 'text-slate-400'}`}>
                    {st.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#146EF5]' : 'text-slate-500'}`} />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-extrabold tracking-tight">
                    {st.title}
                  </div>
                  <div className={`text-[11px] truncate mt-0.5 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                    {st.tagline}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Spotlight Card */}
        <div className="bg-[#0B1E36] text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#F4B942] uppercase tracking-wider">
              <span>STEP {steps[activeStep].step}</span>
              <span aria-hidden="true">·</span>
              <span>{steps[activeStep].title} PHASE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {steps[activeStep].tagline}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {steps[activeStep].description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
              className="px-5 py-3 bg-[#146EF5] hover:bg-[#0E5AD0] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>{activeStep === steps.length - 1 ? 'Start Over' : 'Next Step'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
