import React from 'react';
import { Building2, Briefcase, Users, Car, Plane, ShieldCheck, MessageCircle, FileText, CheckCircle2 } from 'lucide-react';
import { businessConfig, getWhatsAppUrl } from '../data/travelData';

export const CorporateSection: React.FC = () => {
  const corporateMessage = `Hi CAPITAL FLEET & TRAVELS, we are interested in corporate travel services. We'd like to discuss our travel requirements.`;

  const highlights = [
    { title: 'Employee Travel', desc: 'Daily corporate roster cabs & monthly employee transit across Delhi NCR with safety compliance.' },
    { title: 'Business Trips', desc: 'Same-day round trip flights, punctual airport pickups, and priority corporate fare desk.' },
    { title: 'Group Travel', desc: 'Logistics coordination for company offsites, leadership retreats, and regional team summits.' },
    { title: 'Event Transportation', desc: 'Seamless shuttle fleets for industry expos, investor meetings, and annual shareholder gatherings.' },
    { title: 'Airport Transfers', desc: 'Dedicated Meet & Greet protocol at Delhi Indira Gandhi Airport T1, T2 & T3 with flight tracking.' },
    { title: 'Multi-Service Coordination', desc: 'Single point of contact for air, rail, charter coach, and local chauffeur fleets.' },
  ];

  return (
    <section className="bg-[#050F1D] text-white py-18 sm:py-28 border-b border-slate-800 relative overflow-hidden">
      {/* Decorative gradient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>ENTERPRISE MOBILITY DIVISION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            TRAVEL MANAGEMENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-amber-200">WITHOUT THE CHAOS.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Designed for companies, HR administrators, corporate travel desks, and event planners seeking reliable ground fleets, flight coordination, and consolidated billing.
          </p>
        </div>

        {/* Corporate Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#09172A] border border-slate-800/80 hover:border-slate-700 rounded-2xl p-5 sm:p-6 transition-all"
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
                <h3 className="text-base font-bold text-white tracking-wide">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Corporate Trust & Action Callout */}
        <div className="bg-gradient-to-r from-[#0C1F38] to-[#122A4C] border border-slate-700/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#F4B942]">
              <FileText className="w-4 h-4" />
              <span>GST Compliant Invoicing & Transparent Billing</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-extrabold text-white">
              Speak directly with an enterprise travel coordinator
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              No generic ticketing bots. Get tailored corporate rate cards and customized trip plans directly on WhatsApp.
            </p>
          </div>

          <a
            href={getWhatsAppUrl(corporateMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Talk to Our Travel Team</span>
          </a>
        </div>

      </div>
    </section>
  );
};
