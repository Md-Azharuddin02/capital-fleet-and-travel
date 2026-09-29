import React, { useState } from 'react';
import { faqList } from '../data/travelData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="bg-[#F7F9FC] py-16 sm:py-24 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold tracking-widest text-[#146EF5] uppercase mb-2 block">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A2F] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Clear, honest answers regarding our coverage areas, car fleet limits, and WhatsApp confirmation workflows.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqList.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
