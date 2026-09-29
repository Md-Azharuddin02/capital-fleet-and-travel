import React from 'react';
import { BrandLogo } from './BrandLogo';
import { TravelService } from '../types';
import { businessConfig, getWhatsAppUrl, generateGeneralMessage } from '../data/travelData';
import { MessageCircle, ShieldCheck, MapPin, ExternalLink, Phone, Mail, Globe } from 'lucide-react';

interface FooterProps {
  onSelectService: (service: TravelService) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectService }) => {
  const handleServiceClick = (srv: TravelService) => {
    onSelectService(srv);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040C17] text-white border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand Lockup & Direct Contact */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <BrandLogo variant="emblem" size="sm" />
              <div className="space-y-1">
                <BrandLogo variant="horizontal" theme="dark" size="sm" />
                <p className="text-[10px] text-slate-400 font-semibold tracking-widest uppercase">
                  {businessConfig.tagline}
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Consolidated travel command platform engineered for personal, corporate, and group mobility across India.
            </p>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href={getWhatsAppUrl(generateGeneralMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold rounded-xl transition-transform active:scale-95 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {businessConfig.whatsappDisplay}</span>
              </a>

              <a
                href={businessConfig.phoneCallUrl}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-medium rounded-xl transition-colors border border-slate-700"
              >
                <Phone className="w-3.5 h-3.5 text-[#F4B942]" />
                <span>Call Us</span>
              </a>
            </div>

            {/* Direct Contact Details */}
            <div className="space-y-1.5 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F4B942] shrink-0" />
                <a
                  href={businessConfig.emailUrl}
                  className="hover:text-white hover:underline text-slate-300 transition-colors"
                >
                  {businessConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a
                  href={businessConfig.websiteUrl}
                  className="hover:text-white hover:underline text-slate-300 transition-colors"
                >
                  {businessConfig.domain}
                </a>
              </div>
              <div className="flex items-start gap-2 text-slate-300 text-xs pt-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <a
                  href={businessConfig.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline text-slate-300 transition-colors leading-relaxed"
                  title="View on Google Maps"
                >
                  {businessConfig.address}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4B942]">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => handleServiceClick('buses')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Bus Ticket Booking
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleServiceClick('cars')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Car Rental (Delhi NCR)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleServiceClick('coaches')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Coach / Bus Rental Charter
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleServiceClick('flights')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Air Ticketing (Domestic & Intl)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleServiceClick('corporate')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Corporate Travel Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleServiceClick('trains')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Rail Ticket Booking
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4B942]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#search-module" className="hover:text-white transition-colors">
                  Booking Engine
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl(generateGeneralMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Contact via WhatsApp</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Coverage Areas */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4B942]">
              Operational Coverage
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="font-bold text-white block">PAN INDIA</span>
                <span className="text-[11px] text-slate-400">
                  Flights, Intercity Buses, Tour Coaches, and Rail Ticketing nationwide.
                </span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="font-bold text-white block">DELHI NCR</span>
                <span className="text-[11px] text-slate-400">
                  Dedicated Chauffeur Car Rentals, Aerocity Airport Transfers, and Local Packages.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} CAPITAL FLEET & TRAVELS. All rights reserved.
          </div>
          <div className="text-[11px] text-slate-400 text-center sm:text-right">
            Indicative options displayed · Final tickets, seat allocations & invoices confirmed directly by our travel desk.
          </div>
        </div>

      </div>
    </footer>
  );
};
