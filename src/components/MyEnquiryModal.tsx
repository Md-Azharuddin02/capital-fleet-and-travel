import React from 'react';
import { EnquiryDraft } from '../types';
import { X, MessageCircle, Clock, Trash2, ArrowUpRight, Plane, Bus, Car, Users, Train, Building2 } from 'lucide-react';
import { getWhatsAppUrl } from '../data/travelData';

interface MyEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  enquiries: EnquiryDraft[];
  onRemoveEnquiry: (id: string) => void;
  onClearAll: () => void;
}

export const MyEnquiryModal: React.FC<MyEnquiryModalProps> = ({
  isOpen,
  onClose,
  enquiries,
  onRemoveEnquiry,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const getServiceIcon = (srv: string) => {
    switch (srv) {
      case 'flights': return Plane;
      case 'buses': return Bus;
      case 'cars': return Car;
      case 'coaches': return Users;
      case 'trains': return Train;
      default: return Building2;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl z-10 space-y-5">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
              SESSION ACTIVITY
            </span>
            <h3 className="text-xl font-extrabold text-[#071A2F]">
              Your Travel Requests
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clear disclaimers */}
        <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
          These travel requests are saved in your current active session. You can continue directly with the travel team on WhatsApp to finalize bookings.
        </div>

        {/* Enquiries List */}
        {enquiries.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <Clock className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-semibold text-slate-700">No active enquiries yet</h4>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Search for flights, buses, cars or coaches above and click "Select" to draft an enquiry.
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {enquiries.map((enq) => {
              const Icon = getServiceIcon(enq.service);
              const waText = `Hi CAPITAL FLEET & TRAVELS, continuing enquiry for ${enq.optionTitle} (${enq.route}) on ${enq.date} for ${enq.passengers} travellers.`;
              return (
                <div
                  key={enq.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-colors space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{enq.optionTitle}</div>
                        <div className="text-[11px] text-slate-500">{enq.route}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onRemoveEnquiry(enq.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded transition-colors"
                        title="Remove enquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-slate-400">Date:</span> {enq.date}
                    </div>
                    <div>
                      <span className="text-slate-400">Travellers:</span> {enq.passengers}
                    </div>
                    {enq.indicativePrice && (
                      <div className="col-span-2 text-slate-800 font-mono font-bold">
                        Rate: {enq.indicativePrice}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {enq.status}
                    </span>

                    <a
                      href={getWhatsAppUrl(waText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold rounded-lg shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Continue on WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        {enquiries.length > 0 && (
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
            <button
              onClick={onClearAll}
              className="text-slate-500 hover:text-red-600 cursor-pointer"
            >
              Clear All ({enquiries.length})
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
