import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { MessageCircle, Menu, X, Clock, Phone } from 'lucide-react';
import { businessConfig, getWhatsAppUrl, generateGeneralMessage } from '../data/travelData';

interface HeaderProps {
  enquiryCount: number;
  onOpenMyEnquiries: () => void;
  onBookEnquireClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  enquiryCount,
  onOpenMyEnquiries,
  onBookEnquireClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookEnquire = () => {
    setMobileMenuOpen(false);
    if (onBookEnquireClick) {
      onBookEnquireClick();
    } else {
      const searchSection = document.getElementById('search-module');
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.open(getWhatsAppUrl(generateGeneralMessage()), '_blank');
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#071A2F]/95 backdrop-blur-md border-b border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        
        {/* Brand Zone: Only show the logo, remove the text */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('top');
          }}
          className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded transition-transform active:scale-95"
          aria-label="CAPITAL FLEET & TRAVELS Home"
        >
          <BrandLogo variant="emblem" size="xs" />
        </a>

        {/* Clean 3-Link Core Navigation: Home, About, Services */}
        <nav
          className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-300"
          aria-label="Main Navigation"
        >
          <button
            onClick={() => scrollToSection('top')}
            className="text-slate-300 hover:text-white transition-colors cursor-pointer py-1"
          >
            Home
          </button>

          <button
            onClick={() => scrollToSection('about')}
            className="text-slate-300 hover:text-white transition-colors cursor-pointer py-1"
          >
            About
          </button>

          <button
            onClick={() => scrollToSection('services')}
            className="text-slate-300 hover:text-white transition-colors cursor-pointer py-1"
          >
            Services
          </button>
        </nav>

        {/* Action Zone: Contact Number, My Enquiry, (Book/Enquire on Desktop only) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Contact Number (Click to Call) */}
          <a
            href={businessConfig.phoneCallUrl}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-bold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all whitespace-nowrap"
            title={`Direct Phone Helpline: ${businessConfig.phoneNumber}`}
          >
            <Phone className="w-3.5 h-3.5 text-[#F4B942]" />
            <span className="font-mono tracking-wide hidden sm:inline">{businessConfig.phoneNumber}</span>
            <span className="sm:hidden text-xs">Call</span>
          </a>

          {/* My Enquiry Button */}
          <button
            onClick={onOpenMyEnquiries}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all cursor-pointer whitespace-nowrap"
            title="View my session travel requests"
          >
            <Clock className="w-3.5 h-3.5 text-[#F4B942]" />
            <span className="hidden sm:inline">My Enquiry</span>
            {enquiryCount > 0 ? (
              <span className="ml-1 px-1.5 py-0.5 bg-[#DC2626] text-white text-[10px] font-extrabold rounded-full animate-pulse">
                {enquiryCount}
              </span>
            ) : (
              <span className="hidden md:inline text-[10px] text-slate-400 font-normal">
                (0)
              </span>
            )}
          </button>

          {/* Primary CTA: Book / Enquire (Hidden on phones & iPads, strictly visible on desktop xl+) */}
          <button
            onClick={handleBookEnquire}
            className="hidden xl:inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#146EF5] hover:bg-[#0E5AD0] active:scale-95 rounded-xl shadow-md shadow-blue-900/30 transition-all whitespace-nowrap cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Book / Enquire</span>
          </button>

          {/* Mobile & iPad menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-200" />}
          </button>
        </div>
      </div>

      {/* Mobile & iPad Menu Dropdown (No booking/inquiry button on phone and iPad) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071A2F] border-b border-slate-800 px-4 pt-4 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-1 gap-2 text-sm font-semibold">
            <button
              onClick={() => scrollToSection('top')}
              className="text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-slate-800/80 transition-colors"
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection('about')}
              className="text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-slate-800/80 transition-colors"
            >
              About
            </button>

            <button
              onClick={() => scrollToSection('services')}
              className="text-left px-3.5 py-2.5 rounded-xl text-slate-200 hover:bg-slate-800/80 transition-colors"
            >
              Services
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2.5">
            {/* Direct Phone in Mobile Menu */}
            <a
              href={businessConfig.phoneCallUrl}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 text-xs font-mono"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F4B942]" />
                <span>Call Helpline:</span>
              </div>
              <span className="font-bold text-white">{businessConfig.phoneNumber}</span>
            </a>

            {/* My Enquiry in Mobile Menu */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenMyEnquiries();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 text-xs font-medium"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F4B942]" />
                <span>My Enquiry (Session)</span>
              </div>
              <span className="px-2 py-0.5 bg-blue-600 text-white text-[11px] font-bold rounded-full">
                {enquiryCount}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
