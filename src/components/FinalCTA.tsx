import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { businessConfig, getWhatsAppUrl, generateGeneralMessage } from '../data/travelData';

interface FinalCTAProps {
  onStartBooking: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStartBooking }) => {
  return (
    <section className="bg-gradient-to-br from-[#071A2F] via-[#0B2544] to-[#071A2F] text-white py-16 sm:py-24 border-b border-slate-800 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs font-bold tracking-widest text-[#F4B942] uppercase block">
          READY WHEN YOU ARE
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
          YOUR NEXT JOURNEY STARTS HERE.
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Flights, buses, cars, coaches and rail—tell us where you're going, and we'll help you plan the way there.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <button
            type="button"
            onClick={onStartBooking}
            className="px-7 py-3.5 bg-[#146EF5] hover:bg-[#0E5AD0] text-white text-sm sm:text-base font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
          >
            <span>Start Booking</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={getWhatsAppUrl(generateGeneralMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm sm:text-base font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Travel Team</span>
          </a>
        </div>
      </div>
    </section>
  );
};
