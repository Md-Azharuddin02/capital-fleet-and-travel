import React from 'react';
import { realReviewPlaceholders } from '../data/travelData';
import { MessageSquareQuote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-white py-16 sm:py-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-widest text-[#146EF5] uppercase mb-2 block">
            CLIENT EXPERIENCES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A2F] tracking-tight">
            Journeys Handled with Care
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Feedback and experiences shared by corporate managers, event coordinators, and travelers who rely on our direct booking desk.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {realReviewPlaceholders.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#F7F9FC] border border-slate-200/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <MessageSquareQuote className="w-8 h-8 text-blue-500 mb-4 opacity-70" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80">
                <div className="font-bold text-slate-900 text-sm">
                  {rev.customerName}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {rev.organization}
                </div>
                <div className="text-[11px] text-blue-700 font-semibold mt-1">
                  Service: {rev.serviceUsed}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
