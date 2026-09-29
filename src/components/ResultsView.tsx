import React, { useState, useMemo } from 'react';
import {
  TravelService,
  FlightOption,
  BusOption,
  CarOption,
  CoachOption,
  TrainOption,
} from '../types';
import {
  demoFlights,
  demoBuses,
  demoCars,
  demoCoaches,
  demoTrains,
  businessConfig,
} from '../data/travelData';
import {
  Filter,
  ArrowUpDown,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Info,
  SlidersHorizontal,
  ChevronRight,
  Plane,
  Bus,
  Car,
  Users,
  Train,
  Sparkles,
} from 'lucide-react';

interface ResultsViewProps {
  service: TravelService;
  searchParams: any;
  onSelectOption: (optionData: {
    service: TravelService;
    title: string;
    route: string;
    date: string;
    passengers: number | string;
    price?: number | string;
    details: string;
    rawItem?: any;
  }) => void;
  onModifySearch: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  service,
  searchParams,
  onSelectOption,
  onModifySearch,
}) => {
  // Sorting tabs
  const [activeSort, setActiveSort] = useState<'recommended' | 'cheapest' | 'fastest'>('recommended');

  // Bus filters
  const [busFilterAC, setBusFilterAC] = useState<'all' | 'ac' | 'non-ac'>('all');
  const [busFilterType, setBusFilterType] = useState<'all' | 'sleeper' | 'seater'>('all');
  const [busMaxPrice, setBusMaxPrice] = useState<number>(2000);

  // Flight filters
  const [flightStops, setFlightStops] = useState<'all' | '0' | '1'>('all');
  const [flightAirlines, setFlightAirlines] = useState<string>('all');
  const [flightMaxPrice, setFlightMaxPrice] = useState<number>(25000);

  // Car category filter
  const [carCategoryFilter, setCarCategoryFilter] = useState<string>('all');

  // Mobile filters toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Route header info
  const routeTitle = useMemo(() => {
    if (service === 'flights') {
      return `${searchParams?.from || 'Delhi'} → ${searchParams?.to || 'Mumbai'}`;
    }
    if (service === 'buses') {
      return `${searchParams?.from || 'Delhi'} → ${searchParams?.to || 'Jaipur'}`;
    }
    if (service === 'cars') {
      return `${searchParams?.pickupLocation || 'Delhi NCR'} → ${searchParams?.dropLocation || 'Local / Outstation'}`;
    }
    if (service === 'coaches') {
      return `${searchParams?.pickup || 'Delhi NCR'} → ${searchParams?.destination || 'PAN India Tour'}`;
    }
    if (service === 'trains') {
      return `${searchParams?.from || 'New Delhi (NDLS)'} → ${searchParams?.to || 'Varanasi (BSB)'}`;
    }
    return 'Corporate Travel Requirement';
  }, [service, searchParams]);

  const dateTitle = useMemo(() => {
    return (
      searchParams?.travelDate ||
      searchParams?.departureDate ||
      searchParams?.pickupDate ||
      searchParams?.journeyDate ||
      'Upcoming Schedule'
    );
  }, [searchParams]);

  const travellersCount = useMemo(() => {
    if (service === 'flights') {
      return (searchParams?.adults || 1) + (searchParams?.children || 0) + (searchParams?.infants || 0);
    }
    return searchParams?.passengers || 1;
  }, [service, searchParams]);

  // Filtered Flights
  const filteredFlights = useMemo(() => {
    let list = [...demoFlights];
    if (flightStops !== 'all') {
      list = list.filter((f) => f.stops === parseInt(flightStops));
    }
    if (flightAirlines !== 'all') {
      list = list.filter((f) => f.airline.toLowerCase().includes(flightAirlines.toLowerCase()));
    }
    list = list.filter((f) => f.indicativePrice <= flightMaxPrice);

    if (activeSort === 'cheapest') {
      list.sort((a, b) => a.indicativePrice - b.indicativePrice);
    } else if (activeSort === 'fastest') {
      list.sort((a, b) => a.duration.localeCompare(b.duration));
    }
    return list;
  }, [flightStops, flightAirlines, flightMaxPrice, activeSort]);

  // Filtered Buses
  const filteredBuses = useMemo(() => {
    let list = [...demoBuses];
    if (busFilterAC === 'ac') list = list.filter((b) => b.isAC);
    if (busFilterAC === 'non-ac') list = list.filter((b) => !b.isAC);
    if (busFilterType === 'sleeper') list = list.filter((b) => b.isSleeper);
    if (busFilterType === 'seater') list = list.filter((b) => !b.isSleeper);
    list = list.filter((b) => b.indicativePrice <= busMaxPrice);

    if (activeSort === 'cheapest') {
      list.sort((a, b) => a.indicativePrice - b.indicativePrice);
    } else if (activeSort === 'fastest') {
      list.sort((a, b) => a.duration.localeCompare(b.duration));
    }
    return list;
  }, [busFilterAC, busFilterType, busMaxPrice, activeSort]);

  // Filtered Cars
  const filteredCars = useMemo(() => {
    let list = [...demoCars];
    if (carCategoryFilter !== 'all') {
      list = list.filter((c) => c.category.toLowerCase() === carCategoryFilter.toLowerCase());
    }
    return list;
  }, [carCategoryFilter]);

  return (
    <section className="bg-[#F7F9FC] py-8 sm:py-12 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Results Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>{service.toUpperCase()} RESULTS</span>
              <span aria-hidden="true">·</span>
              <span className="text-blue-600 font-bold">INDICATIVE SELECTION</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#071A2F]">
              {routeTitle}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {dateTitle}
              </span>
              <span aria-hidden="true">·</span>
              <span>{travellersCount} Passenger(s) / Travellers</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-medium">WhatsApp Booking Assistance</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <button
              onClick={onModifySearch}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-[#146EF5] bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
            >
              Modify Search
            </button>
          </div>
        </div>

        {/* Clear Transparency Banner */}
        <div className="mb-6 p-3.5 bg-blue-50/80 border border-blue-200/80 rounded-xl flex items-start gap-2.5 text-xs text-blue-900">
          <Info className="w-4 h-4 text-[#146EF5] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Indicative inventory & fare preview: </span>
            Actual real-time seat numbers, airline fare classes, and driver dispatch are verified directly by our direct travel desk prior to final payment and ticket issuance.
          </div>
        </div>

        {/* Main Grid: Filters Sidebar + Results List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Filters Sidebar */}
          <aside className={`lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-6 ${
            mobileFilterOpen ? 'block' : 'hidden lg:block'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-500" />
                Refine Options
              </span>
              <button
                onClick={() => {
                  setBusFilterAC('all');
                  setBusFilterType('all');
                  setFlightStops('all');
                  setFlightAirlines('all');
                  setCarCategoryFilter('all');
                }}
                className="text-xs text-blue-600 hover:underline cursor-pointer"
              >
                Reset
              </button>
            </div>

            {/* Flight Filters */}
            {service === 'flights' && (
              <div className="space-y-5 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Stops
                  </label>
                  <div className="space-y-1.5">
                    {[
                      { id: 'all', label: 'All Flights' },
                      { id: '0', label: 'Non-Stop Only' },
                      { id: '1', label: '1 Stop' },
                    ].map((st) => (
                      <label key={st.id} className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900">
                        <input
                          type="radio"
                          name="flightStops"
                          checked={flightStops === st.id}
                          onChange={() => setFlightStops(st.id as any)}
                          className="accent-[#146EF5]"
                        />
                        <span>{st.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Airlines
                  </label>
                  <div className="space-y-1.5">
                    {['all', 'IndiGo', 'Air India', 'Akasa Air', 'Emirates'].map((air) => (
                      <label key={air} className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900">
                        <input
                          type="radio"
                          name="flightAirline"
                          checked={flightAirlines === air}
                          onChange={() => setFlightAirlines(air)}
                          className="accent-[#146EF5]"
                        />
                        <span className="capitalize">{air === 'all' ? 'All Carriers' : air}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    <span>Max Price</span>
                    <span className="font-mono tabular-nums text-slate-900">₹{flightMaxPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="4000"
                    max="25000"
                    step="500"
                    value={flightMaxPrice}
                    onChange={(e) => setFlightMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#146EF5] cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Bus Filters */}
            {service === 'buses' && (
              <div className="space-y-5 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Climate Control
                  </label>
                  <div className="space-y-1.5">
                    {[
                      { id: 'all', label: 'All Buses' },
                      { id: 'ac', label: 'AC Buses Only' },
                      { id: 'non-ac', label: 'Non-AC' },
                    ].map((ac) => (
                      <label key={ac.id} className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900">
                        <input
                          type="radio"
                          name="busAC"
                          checked={busFilterAC === ac.id}
                          onChange={() => setBusFilterAC(ac.id as any)}
                          className="accent-[#146EF5]"
                        />
                        <span>{ac.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Seat Style
                  </label>
                  <div className="space-y-1.5">
                    {[
                      { id: 'all', label: 'Sleeper & Seater' },
                      { id: 'sleeper', label: 'Luxury Sleeper Berth' },
                      { id: 'seater', label: 'Reclining Seater' },
                    ].map((st) => (
                      <label key={st.id} className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900">
                        <input
                          type="radio"
                          name="busSeatType"
                          checked={busFilterType === st.id}
                          onChange={() => setBusFilterType(st.id as any)}
                          className="accent-[#146EF5]"
                        />
                        <span>{st.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    <span>Max Price</span>
                    <span className="font-mono tabular-nums text-slate-900">₹{busMaxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="400"
                    max="2000"
                    step="50"
                    value={busMaxPrice}
                    onChange={(e) => setBusMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#146EF5] cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Car Filters */}
            {service === 'cars' && (
              <div className="space-y-5 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Vehicle Category
                  </label>
                  <div className="space-y-1.5">
                    {['all', 'Sedan', 'SUV', 'Premium', 'Tempo Traveller', 'Luxury'].map((cat) => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer text-slate-600 hover:text-slate-900">
                        <input
                          type="radio"
                          name="carCat"
                          checked={carCategoryFilter.toLowerCase() === cat.toLowerCase()}
                          onChange={() => setCarCategoryFilter(cat)}
                          className="accent-[#146EF5]"
                        />
                        <span className="capitalize">{cat === 'all' ? 'All Fleet Categories' : cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                  <strong>Delhi NCR Coverage:</strong> Includes all pickups from Aerocity, Central Delhi, Noida, and Gurgaon with commercial permits.
                </div>
              </div>
            )}

            {/* Coach & Rail Info in Sidebar */}
            {(service === 'coaches' || service === 'trains') && (
              <div className="text-xs text-slate-600 space-y-3">
                <div className="font-semibold text-slate-900">Direct Travel Desk Coordination</div>
                <p className="leading-relaxed">
                  For charter coaches and rail ticketing, our operations team verifies route clearances, highway toll estimates, and passenger manifest allocations.
                </p>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="font-semibold text-slate-800">Support Hotline:</div>
                  <div className="font-mono text-blue-600 font-bold">{businessConfig.whatsappDisplay}</div>
                </div>
              </div>
            )}
          </aside>

          {/* Results Main List */}
          <main className="lg:col-span-9 space-y-4">
            
            {/* Sort Bar (for Flights and Buses) */}
            {(service === 'flights' || service === 'buses') && (
              <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-2 px-3 text-xs">
                <span className="text-slate-500 font-medium">Sort by:</span>
                <div className="flex items-center gap-1">
                  {(['recommended', 'cheapest', 'fastest'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveSort(tab)}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-colors capitalize cursor-pointer ${
                        activeSort === tab
                          ? 'bg-[#071A2F] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 1. FLIGHT RESULTS RENDER */}
            {service === 'flights' && (
              <div className="space-y-3">
                {filteredFlights.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
                    <p className="text-slate-700 font-semibold">No flights match the current filter criteria.</p>
                    <button
                      onClick={() => {
                        setFlightStops('all');
                        setFlightAirlines('all');
                        setFlightMaxPrice(25000);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg"
                    >
                      Reset Flight Filters
                    </button>
                  </div>
                ) : (
                  filteredFlights.map((flight) => (
                    <div
                      key={flight.id}
                      className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      {/* Carrier info */}
                      <div className="flex items-center gap-3 min-w-[140px]">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-700 text-xs shrink-0">
                          {flight.airlineCode}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{flight.airline}</div>
                          <div className="text-[11px] text-slate-500 font-mono">{flight.flightNumber} · {flight.aircraftType}</div>
                        </div>
                      </div>

                      {/* Flight Timings & Duration */}
                      <div className="flex items-center gap-4 sm:gap-6 flex-1 justify-center text-center">
                        <div>
                          <div className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                            {flight.departureTime}
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium">
                            {flight.departureCity.split(' ')[0]}
                          </div>
                        </div>

                        <div className="flex flex-col items-center min-w-[90px]">
                          <span className="text-[11px] font-semibold text-slate-400">{flight.duration}</span>
                          <div className="w-full flex items-center gap-1 my-1">
                            <span className="h-0.5 flex-1 bg-slate-200" />
                            <Plane className="w-3.5 h-3.5 text-blue-500 shrink-0 transform rotate-90" />
                            <span className="h-0.5 flex-1 bg-slate-200" />
                          </div>
                          <span className="text-[10px] text-slate-500 font-medium">
                            {flight.stops === 0 ? 'Non-Stop' : `${flight.stops} Stop`}
                          </span>
                        </div>

                        <div>
                          <div className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                            {flight.arrivalTime}
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium">
                            {flight.arrivalCity.split(' ')[0]}
                          </div>
                        </div>
                      </div>

                      {/* Baggage & Cabin tags */}
                      <div className="hidden md:flex flex-col text-[11px] text-slate-500 text-left min-w-[130px]">
                        <span className="font-semibold text-slate-700">{flight.cabin}</span>
                        <span>{flight.baggage}</span>
                        <span className="text-emerald-700">{flight.mealIncluded ? 'Meal Included' : 'Buy on Board'}</span>
                      </div>

                      {/* Pricing & CTA */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 min-w-[130px]">
                        <div>
                          <div className="text-xs text-slate-400 text-right">Indicative fare</div>
                          <div className="text-lg sm:text-xl font-extrabold font-mono text-[#071A2F] tabular-nums">
                            ₹{flight.indicativePrice.toLocaleString('en-IN')}
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            onSelectOption({
                              service: 'flights',
                              title: `${flight.airline} (${flight.flightNumber})`,
                              route: routeTitle,
                              date: dateTitle,
                              passengers: travellersCount,
                              price: `₹${flight.indicativePrice.toLocaleString('en-IN')}`,
                              details: `Cabin: ${flight.cabin} · ${flight.baggage} · Duration: ${flight.duration} (${flight.departureTime} - ${flight.arrivalTime})`,
                              rawItem: flight,
                            })
                          }
                          className="px-4 py-2 bg-[#146EF5] hover:bg-[#0E5AD0] text-white text-xs font-bold rounded-lg transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
                        >
                          Select Flight
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* 2. BUS RESULTS RENDER */}
            {service === 'buses' && (
              <div className="space-y-3">
                {filteredBuses.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
                    <p className="text-slate-700 font-semibold">No buses match your active filters.</p>
                    <button
                      onClick={() => {
                        setBusFilterAC('all');
                        setBusFilterType('all');
                        setBusMaxPrice(2000);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg"
                    >
                      Reset Bus Filters
                    </button>
                  </div>
                ) : (
                  filteredBuses.map((bus) => (
                    <div
                      key={bus.id}
                      className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="min-w-[170px]">
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          <span>{bus.operator}</span>
                          {bus.isPopular && (
                            <span className="text-[10px] text-amber-700 font-semibold">
                              Popular
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-600 mt-0.5">{bus.busType}</div>
                        <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                          <Bus className="w-3.5 h-3.5 text-blue-500" />
                          <span>{bus.availableSeats} seats remaining</span>
                        </div>
                      </div>

                      {/* Schedule info */}
                      <div className="flex items-center gap-4 sm:gap-6 flex-1 justify-center text-center">
                        <div className="text-left sm:text-center">
                          <div className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                            {bus.departureTime}
                          </div>
                          <div className="text-[11px] text-slate-500 max-w-[120px] truncate">
                            {bus.departurePoint}
                          </div>
                        </div>

                        <div className="flex flex-col items-center min-w-[80px]">
                          <span className="text-[11px] font-semibold text-slate-400">{bus.duration}</span>
                          <div className="w-full flex items-center gap-1 my-1">
                            <span className="h-0.5 flex-1 bg-slate-200" />
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            <span className="h-0.5 flex-1 bg-slate-200" />
                          </div>
                          <span className="text-[10px] text-slate-500 font-medium">Intercity Express</span>
                        </div>

                        <div className="text-right sm:text-center">
                          <div className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                            {bus.arrivalTime}
                          </div>
                          <div className="text-[11px] text-slate-500 max-w-[120px] truncate">
                            {bus.arrivalPoint}
                          </div>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="hidden lg:flex flex-col text-[11px] text-slate-500 text-left min-w-[140px] space-y-0.5">
                        <span className="font-semibold text-slate-700">Included Amenities:</span>
                        {bus.amenities.slice(0, 2).map((am, i) => (
                          <span key={i} className="flex items-center gap-1 text-slate-600">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                            {am}
                          </span>
                        ))}
                      </div>

                      {/* Pricing & CTA */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 min-w-[130px]">
                        <div>
                          <div className="text-xs text-slate-400 text-right">Indicative fare</div>
                          <div className="text-lg sm:text-xl font-extrabold font-mono text-[#071A2F] tabular-nums">
                            ₹{bus.indicativePrice}
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            onSelectOption({
                              service: 'buses',
                              title: `${bus.operator} (${bus.busType})`,
                              route: routeTitle,
                              date: dateTitle,
                              passengers: travellersCount,
                              price: `₹${bus.indicativePrice}`,
                              details: `Boarding: ${bus.departurePoint} at ${bus.departureTime} · Drop: ${bus.arrivalPoint} · Amenities: ${bus.amenities.join(', ')}`,
                              rawItem: bus,
                            })
                          }
                          className="px-4 py-2 bg-[#146EF5] hover:bg-[#0E5AD0] text-white text-xs font-bold rounded-lg transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
                        >
                          Select Bus
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* 3. CAR RENTAL RESULTS RENDER (DELHI NCR) */}
            {service === 'cars' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCars.map((car) => (
                    <div
                      key={car.id}
                      className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all p-5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-blue-700 tracking-wider uppercase">
                            {car.category}
                          </span>
                          <span className="text-[11px] text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            Delhi NCR Fleet
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 mb-1">
                          {car.name}
                        </h3>
                        <p className="text-xs text-slate-500 mb-3">
                          {car.popularFor}
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                          <div>👥 {car.seats} Passengers</div>
                          <div>⚙️ {car.transmission}</div>
                          <div>⛽ {car.fuel}</div>
                          <div>❄️ Powerful AC</div>
                          <div className="col-span-2 text-[11px] text-slate-500">🧳 {car.luggage}</div>
                        </div>

                        <div className="space-y-1 text-xs border-t border-slate-100 pt-3">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Local (8h / 80km package):</span>
                            <span className="font-bold text-slate-900 font-mono">{car.indicativeLocal8h80k}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Outstation Rate:</span>
                            <span className="font-bold text-slate-900 font-mono">{car.indicativeOutstationPerKm}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400">Driver & Chauffeur included</span>
                        <button
                          onClick={() =>
                            onSelectOption({
                              service: 'cars',
                              title: `${car.name} (${car.category})`,
                              route: routeTitle,
                              date: dateTitle,
                              passengers: `${car.seats} Seater`,
                              price: `${car.indicativeLocal8h80k} / ${car.indicativeOutstationPerKm}`,
                              details: `Category: ${car.category} · Fuel: ${car.fuel} · Chauffeur Driven · Delhi NCR Base`,
                              rawItem: car,
                            })
                          }
                          className="px-4 py-2 bg-[#146EF5] hover:bg-[#0E5AD0] text-white text-xs font-bold rounded-lg transition-transform active:scale-95 cursor-pointer"
                        >
                          Enquire on WhatsApp
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. COACH RENTAL RESULTS RENDER (PAN INDIA GROUP CHARTER) */}
            {service === 'coaches' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {demoCoaches.map((coach) => (
                    <div
                      key={coach.id}
                      className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all p-5 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
                            PAN INDIA CHARTER
                          </span>
                          <span className="text-sm font-extrabold text-[#071A2F]">
                            {coach.capacityRange}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 mb-1">
                          {coach.categoryName}
                        </h3>
                        <div className="text-xs text-slate-600 mb-3 font-medium">
                          {coach.vehicleType}
                        </div>

                        <div className="space-y-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 mb-3">
                          <div className="text-slate-700 font-semibold">Recommended For:</div>
                          <div className="flex flex-wrap gap-1">
                            {coach.recommendedUseCases.map((uc, i) => (
                              <span key={i} className="text-[11px] text-slate-600">
                                • {uc}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1 text-xs text-slate-500 mb-4">
                          <div><strong>Climate:</strong> {coach.acStatus}</div>
                          <div><strong>Luggage:</strong> {coach.luggageCapacity}</div>
                          <div><strong>Indicative:</strong> <span className="font-semibold text-slate-900 font-mono">{coach.indicativeBaseRate}</span></div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400">All-India Tourist Permit</span>
                        <button
                          onClick={() =>
                            onSelectOption({
                              service: 'coaches',
                              title: `${coach.capacityRange} - ${coach.categoryName}`,
                              route: routeTitle,
                              date: dateTitle,
                              passengers: coach.capacityRange,
                              price: coach.indicativeBaseRate,
                              details: `Vehicle: ${coach.vehicleType} · AC: ${coach.acStatus} · Use Cases: ${coach.recommendedUseCases.join(', ')}`,
                              rawItem: coach,
                            })
                          }
                          className="px-4 py-2 bg-[#146EF5] hover:bg-[#0E5AD0] text-white text-xs font-bold rounded-lg transition-transform active:scale-95 cursor-pointer"
                        >
                          Request Quote
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. TRAIN RESULTS RENDER (PAN INDIA ASSISTANCE) */}
            {service === 'trains' && (
              <div className="space-y-3">
                {demoTrains.map((tr) => (
                  <div
                    key={tr.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all p-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          <Train className="w-4 h-4 text-amber-600" />
                          <span>{tr.trainName}</span>
                          <span className="font-mono text-slate-500 text-xs">#{tr.trainNumber}</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">Runs: {tr.runningDays}</div>
                      </div>

                      <div className="flex items-center gap-6 text-center text-xs">
                        <div>
                          <div className="text-base font-bold font-mono text-slate-900 tabular-nums">{tr.departureTime}</div>
                          <div className="text-slate-500 text-[11px]">{tr.departureStation}</div>
                        </div>
                        <div className="text-slate-400 font-semibold">{tr.duration}</div>
                        <div>
                          <div className="text-base font-bold font-mono text-slate-900 tabular-nums">{tr.arrivalTime}</div>
                          <div className="text-slate-500 text-[11px]">{tr.arrivalStation}</div>
                        </div>
                      </div>
                    </div>

                    {/* Classes grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-3 border-t border-slate-100">
                      {tr.classes.map((cls, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-bold text-slate-900">{cls.code} - {cls.name}</div>
                            <div className="text-[11px] text-slate-500 font-mono">₹{cls.indicativePrice}</div>
                          </div>
                          <button
                            onClick={() =>
                              onSelectOption({
                                service: 'trains',
                                title: `${tr.trainName} (#${tr.trainNumber}) - Class ${cls.code}`,
                                route: `${tr.departureStation} → ${tr.arrivalStation}`,
                                date: dateTitle,
                                passengers: travellersCount,
                                price: `₹${cls.indicativePrice}`,
                                details: `Class: ${cls.name} (${cls.code}) · Departure: ${tr.departureTime} · Arrival: ${tr.arrivalTime}`,
                                rawItem: tr,
                              })
                            }
                            className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-semibold cursor-pointer"
                          >
                            Enquire
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </main>
        </div>

      </div>
    </section>
  );
};
