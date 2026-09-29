import React, { useState } from 'react';
import { TravelService, EnquiryDraft } from '../types';
import { X, MessageCircle, Check, Info, ShieldCheck, BookmarkPlus } from 'lucide-react';
import { businessConfig, getWhatsAppUrl } from '../data/travelData';

interface BookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selection: {
    service: TravelService;
    title: string;
    route: string;
    date: string;
    passengers: number | string;
    price?: number | string;
    details: string;
    rawItem?: any;
  } | null;
  onSaveToSession: (draft: EnquiryDraft) => void;
}

export const BookingDrawer: React.FC<BookingDrawerProps> = ({
  isOpen,
  onClose,
  selection,
  onSaveToSession,
}) => {
  const [travellerName, setTravellerName] = useState('');
  const [travellerPhone, setTravellerPhone] = useState('');
  const [optionalNotes, setOptionalNotes] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen || !selection) return null;

  const buildWhatsAppMessage = () => {
    let msg = `Hi CAPITAL FLEET & TRAVELS,\n\nI would like to enquire and confirm the following travel arrangement:\n`;
    msg += `• Service: ${selection.service.toUpperCase()}\n`;
    msg += `• Option: ${selection.title}\n`;
    msg += `• Route: ${selection.route}\n`;
    msg += `• Date: ${selection.date}\n`;
    msg += `• Travellers: ${selection.passengers}\n`;
    if (selection.price) {
      msg += `• Indicative Fare/Rate: ${selection.price}\n`;
    }
    if (selection.details) {
      msg += `• Itinerary Details: ${selection.details}\n`;
    }
    if (travellerName) {
      msg += `• Contact Person: ${travellerName}\n`;
    }
    if (travellerPhone) {
      msg += `• Contact Phone: ${travellerPhone}\n`;
    }
    if (optionalNotes) {
      msg += `• Notes / Pickup Address: ${optionalNotes}\n`;
    }
    msg += `\nPlease check current availability and confirm the booking with me. Thank you!`;
    return msg;
  };

  const handleClose = () => {
    setTravellerName('');
    setTravellerPhone('');
    setOptionalNotes('');
    setSavedSuccess(false);
    onClose();
  };

  const handleWhatsAppClick = () => {
    // 1. Build WhatsApp message with current form inputs
    const message = buildWhatsAppMessage();
    const waUrl = getWhatsAppUrl(message);

    // 2. Save enquiry to session state
    const draft: EnquiryDraft = {
      id: `enq-${Date.now()}`,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      service: selection.service,
      route: selection.route,
      date: selection.date,
      passengers: selection.passengers,
      optionTitle: selection.title,
      indicativePrice: selection.price,
      details: selection.details,
      requesterName: travellerName || undefined,
      requesterPhone: travellerPhone || undefined,
      status: 'Ready to Confirm via WhatsApp',
    };
    onSaveToSession(draft);

    // 3. Open WhatsApp in new tab
    window.open(waUrl, '_blank');

    // 4. CLEAR THE FORM DATA immediately as requested
    setTravellerName('');
    setTravellerPhone('');
    setOptionalNotes('');

    // 5. Close drawer after brief moment
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const handleSaveOnly = () => {
    // 1. Save enquiry to session state
    const draft: EnquiryDraft = {
      id: `enq-${Date.now()}`,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      service: selection.service,
      route: selection.route,
      date: selection.date,
      passengers: selection.passengers,
      optionTitle: selection.title,
      indicativePrice: selection.price,
      details: selection.details,
      requesterName: travellerName || undefined,
      requesterPhone: travellerPhone || undefined,
      status: 'Ready to Confirm via WhatsApp',
    };
    onSaveToSession(draft);

    // 2. CLEAR THE FORM DATA immediately as requested
    setTravellerName('');
    setTravellerPhone('');
    setOptionalNotes('');

    // 3. Show saved confirmation and auto-dismiss
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={handleClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-200 bg-[#071A2F] text-white">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#F4B942] uppercase tracking-wider">
                  BOOKING & ENQUIRY DESK
                </span>
                <h3 id="slide-over-title" className="text-lg font-bold text-white mt-0.5">
                  Travel Request Details
                </h3>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
            
            {/* Selected Option Summary Card */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  {selection.service}
                </span>
                {selection.price && (
                  <span className="text-base font-extrabold text-[#071A2F] font-mono tabular-nums">
                    {selection.price}
                  </span>
                )}
              </div>

              <div>
                <div className="font-bold text-slate-900 text-sm">
                  {selection.title}
                </div>
                <div className="text-xs text-slate-600 mt-1 font-medium">
                  {selection.route}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Date:</span>
                  <span className="font-medium">{selection.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Travellers:</span>
                  <span className="font-medium">{selection.passengers}</span>
                </div>
              </div>

              {selection.details && (
                <div className="text-[11px] text-slate-500 pt-1">
                  {selection.details}
                </div>
              )}
            </div>

            {/* Verification Note (Transparent, No Fake Gateway) */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>No upfront online payment required.</strong> We review seat allocations, verified driver dispatch, and current airline/bus manifest prior to invoicing.
              </p>
            </div>

            {/* Traveller Inputs */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Your Contact Information
              </h4>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lead Traveller / Requester Name
                </label>
                <input
                  type="text"
                  value={travellerName}
                  onChange={(e) => setTravellerName(e.target.value)}
                  placeholder="e.g. Vikram Singhania"
                  className="w-full text-xs sm:text-sm p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  WhatsApp Contact Number
                </label>
                <input
                  type="tel"
                  value={travellerPhone}
                  onChange={(e) => setTravellerPhone(e.target.value)}
                  placeholder="e.g. +91 97718 20328"
                  className="w-full text-xs sm:text-sm p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Special Notes or Pickup Address (Optional)
                </label>
                <textarea
                  rows={2}
                  value={optionalNotes}
                  onChange={(e) => setOptionalNotes(e.target.value)}
                  placeholder="e.g. Extra luggage space, pickup from Terminal 3 Aerocity..."
                  className="w-full text-xs sm:text-sm p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {savedSuccess && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Saved to your session! Check 'My Enquiry' in top bar.</span>
              </div>
            )}

          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-2.5">
            <button
              onClick={handleWhatsAppClick}
              className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.99] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Continue on WhatsApp</span>
            </button>

            <button
              onClick={handleSaveOnly}
              className="w-full py-2.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <BookmarkPlus className="w-3.5 h-3.5 text-slate-500" />
              <span>Save to My Enquiry (Session)</span>
            </button>

            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Direct WhatsApp Desk: {businessConfig.whatsappDisplay}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
