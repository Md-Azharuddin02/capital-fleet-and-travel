import React, { useState } from 'react';
import {
  TravelService,
  TripType,
  CabinClass,
  CarRentalType,
  CoachTripType,
  FlightSearchParams,
  BusSearchParams,
  CarSearchParams,
  CoachSearchParams,
  TrainSearchParams,
  CorporateSearchParams,
} from '../types';
import {
  Plane,
  Bus,
  Car,
  Users,
  Train,
  Building2,
  ArrowRightLeft,
  Calendar,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { businessConfig, getWhatsAppUrl, generateCorporateMessage } from '../data/travelData';
import { BrandLogo } from './BrandLogo';

interface HeroSearchProps {
  activeService: TravelService;
  onSelectService: (service: TravelService) => void;
  onExecuteSearch: (service: TravelService, params: any) => void;
  onOpenWhatsAppDirect: (text: string) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  activeService,
  onSelectService,
  onExecuteSearch,
  onOpenWhatsAppDirect,
}) => {
  // Flight state
  const [flightTripType, setFlightTripType] = useState<TripType>('one-way');
  const [flightFrom, setFlightFrom] = useState('Delhi (DEL)');
  const [flightTo, setFlightTo] = useState('Mumbai (BOM)');
  const [flightDepDate, setFlightDepDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [flightRetDate, setFlightRetDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [flightAdults, setFlightAdults] = useState(1);
  const [flightChildren, setFlightChildren] = useState(0);
  const [flightInfants, setFlightInfants] = useState(0);
  const [flightCabin, setFlightCabin] = useState<CabinClass>('economy');
  const [flightTravellerModal, setFlightTravellerModal] = useState(false);

  // Bus state
  const [busFrom, setBusFrom] = useState('Delhi (Kashmere Gate)');
  const [busTo, setBusTo] = useState('Jaipur (Sindhi Camp)');
  const [busDate, setBusDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [busPassengers, setBusPassengers] = useState(1);

  // Car rental state (Delhi NCR focus)
  const [carPickup, setCarPickup] = useState('Delhi Aerocity / Terminal 3');
  const [carDrop, setCarDrop] = useState('Local Delhi NCR / Gurugram');
  const [carDate, setCarDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [carTime, setCarTime] = useState('09:00 AM');
  const [carRentalType, setCarRentalType] = useState<CarRentalType>('local');
  const [carCategory, setCarCategory] = useState('Sedan');

  // Coach rental state
  const [coachPickup, setCoachPickup] = useState('Delhi NCR (Connaught Place)');
  const [coachDest, setCoachDest] = useState('Jaipur / Rajasthan Tour');
  const [coachDate, setCoachDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString().split('T')[0];
  });
  const [coachPassengers, setCoachPassengers] = useState(25);
  const [coachTripType, setCoachTripType] = useState<CoachTripType>('round-trip');
  const [coachType, setCoachType] = useState('28–40 Seater Luxury Coach');

  // Train state
  const [trainFrom, setTrainFrom] = useState('New Delhi (NDLS)');
  const [trainTo, setTrainTo] = useState('Varanasi Junction (BSB)');
  const [trainDate, setTrainDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split('T')[0];
  });
  const [trainPassengers, setTrainPassengers] = useState(2);

  // Corporate state
  const [corpCompany, setCorpCompany] = useState('');
  const [corpRequirement, setCorpRequirement] = useState('Executive Airport Cabs & Event Logistics');
  const [corpTravellers, setCorpTravellers] = useState('10 - 25 members');
  const [corpDate, setCorpDate] = useState('Next Month');
  const [corpDestination, setCorpDestination] = useState('Delhi NCR & Multiple Regional Hubs');
  const [corpService, setCorpService] = useState('Multiple Services');

  // Animation state for swapping
  const [swapRotating, setSwapRotating] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Swap function for Flight
  const handleSwapFlight = () => {
    setSwapRotating(true);
    setTimeout(() => setSwapRotating(false), 300);
    const temp = flightFrom;
    setFlightFrom(flightTo);
    setFlightTo(temp);
  };

  // Swap function for Bus
  const handleSwapBus = () => {
    setSwapRotating(true);
    setTimeout(() => setSwapRotating(false), 300);
    const temp = busFrom;
    setBusFrom(busTo);
    setBusTo(temp);
  };

  // Swap function for Train
  const handleSwapTrain = () => {
    setSwapRotating(true);
    setTimeout(() => setSwapRotating(false), 300);
    const temp = trainFrom;
    setTrainFrom(trainTo);
    setTrainTo(temp);
  };

  // Submit search handler
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);

    if (activeService === 'flights') {
      if (flightFrom.trim().toLowerCase() === flightTo.trim().toLowerCase()) {
        setSearchError('Origin and destination cannot be identical.');
        return;
      }
      const params: FlightSearchParams = {
        tripType: flightTripType,
        from: flightFrom,
        to: flightTo,
        departureDate: flightDepDate,
        returnDate: flightTripType === 'round-trip' ? flightRetDate : undefined,
        adults: flightAdults,
        children: flightChildren,
        infants: flightInfants,
        cabin: flightCabin,
      };
      onExecuteSearch('flights', params);
    } else if (activeService === 'buses') {
      if (busFrom.trim().toLowerCase() === busTo.trim().toLowerCase()) {
        setSearchError('Pickup and drop cities cannot be identical.');
        return;
      }
      const params: BusSearchParams = {
        from: busFrom,
        to: busTo,
        travelDate: busDate,
        passengers: busPassengers,
      };
      onExecuteSearch('buses', params);
    } else if (activeService === 'cars') {
      const params: CarSearchParams = {
        pickupLocation: carPickup,
        dropLocation: carDrop,
        pickupDate: carDate,
        pickupTime: carTime,
        rentalType: carRentalType,
        carCategory: carCategory,
      };
      onExecuteSearch('cars', params);
    } else if (activeService === 'coaches') {
      const params: CoachSearchParams = {
        pickup: coachPickup,
        destination: coachDest,
        travelDate: coachDate,
        passengers: coachPassengers,
        tripType: coachTripType,
        coachType: coachType,
      };
      onExecuteSearch('coaches', params);
    } else if (activeService === 'trains') {
      const params: TrainSearchParams = {
        from: trainFrom,
        to: trainTo,
        journeyDate: trainDate,
        passengers: trainPassengers,
      };
      onExecuteSearch('trains', params);
    } else if (activeService === 'corporate') {
      const params: CorporateSearchParams = {
        companyName: corpCompany,
        travelRequirement: corpRequirement,
        numberOfTravellers: corpTravellers,
        travelDate: corpDate,
        destination: corpDestination,
        serviceRequired: corpService,
      };
      const waMsg = generateCorporateMessage(params);
      onOpenWhatsAppDirect(waMsg);
      // Clear corporate form data
      setCorpCompany('');
      setCorpRequirement('');
      setCorpDestination('');
      setCorpDate('');
      setCorpTravellers('10-25');
      setCorpService('Multiple Services');
    }
  };

  const servicesList: {
    id: TravelService;
    label: string;
    icon: React.ElementType;
    badge?: string;
  }[] = [
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'buses', label: 'Bus Tickets', icon: Bus },
    { id: 'cars', label: 'Car Rental', icon: Car, badge: 'Delhi NCR' },
    { id: 'coaches', label: 'Coach Rental', icon: Users, badge: 'PAN India' },
    { id: 'trains', label: 'Rail Tickets', icon: Train },
    { id: 'corporate', label: 'Corporate Travel', icon: Building2 },
  ];

  return (
    <section id="search-module" className="relative bg-[#071A2F] text-white pt-8 pb-16 sm:pt-12 sm:pb-24 overflow-hidden">
      {/* Subtle Journey lines vector backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none">
          <path
            d="M-100 200 C 300 100, 700 450, 1540 180"
            stroke="url(#lineGrad1)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <path
            d="M-50 480 C 450 320, 950 580, 1500 350"
            stroke="url(#lineGrad2)"
            strokeWidth="1.5"
          />
          {/* Subtle location pin markers on lines */}
          <circle cx="350" cy="235" r="4" fill="#146EF5" />
          <circle cx="950" cy="460" r="4" fill="#DC2626" />
          <circle cx="1200" cy="240" r="4" fill="#F4B942" />
          <defs>
            <linearGradient id="lineGrad1" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#146EF5" stopOpacity="0.1" />
              <stop offset="0.5" stopColor="#146EF5" stopOpacity="0.8" />
              <stop offset="1" stopColor="#146EF5" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="lineGrad2" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#DC2626" stopOpacity="0.1" />
              <stop offset="0.6" stopColor="#F4B942" stopOpacity="0.7" />
              <stop offset="1" stopColor="#146EF5" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Eyebrow, Headline & Value Proposition */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          {/* Official Brand Badge */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-lg backdrop-blur-md">
              <BrandLogo variant="icon-only" className="w-5 h-5" />
              <span className="text-xs font-extrabold tracking-wider text-white uppercase">
                CAPITAL FLEET &amp; TRAVELS
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-[11px] font-semibold text-slate-300 hidden sm:inline tracking-wider uppercase">
                YOUR JOURNEY · OUR COMMITMENT
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm font-semibold tracking-widest text-[#F4B942] uppercase mb-3">
            TRAVEL MADE SIMPLE
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
            ONE PLACE. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-200">EVERY JOURNEY.</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed">
            Flights, buses, trains, car rentals and group travel solutions—planned around the way you travel.
          </p>
        </div>

        {/* Central Travel Command Engine (The Main Booking Card) */}
        <div className="bg-[#0B1E36] border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-xl">
          
          {/* Service Switcher Bar */}
          <div className="flex items-center gap-1 sm:gap-2 pb-4 sm:pb-6 border-b border-slate-800/80 overflow-x-auto no-scrollbar">
            {servicesList.map((srv) => {
              const Icon = srv.icon;
              const isActive = activeService === srv.id;
              return (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => onSelectService(srv.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#146EF5] text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{srv.label}</span>
                  {srv.badge && (
                    <span className="text-[10px] uppercase font-semibold text-slate-300 opacity-80">
                      {srv.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Validation Error banner */}
          {searchError && (
            <div className="mt-4 p-3 bg-red-950/60 border border-red-500/50 rounded-lg text-xs text-red-200">
              {searchError}
            </div>
          )}

          {/* Dynamic Search Form */}
          <form onSubmit={handleSearchSubmit} className="mt-5 sm:mt-6">
            
            {/* 1. FLIGHTS SEARCH EXPERIENCE */}
            {activeService === 'flights' && (
              <div className="space-y-4">
                {/* Trip Type Selector & Domestic/International Note */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-2 text-xs">
                  <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setFlightTripType('one-way')}
                      className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
                        flightTripType === 'one-way'
                          ? 'bg-[#146EF5] text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      One Way
                    </button>
                    <button
                      type="button"
                      onClick={() => setFlightTripType('round-trip')}
                      className={`px-3 py-1.5 rounded-md font-medium cursor-pointer transition-colors ${
                        flightTripType === 'round-trip'
                          ? 'bg-[#146EF5] text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Round Trip
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <span className="text-white font-medium">Domestic</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-white font-medium">International Ticketing</span>
                  </div>
                </div>

                {/* Flight Input Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  
                  {/* From Field */}
                  <div className="md:col-span-3 bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-slate-500 transition-colors">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      From
                    </label>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                      <input
                        type="text"
                        value={flightFrom}
                        onChange={(e) => setFlightFrom(e.target.value)}
                        placeholder="e.g. Delhi (DEL)"
                        className="w-full bg-transparent text-sm sm:text-base font-semibold text-white focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Swap Button */}
                  <div className="flex justify-center md:col-span-1 -my-2 md:my-0 z-10">
                    <button
                      type="button"
                      onClick={handleSwapFlight}
                      aria-label="Swap origin and destination"
                      className={`p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600 transition-transform cursor-pointer ${
                        swapRotating ? 'rotate-180 duration-300' : ''
                      }`}
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                    </button>
                  </div>

                  {/* To Field */}
                  <div className="md:col-span-3 bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-slate-500 transition-colors">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      To
                    </label>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                      <input
                        type="text"
                        value={flightTo}
                        onChange={(e) => setFlightTo(e.target.value)}
                        placeholder="e.g. Mumbai (BOM)"
                        className="w-full bg-transparent text-sm sm:text-base font-semibold text-white focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Departure Date */}
                  <div className="md:col-span-2 bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-slate-500 transition-colors">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Departure
                    </label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                      <input
                        type="date"
                        value={flightDepDate}
                        onChange={(e) => setFlightDepDate(e.target.value)}
                        className="w-full bg-transparent text-xs sm:text-sm font-medium text-white focus:outline-none cursor-pointer"
                        required
                      />
                    </div>
                  </div>

                  {/* Return Date (or disabled placeholder) */}
                  <div className={`md:col-span-3 bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 transition-colors ${
                    flightTripType === 'one-way' ? 'opacity-50 cursor-not-allowed' : 'hover:border-slate-500'
                  }`}>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Return {flightTripType === 'one-way' && '(Select Round Trip)'}
                    </label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                      <input
                        type="date"
                        value={flightRetDate}
                        disabled={flightTripType === 'one-way'}
                        onChange={(e) => setFlightRetDate(e.target.value)}
                        className="w-full bg-transparent text-xs sm:text-sm font-medium text-white focus:outline-none disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                </div>

                {/* Secondary Row: Travellers & Cabin Class Selector */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
                  
                  {/* Travellers Trigger */}
                  <div className="relative md:col-span-4">
                    <button
                      type="button"
                      onClick={() => setFlightTravellerModal(!flightTravellerModal)}
                      className="w-full text-left bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 flex items-center justify-between hover:border-slate-500 transition-colors cursor-pointer"
                    >
                      <div>
                        <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                          Travellers & Cabin
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-white">
                          {flightAdults + flightChildren + flightInfants} Traveller(s) · {flightCabin.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    </button>

                    {/* Travellers Popover Modal */}
                    {flightTravellerModal && (
                      <div className="absolute top-full left-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl z-30 space-y-4">
                        <div className="flex justify-between items-center text-xs">
                          <div>
                            <div className="font-semibold text-white">Adults (12+ yrs)</div>
                            <div className="text-slate-400 text-[10px]">On the day of travel</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setFlightAdults(Math.max(1, flightAdults - 1))}
                              className="w-6 h-6 rounded bg-slate-800 text-white font-bold hover:bg-slate-700"
                            >
                              -
                            </button>
                            <span className="w-4 text-center text-sm font-semibold text-white">{flightAdults}</span>
                            <button
                              type="button"
                              onClick={() => setFlightAdults(flightAdults + 1)}
                              className="w-6 h-6 rounded bg-slate-800 text-white font-bold hover:bg-slate-700"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-xs">
                          <div>
                            <div className="font-semibold text-white">Children (2-12 yrs)</div>
                            <div className="text-slate-400 text-[10px]">With seat</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setFlightChildren(Math.max(0, flightChildren - 1))}
                              className="w-6 h-6 rounded bg-slate-800 text-white font-bold hover:bg-slate-700"
                            >
                              -
                            </button>
                            <span className="w-4 text-center text-sm font-semibold text-white">{flightChildren}</span>
                            <button
                              type="button"
                              onClick={() => setFlightChildren(flightChildren + 1)}
                              className="w-6 h-6 rounded bg-slate-800 text-white font-bold hover:bg-slate-700"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-between items-center text-xs">
                          <div>
                            <div className="font-semibold text-white">Infants (under 2 yrs)</div>
                            <div className="text-slate-400 text-[10px]">On lap</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setFlightInfants(Math.max(0, flightInfants - 1))}
                              className="w-6 h-6 rounded bg-slate-800 text-white font-bold hover:bg-slate-700"
                            >
                              -
                            </button>
                            <span className="w-4 text-center text-sm font-semibold text-white">{flightInfants}</span>
                            <button
                              type="button"
                              onClick={() => setFlightInfants(flightInfants + 1)}
                              className="w-6 h-6 rounded bg-slate-800 text-white font-bold hover:bg-slate-700"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-800">
                          <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                            Cabin Class
                          </label>
                          <select
                            value={flightCabin}
                            onChange={(e) => setFlightCabin(e.target.value as CabinClass)}
                            className="w-full bg-slate-800 text-white text-xs rounded-lg p-2 border border-slate-700 focus:outline-none"
                          >
                            <option value="economy">Economy</option>
                            <option value="premium-economy">Premium Economy</option>
                            <option value="business">Business</option>
                            <option value="first">First Class</option>
                          </select>
                        </div>

                        <button
                          type="button"
                          onClick={() => setFlightTravellerModal(false)}
                          className="w-full py-1.5 bg-[#146EF5] text-white text-xs font-semibold rounded-lg hover:bg-blue-600"
                        >
                          Done
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Flight Search Submit Button */}
                  <div className="md:col-span-8 flex items-center justify-end">
                    <button
                      type="submit"
                      className="w-full md:w-auto px-8 py-3.5 bg-[#146EF5] hover:bg-[#0E5AD0] text-white text-sm sm:text-base font-bold rounded-xl shadow-lg transition-transform active:scale-[0.99] cursor-pointer"
                    >
                      Search Flights
                    </button>
                  </div>

                </div>
              </div>
            )}

            {/* 2. BUS TICKETS SEARCH EXPERIENCE */}
            {activeService === 'buses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
                  <span>PAN India Intercity Network · AC Sleeper & Seater Coaches</span>
                  <span className="hidden sm:inline text-blue-400 font-medium">Instant WhatsApp Confirmation Assistance</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  
                  {/* From Field */}
                  <div className="md:col-span-4 bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-slate-500 transition-colors">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      From
                    </label>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                      <input
                        type="text"
                        value={busFrom}
                        onChange={(e) => setBusFrom(e.target.value)}
                        placeholder="e.g. Delhi (Kashmere Gate)"
                        className="w-full bg-transparent text-sm sm:text-base font-semibold text-white focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Animated Swap Icon */}
                  <div className="flex justify-center md:col-span-1 -my-2 md:my-0 z-10">
                    <button
                      type="button"
                      onClick={handleSwapBus}
                      aria-label="Swap pickup and drop cities"
                      className={`p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600 transition-transform cursor-pointer ${
                        swapRotating ? 'rotate-180 duration-300' : ''
                      }`}
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                    </button>
                  </div>

                  {/* To Field */}
                  <div className="md:col-span-4 bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-slate-500 transition-colors">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      To
                    </label>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                      <input
                        type="text"
                        value={busTo}
                        onChange={(e) => setBusTo(e.target.value)}
                        placeholder="e.g. Jaipur (Sindhi Camp)"
                        className="w-full bg-transparent text-sm sm:text-base font-semibold text-white focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Travel Date */}
                  <div className="md:col-span-3 bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-slate-500 transition-colors">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Travel Date
                    </label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                      <input
                        type="date"
                        value={busDate}
                        onChange={(e) => setBusDate(e.target.value)}
                        className="w-full bg-transparent text-xs sm:text-sm font-medium text-white focus:outline-none cursor-pointer"
                        required
                      />
                    </div>
                  </div>

                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <label className="text-xs text-slate-300 whitespace-nowrap font-medium">
                      Passengers:
                    </label>
                    <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg p-1">
                      {[1, 2, 3, 4, 6].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setBusPassengers(num)}
                          className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                            busPassengers === num
                              ? 'bg-[#146EF5] text-white'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#146EF5] hover:bg-[#0E5AD0] text-white text-sm sm:text-base font-bold rounded-xl shadow-lg transition-transform active:scale-[0.99] cursor-pointer"
                  >
                    Search Buses
                  </button>
                </div>
              </div>
            )}

            {/* 3. CAR RENTAL SEARCH EXPERIENCE (DELHI NCR FOCUSED) */}
            {activeService === 'cars' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#F4B942] uppercase tracking-wide">
                      Delhi NCR Service
                    </span>
                    <span className="text-slate-400">· Aerocity, Noida, Gurgaon, Faridabad & Outstation</span>
                  </div>
                  
                  {/* Rental Type Tabs */}
                  <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                    {(['local', 'outstation', 'airport'] as CarRentalType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setCarRentalType(type)}
                        className={`px-3 py-1 text-xs font-medium rounded-md transition-colors capitalize cursor-pointer ${
                          carRentalType === type
                            ? 'bg-[#146EF5] text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {type === 'airport' ? 'Airport Transfer' : type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  
                  {/* Pickup Location */}
                  <div className="md:col-span-4 bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-slate-500 transition-colors">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Pickup Location (Delhi NCR)
                    </label>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                      <input
                        type="text"
                        value={carPickup}
                        onChange={(e) => setCarPickup(e.target.value)}
                        placeholder="e.g. Delhi Aerocity T3 / Connaught Place"
                        className="w-full bg-transparent text-sm sm:text-base font-semibold text-white focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Drop Location */}
                  <div className="md:col-span-3 bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-slate-500 transition-colors">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Drop / Destination
                    </label>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                      <input
                        type="text"
                        value={carDrop}
                        onChange={(e) => setCarDrop(e.target.value)}
                        placeholder="e.g. Local 8h/80km or Agra"
                        className="w-full bg-transparent text-sm sm:text-base font-semibold text-white focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Pickup Date */}
                  <div className="md:col-span-3 bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-slate-500 transition-colors">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Pickup Date
                    </label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                      <input
                        type="date"
                        value={carDate}
                        onChange={(e) => setCarDate(e.target.value)}
                        className="w-full bg-transparent text-xs sm:text-sm font-medium text-white focus:outline-none cursor-pointer"
                        required
                      />
                    </div>
                  </div>

                  {/* Pickup Time */}
                  <div className="md:col-span-2 bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-slate-500 transition-colors">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Time
                    </label>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                      <input
                        type="text"
                        value={carTime}
                        onChange={(e) => setCarTime(e.target.value)}
                        placeholder="09:00 AM"
                        className="w-full bg-transparent text-xs sm:text-sm font-medium text-white focus:outline-none"
                      />
                    </div>
                  </div>

                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <label className="text-xs text-slate-300 font-medium">Vehicle Category:</label>
                    <select
                      value={carCategory}
                      onChange={(e) => setCarCategory(e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white rounded-lg px-3 py-2 focus:outline-none"
                    >
                      <option value="Sedan">Sedan (Dzire / Etios 4+1)</option>
                      <option value="SUV">SUV (Innova Crysta 6+1)</option>
                      <option value="Premium">Premium (Innova Hycross Hybrid)</option>
                      <option value="Tempo Traveller">Tempo Traveller (12/17 Seater)</option>
                      <option value="Luxury">Luxury (Mercedes E-Class / BMW)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#146EF5] hover:bg-[#0E5AD0] text-white text-sm sm:text-base font-bold rounded-xl shadow-lg transition-transform active:scale-[0.99] cursor-pointer"
                  >
                    Find Cars
                  </button>
                </div>
              </div>
            )}

            {/* 4. COACH / BUS RENTAL SEARCH (PAN INDIA GROUP MOBILITY) */}
            {activeService === 'coaches' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-1">
                  <div className="text-slate-400">
                    <span className="text-[#F4B942] font-semibold">PAN India Group Charters</span> · Weddings, Corporate Events, School Excursions, Tours
                  </div>

                  <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                    {(['round-trip', 'one-way', 'local', 'outstation'] as CoachTripType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setCoachTripType(type)}
                        className={`px-3 py-1 text-xs font-medium rounded-md transition-colors capitalize cursor-pointer ${
                          coachTripType === type
                            ? 'bg-[#146EF5] text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {type.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  
                  {/* Pickup */}
                  <div className="md:col-span-4 bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-slate-500 transition-colors">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Pickup Location
                    </label>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                      <input
                        type="text"
                        value={coachPickup}
                        onChange={(e) => setCoachPickup(e.target.value)}
                        placeholder="e.g. Delhi NCR / Connaught Place"
                        className="w-full bg-transparent text-sm sm:text-base font-semibold text-white focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="md:col-span-4 bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-slate-500 transition-colors">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Destination / Tour Route
                    </label>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                      <input
                        type="text"
                        value={coachDest}
                        onChange={(e) => setCoachDest(e.target.value)}
                        placeholder="e.g. Jaipur, Agra, Jim Corbett, Manali"
                        className="w-full bg-transparent text-sm sm:text-base font-semibold text-white focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div className="md:col-span-4 bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-slate-500 transition-colors">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Travel Date
                    </label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                      <input
                        type="date"
                        value={coachDate}
                        onChange={(e) => setCoachDate(e.target.value)}
                        className="w-full bg-transparent text-xs sm:text-sm font-medium text-white focus:outline-none cursor-pointer"
                        required
                      />
                    </div>
                  </div>

                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    <label className="text-xs text-slate-300 font-medium">Passengers / Capacity:</label>
                    <select
                      value={coachType}
                      onChange={(e) => setCoachType(e.target.value)}
                      className="bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white rounded-lg px-3 py-2 focus:outline-none"
                    >
                      <option value="12–17 Seater Executive Tempo">12–17 Seater (Executive Tempo / Urbania)</option>
                      <option value="18–27 Seater Deluxe Mini Bus">18–27 Seater (TATA / BharatBenz AC)</option>
                      <option value="28–40 Seater Luxury Coach">28–40 Seater (Air Suspension Highway Coach)</option>
                      <option value="41–50 Seater Super Luxury Multi-Axle">41–50 Seater (Volvo / Scania Multi-Axle)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#146EF5] hover:bg-[#0E5AD0] text-white text-sm sm:text-base font-bold rounded-xl shadow-lg transition-transform active:scale-[0.99] cursor-pointer"
                  >
                    Find a Coach
                  </button>
                </div>
              </div>
            )}

            {/* 5. TRAIN / RAIL TICKETS SEARCH EXPERIENCE */}
            {activeService === 'trains' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
                  <span>PAN India Rail Booking Assistance · Vande Bharat, Rajdhani, Shatabdi & Superfast</span>
                  <span className="text-amber-400 font-medium">Direct WhatsApp Travel Desk Verification</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  
                  {/* From Field */}
                  <div className="md:col-span-4 bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-slate-500 transition-colors">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      From Station
                    </label>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                      <input
                        type="text"
                        value={trainFrom}
                        onChange={(e) => setTrainFrom(e.target.value)}
                        placeholder="e.g. New Delhi (NDLS)"
                        className="w-full bg-transparent text-sm sm:text-base font-semibold text-white focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Swap Button */}
                  <div className="flex justify-center md:col-span-1 -my-2 md:my-0 z-10">
                    <button
                      type="button"
                      onClick={handleSwapTrain}
                      aria-label="Swap origin and destination station"
                      className={`p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600 transition-transform cursor-pointer ${
                        swapRotating ? 'rotate-180 duration-300' : ''
                      }`}
                    >
                      <ArrowRightLeft className="w-4 h-4" />
                    </button>
                  </div>

                  {/* To Field */}
                  <div className="md:col-span-4 bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-slate-500 transition-colors">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      To Station
                    </label>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                      <input
                        type="text"
                        value={trainTo}
                        onChange={(e) => setTrainTo(e.target.value)}
                        placeholder="e.g. Varanasi (BSB)"
                        className="w-full bg-transparent text-sm sm:text-base font-semibold text-white focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Journey Date */}
                  <div className="md:col-span-3 bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-slate-500 transition-colors">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Journey Date
                    </label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                      <input
                        type="date"
                        value={trainDate}
                        onChange={(e) => setTrainDate(e.target.value)}
                        className="w-full bg-transparent text-xs sm:text-sm font-medium text-white focus:outline-none cursor-pointer"
                        required
                      />
                    </div>
                  </div>

                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <label className="text-xs text-slate-300 font-medium">Passengers:</label>
                    <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg p-1">
                      {[1, 2, 3, 4, 6].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setTrainPassengers(num)}
                          className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                            trainPassengers === num
                              ? 'bg-[#146EF5] text-white'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-[#146EF5] hover:bg-[#0E5AD0] text-white text-sm sm:text-base font-bold rounded-xl shadow-lg transition-transform active:scale-[0.99] cursor-pointer"
                  >
                    Search Trains
                  </button>
                </div>
              </div>
            )}

            {/* 6. CORPORATE TRAVEL SEARCH & ENQUIRY WORKFLOW */}
            {activeService === 'corporate' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-300 pb-1">
                  <span>Tailored Travel Solutions for Enterprises, HR Departments, Admin Teams & Event Managers</span>
                  <span className="text-[#F4B942] font-semibold">Priority Account Coordinator</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  
                  {/* Company Name */}
                  <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-slate-500 transition-colors">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      value={corpCompany}
                      onChange={(e) => setCorpCompany(e.target.value)}
                      placeholder="e.g. Acme Tech Solutions"
                      className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
                      required
                    />
                  </div>

                  {/* Travel Requirement */}
                  <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-slate-500 transition-colors">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Travel Requirement
                    </label>
                    <input
                      type="text"
                      value={corpRequirement}
                      onChange={(e) => setCorpRequirement(e.target.value)}
                      placeholder="e.g. Monthly employee cabs / Annual offsite"
                      className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
                      required
                    />
                  </div>

                  {/* Service Required */}
                  <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-slate-500 transition-colors">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Service Required
                    </label>
                    <select
                      value={corpService}
                      onChange={(e) => setCorpService(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm font-medium text-white focus:outline-none"
                    >
                      <option value="Flights" className="bg-slate-900">Corporate Flights</option>
                      <option value="Bus Tickets" className="bg-slate-900">Bus Tickets</option>
                      <option value="Coach Rental" className="bg-slate-900">Coach Rental</option>
                      <option value="Car Rental" className="bg-slate-900">Delhi NCR Executive Cabs</option>
                      <option value="Rail" className="bg-slate-900">Rail Bookings</option>
                      <option value="Multiple Services" className="bg-slate-900">Multiple Services / 360° Management</option>
                    </select>
                  </div>

                  {/* Number of Travellers */}
                  <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-slate-500 transition-colors">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Estimated Travellers
                    </label>
                    <input
                      type="text"
                      value={corpTravellers}
                      onChange={(e) => setCorpTravellers(e.target.value)}
                      placeholder="e.g. 5 to 50 executives"
                      className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
                    />
                  </div>

                  {/* Destination */}
                  <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-slate-500 transition-colors">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Destination / City Hubs
                    </label>
                    <input
                      type="text"
                      value={corpDestination}
                      onChange={(e) => setCorpDestination(e.target.value)}
                      placeholder="e.g. Delhi NCR, Mumbai, Bengaluru"
                      className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
                    />
                  </div>

                  {/* Travel Date */}
                  <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 hover:border-slate-500 transition-colors">
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Travel Timeline
                    </label>
                    <input
                      type="text"
                      value={corpDate}
                      onChange={(e) => setCorpDate(e.target.value)}
                      placeholder="e.g. Immediate / Next 30 Days"
                      className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
                    />
                  </div>

                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Includes GST invoicing, verified chauffeurs, and dedicated account manager</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm sm:text-base font-bold rounded-xl shadow-lg transition-transform active:scale-[0.99] cursor-pointer"
                  >
                    Talk to Corporate Travel Team
                  </button>
                </div>
              </div>
            )}

          </form>

          {/* Quick city suggestions */}
          <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Quick Picks:</span>
            {[
              { label: 'Delhi → Jaipur', from: 'Delhi', to: 'Jaipur', srv: 'buses' as const },
              { label: 'Delhi → Mumbai', from: 'Delhi (DEL)', to: 'Mumbai (BOM)', srv: 'flights' as const },
              { label: 'Delhi → Manali', from: 'Delhi', to: 'Manali', srv: 'buses' as const },
              { label: 'Delhi Aerocity (Local Cabs)', from: 'Delhi Aerocity', to: 'Gurugram CyberHub', srv: 'cars' as const },
              { label: 'Delhi → Chandigarh', from: 'Delhi', to: 'Chandigarh', srv: 'cars' as const },
            ].map((route, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onSelectService(route.srv);
                  if (route.srv === 'flights') {
                    setFlightFrom(route.from);
                    setFlightTo(route.to);
                  } else if (route.srv === 'buses') {
                    setBusFrom(route.from);
                    setBusTo(route.to);
                  } else if (route.srv === 'cars') {
                    setCarPickup(route.from);
                    setCarDrop(route.to);
                  }
                }}
                className="px-2.5 py-1 rounded-md bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              >
                {route.label}
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
