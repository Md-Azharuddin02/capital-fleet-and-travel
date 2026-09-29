import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { businessConfig, getWhatsAppUrl, generateGeneralMessage } from '../data/travelData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
      {/* Friendly Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#071A2F] text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xl border border-slate-700 select-none animate-fadeIn">
          <span>Need help planning your trip? 💬</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getWhatsAppUrl(generateGeneralMessage())}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl animate-gentle-pulse transition-transform hover:scale-105 active:scale-95 cursor-pointer relative"
        aria-label="Chat with Capital Fleet & Travels on WhatsApp"
        title={`Chat on WhatsApp (${businessConfig.whatsappDisplay})`}
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-white" />
      </a>
    </div>
  );
};
