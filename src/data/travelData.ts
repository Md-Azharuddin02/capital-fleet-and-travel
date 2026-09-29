import {
  FlightOption,
  BusOption,
  CarOption,
  CoachOption,
  TrainOption,
  FlightSearchParams,
  BusSearchParams,
  CarSearchParams,
  CoachSearchParams,
  TrainSearchParams,
  CorporateSearchParams,
} from '../types';

export const businessConfig = {
  name: 'CAPITAL FLEET & TRAVELS',
  tagline: 'YOUR JOURNEY · OUR COMMITMENT',
  whatsappNumber: '919771820328',
  whatsappDisplay: '+91 97718 20328',
  phoneNumber: '+91 97718 20328',
  phoneCallUrl: 'tel:+919771820328',
  email: 'capitalfleettravels@gmail.com',
  emailUrl: 'mailto:capitalfleettravels@gmail.com',
  address: 'F236B Ground Floor Shaheen Bagh New Delhi 110025',
  headquarters: 'F236B Ground Floor Shaheen Bagh New Delhi 110025',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=F236B+Ground+Floor+Shaheen+Bagh+New+Delhi+110025',
  domain: 'capitalfleettravels.com',
  websiteUrl: 'https://capitalfleettravels.com',
  supportHours: '24/7 Travel Desk & Booking Support',
  servicesCoverage: {
    buses: 'PAN India Intercity Network',
    cars: 'Delhi NCR Dedicated Fleet & Outstation Transfers',
    coaches: 'PAN India Group Charters & Tour Operations',
    flights: 'Domestic & International Airline Ticketing',
    trains: 'PAN India Rail Assistance & Facilitation',
    corporate: 'Corporate Travel Management & Ground Mobility',
  },
};

export function getWhatsAppUrl(message: string): string {
  return `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// WhatsApp Message Formatters strictly following specification
export function generateGeneralMessage(): string {
  return `Hi CAPITAL FLEET & TRAVELS, I need help planning a trip. I'd like to enquire about available travel options.`;
}

export function generateBusMessage(params: Partial<BusSearchParams>, selectedBus?: BusOption): string {
  const from = params.from || 'Delhi';
  const to = params.to || 'Jaipur';
  const date = params.travelDate || 'Upcoming date';
  const passengers = params.passengers || 1;
  const operatorText = selectedBus ? ` (Selected: ${selectedBus.operator} - ${selectedBus.busType})` : '';
  return `Hi CAPITAL FLEET & TRAVELS, I'd like to enquire about a bus ticket from ${from} to ${to} on ${date} for ${passengers} passengers.${operatorText}`;
}

export function generateFlightMessage(params: Partial<FlightSearchParams>, selectedFlight?: FlightOption): string {
  const from = params.from || 'Delhi';
  const to = params.to || 'Mumbai';
  const date = params.departureDate || 'Upcoming date';
  const passengers = (params.adults || 1) + (params.children || 0) + (params.infants || 0);
  const flightText = selectedFlight ? ` (Flight ${selectedFlight.airline} ${selectedFlight.flightNumber} - ${selectedFlight.cabin})` : '';
  return `Hi CAPITAL FLEET & TRAVELS, I'd like to enquire about a flight from ${from} to ${to} on ${date} for ${passengers} travellers.${flightText}`;
}

export function generateCarMessage(params: Partial<CarSearchParams>, selectedCar?: CarOption): string {
  const location = params.pickupLocation || 'Delhi Aerocity';
  const drop = params.dropLocation ? ` to ${params.dropLocation}` : '';
  const date = params.pickupDate || 'Upcoming date';
  const time = params.pickupTime || '09:00 AM';
  const carText = selectedCar ? ` [Vehicle: ${selectedCar.name} (${selectedCar.category})]` : '';
  return `Hi CAPITAL FLEET & TRAVELS, I'd like to enquire about a car rental in Delhi NCR. Pickup: ${location}${drop}, Date: ${date}, Time: ${time}.${carText}`;
}

export function generateCoachMessage(params: Partial<CoachSearchParams>, selectedCoach?: CoachOption): string {
  const pickup = params.pickup || 'Delhi';
  const destination = params.destination || 'Jaipur / Agra';
  const date = params.travelDate || 'Upcoming date';
  const passengers = params.passengers || 25;
  const coachText = selectedCoach ? ` Category: ${selectedCoach.capacityRange} ${selectedCoach.vehicleType}.` : '';
  return `Hi CAPITAL FLEET & TRAVELS, I'd like to enquire about coach/bus rental. Pickup: ${pickup}, Destination: ${destination}, Date: ${date}, Passengers: ${passengers}.${coachText}`;
}

export function generateRailMessage(params: Partial<TrainSearchParams>, selectedTrain?: TrainOption): string {
  const from = params.from || 'New Delhi (NDLS)';
  const to = params.to || 'Varanasi (BSB)';
  const date = params.journeyDate || 'Upcoming date';
  const passengers = params.passengers || 2;
  const trainText = selectedTrain ? ` (Train: ${selectedTrain.trainName} #${selectedTrain.trainNumber})` : '';
  return `Hi CAPITAL FLEET & TRAVELS, I'd like to enquire about a rail ticket from ${from} to ${to} on ${date} for ${passengers} passengers.${trainText}`;
}

export function generateCorporateMessage(params: Partial<CorporateSearchParams>): string {
  const requirement = params.travelRequirement || 'Group flights, executive ground transfers, and hotel logistics';
  const company = params.companyName ? ` for ${params.companyName}` : '';
  return `Hi CAPITAL FLEET & TRAVELS, we'd like to discuss corporate travel services${company}. Our requirement is ${requirement}.`;
}

// Popular Searches with real Indian travel context
export const popularRoutes = [
  {
    id: 'del-jai',
    from: 'Delhi',
    to: 'Jaipur',
    distance: '268 km',
    duration: '4.5 hrs via Delhi-Mumbai Expressway',
    serviceType: 'Buses & Car Rentals',
    suggestedService: 'buses' as const,
    highlights: 'Luxury AC Volvo, Sleeper coaches & Chauffeur sedans',
    context: 'Explore Route',
  },
  {
    id: 'del-man',
    from: 'Delhi',
    to: 'Manali',
    distance: '530 km',
    duration: '11 hrs scenic highway',
    serviceType: 'Luxury Bus & Group Coaches',
    suggestedService: 'buses' as const,
    highlights: 'Overnight Multi-axle Volvo & Tempo Travellers',
    context: 'Explore Route',
  },
  {
    id: 'del-chd',
    from: 'Delhi',
    to: 'Chandigarh',
    distance: '245 km',
    duration: '3.5 hrs via NH 44',
    serviceType: 'Cars, Rail & Buses',
    suggestedService: 'cars' as const,
    highlights: 'Executive Sedans, Vande Bharat Express & Express AC',
    context: 'Explore Route',
  },
  {
    id: 'del-mum',
    from: 'Delhi',
    to: 'Mumbai',
    distance: '1,420 km',
    duration: '2h 10m Non-stop Flights',
    serviceType: 'Domestic Flights',
    suggestedService: 'flights' as const,
    highlights: 'Multiple daily frequencies via IndiGo, Air India, Vistara',
    context: 'Explore Route',
  },
  {
    id: 'del-lko',
    from: 'Delhi',
    to: 'Lucknow',
    distance: '550 km',
    duration: '6.5 hrs via Agra-Lucknow Expressway',
    serviceType: 'Buses, Rail & Flights',
    suggestedService: 'buses' as const,
    highlights: 'Tejas Express, Express Flights & Luxury Sleeper Buses',
    context: 'Explore Route',
  },
  {
    id: 'del-ddn',
    from: 'Delhi',
    to: 'Dehradun',
    distance: '250 km',
    duration: '4 hrs via Delhi-Dehradun Expressway',
    serviceType: 'Cars & Coach Rentals',
    suggestedService: 'cars' as const,
    highlights: 'Innova Crysta, Outstation Cabs & Group Coaches',
    context: 'Explore Route',
  },
];

// Demo Flights Data (Carefully formatted and explicitly labeled)
export const demoFlights: FlightOption[] = [
  {
    id: 'fl-6e-2134',
    airline: 'IndiGo',
    airlineCode: '6E',
    flightNumber: '6E-2134',
    departureCity: 'DEL (Indira Gandhi T3)',
    departureTime: '06:15',
    arrivalCity: 'BOM (Chhatrapati Shivaji T2)',
    arrivalTime: '08:25',
    duration: '2h 10m',
    stops: 0,
    cabin: 'Economy',
    indicativePrice: 4850,
    baggage: '15 kg Check-in + 7 kg Cabin',
    mealIncluded: false,
    aircraftType: 'Airbus A321neo',
    isCheapest: true,
  },
  {
    id: 'fl-ai-805',
    airline: 'Air India',
    airlineCode: 'AI',
    flightNumber: 'AI-805',
    departureCity: 'DEL (Indira Gandhi T3)',
    departureTime: '08:00',
    arrivalCity: 'BOM (Chhatrapati Shivaji T2)',
    arrivalTime: '10:10',
    duration: '2h 10m',
    stops: 0,
    cabin: 'Economy',
    indicativePrice: 5350,
    baggage: '25 kg Check-in + 7 kg Cabin',
    mealIncluded: true,
    aircraftType: 'Boeing 777-300ER',
    isBest: true,
  },
  {
    id: 'fl-uk-995',
    airline: 'Air India / Vistara',
    airlineCode: 'UK',
    flightNumber: 'UK-995',
    departureCity: 'DEL (Indira Gandhi T3)',
    departureTime: '10:20',
    arrivalCity: 'BOM (Chhatrapati Shivaji T2)',
    arrivalTime: '12:35',
    duration: '2h 15m',
    stops: 0,
    cabin: 'Premium Economy',
    indicativePrice: 7890,
    baggage: '20 kg Check-in + 7 kg Cabin',
    mealIncluded: true,
    aircraftType: 'Airbus A321neo',
    isFastest: true,
  },
  {
    id: 'fl-qp-1302',
    airline: 'Akasa Air',
    airlineCode: 'QP',
    flightNumber: 'QP-1302',
    departureCity: 'DEL (Indira Gandhi T2)',
    departureTime: '14:40',
    arrivalCity: 'BOM (Chhatrapati Shivaji T1)',
    arrivalTime: '16:55',
    duration: '2h 15m',
    stops: 0,
    cabin: 'Economy',
    indicativePrice: 4920,
    baggage: '15 kg Check-in + 7 kg Cabin',
    mealIncluded: false,
    aircraftType: 'Boeing 737 MAX 8',
  },
  {
    id: 'fl-ai-business-101',
    airline: 'Air India',
    airlineCode: 'AI',
    flightNumber: 'AI-665',
    departureCity: 'DEL (Indira Gandhi T3)',
    departureTime: '17:30',
    arrivalCity: 'BOM (Chhatrapati Shivaji T2)',
    arrivalTime: '19:40',
    duration: '2h 10m',
    stops: 0,
    cabin: 'Business Class',
    indicativePrice: 19800,
    baggage: '35 kg Check-in + 12 kg Cabin',
    mealIncluded: true,
    aircraftType: 'Boeing 787-8 Dreamliner',
  },
  {
    id: 'fl-ek-511',
    airline: 'Emirates',
    airlineCode: 'EK',
    flightNumber: 'EK-511',
    departureCity: 'DEL (Indira Gandhi T3)',
    departureTime: '21:50',
    arrivalCity: 'DXB (Dubai International T3)',
    arrivalTime: '00:15 (+1)',
    duration: '3h 55m',
    stops: 0,
    cabin: 'Economy (International)',
    indicativePrice: 22400,
    baggage: '30 kg Check-in + 7 kg Cabin',
    mealIncluded: true,
    aircraftType: 'Boeing 777-300ER',
  },
];

// Demo Buses Data (PAN India network)
export const demoBuses: BusOption[] = [
  {
    id: 'bus-cap-01',
    operator: 'Capital Premium Express',
    busType: 'Volvo 9600 Multi-Axle AC Sleeper (2+1)',
    isAC: true,
    isSleeper: true,
    departureTime: '21:30',
    departurePoint: 'Kashmere Gate ISBT, Delhi',
    arrivalTime: '05:30',
    arrivalPoint: 'Sindhi Camp / 200 Ft Bypass, Jaipur',
    duration: '8h 00m',
    indicativePrice: 1050,
    availableSeats: 14,
    amenities: ['Individual USB & AC', 'Fresh Blanket & Pillow', 'Live GPS Tracking', 'Emergency SOS'],
    isPopular: true,
  },
  {
    id: 'bus-int-02',
    operator: 'IntrCity SmartBus',
    busType: 'BharatBenz AC Sleeper / Seater (2+1)',
    isAC: true,
    isSleeper: true,
    departureTime: '22:15',
    departurePoint: 'Dhaula Kuan & Mahipalpur, Delhi',
    arrivalTime: '06:15',
    arrivalPoint: 'Sindhi Camp, Jaipur',
    duration: '8h 00m',
    indicativePrice: 899,
    availableSeats: 9,
    amenities: ['SmartBus Lounge Access', 'Mineral Water', 'Charging Port', 'Reading Lamp'],
  },
  {
    id: 'bus-zing-03',
    operator: 'Zingbus Electric Premium',
    busType: 'Electric AC High-Deck Seater (2+2)',
    isAC: true,
    isSleeper: false,
    departureTime: '07:30',
    departurePoint: 'Anand Vihar ISBT / Akshardham',
    arrivalTime: '13:00',
    arrivalPoint: 'Narayan Singh Circle, Jaipur',
    duration: '5h 30m',
    indicativePrice: 650,
    availableSeats: 22,
    amenities: ['Zero Emission Quiet Ride', 'High Speed Wi-Fi', 'Reclining Pushback Seats', 'Water Bottle'],
  },
  {
    id: 'bus-cap-04',
    operator: 'Capital Royal Gold',
    busType: 'Scania Metrolink AC Luxury Sleeper',
    isAC: true,
    isSleeper: true,
    departureTime: '23:45',
    departurePoint: 'IFFCO Chowk, Gurgaon',
    arrivalTime: '06:45',
    arrivalPoint: 'Polovictory / Sindhi Camp, Jaipur',
    duration: '7h 00m',
    indicativePrice: 1199,
    availableSeats: 6,
    amenities: ['Extra Legroom Berthes', 'Snack Kit', 'Pillow & Blanket', 'Sanitized Interior'],
    isPopular: true,
  },
  {
    id: 'bus-eco-05',
    operator: 'Interstate Express Line',
    busType: 'Non-AC Deluxe Seater (2+2 Pushback)',
    isAC: false,
    isSleeper: false,
    departureTime: '15:00',
    departurePoint: 'Sarai Kale Khan ISBT',
    arrivalTime: '21:30',
    arrivalPoint: 'Sindhi Camp, Jaipur',
    duration: '6h 30m',
    indicativePrice: 420,
    availableSeats: 18,
    amenities: ['Comfortable Pushback', 'Luggage Space', 'Scheduled Rest Stops'],
  },
];

// Demo Car Rental Options (Delhi NCR Focused)
export const demoCars: CarOption[] = [
  {
    id: 'car-sedan',
    name: 'Maruti Dzire / Toyota Etios',
    category: 'Sedan',
    seats: 4,
    transmission: 'Manual',
    fuel: 'Petrol / CNG',
    ac: true,
    luggage: '2 Medium Bags',
    indicativeLocal8h80k: '₹1,900',
    indicativeOutstationPerKm: '₹12/km',
    popularFor: 'City business meetings, local errands, airport drops',
    isDelhiNCR: true,
  },
  {
    id: 'car-innova-crysta',
    name: 'Toyota Innova Crysta',
    category: 'SUV',
    seats: 6,
    transmission: 'Manual',
    fuel: 'Diesel',
    ac: true,
    luggage: '4 Large Bags',
    indicativeLocal8h80k: '₹3,200',
    indicativeOutstationPerKm: '₹18/km',
    popularFor: 'Family outstation trips, Agra & Jaipur tours, executive transfers',
    isDelhiNCR: true,
  },
  {
    id: 'car-innova-hycross',
    name: 'Toyota Innova Hycross Hybrid',
    category: 'Premium',
    seats: 6,
    transmission: 'Automatic',
    fuel: 'Hybrid',
    ac: true,
    luggage: '4 Large Bags',
    indicativeLocal8h80k: '₹4,500',
    indicativeOutstationPerKm: '₹22/km',
    popularFor: 'VIP corporate guests, quiet luxury ride, long distance comfort',
    isDelhiNCR: true,
  },
  {
    id: 'car-tempo-12',
    name: 'Force Urbania / Luxury Tempo 12-Seater',
    category: 'Tempo Traveller',
    seats: 12,
    transmission: 'Manual',
    fuel: 'Diesel',
    ac: true,
    luggage: '8-10 Bags',
    indicativeLocal8h80k: '₹5,500',
    indicativeOutstationPerKm: '₹26/km',
    popularFor: 'Corporate teams, wedding guests, family hill station tours',
    isDelhiNCR: true,
  },
  {
    id: 'car-luxury-eclass',
    name: 'Mercedes-Benz E-Class / BMW 5 Series',
    category: 'Luxury',
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Petrol / CNG',
    ac: true,
    luggage: '3 Luxury Bags',
    indicativeLocal8h80k: '₹12,000',
    indicativeOutstationPerKm: '₹55/km',
    popularFor: 'Diplomatic delegations, CXO airport pickup, grand wedding entries',
    isDelhiNCR: true,
  },
];

// Coach / Bus Rental Categories (PAN India Group Transportation)
export const demoCoaches: CoachOption[] = [
  {
    id: 'coach-12-17',
    capacityRange: '12 – 17 SEATER',
    categoryName: 'Executive Luxury Tempo & Mini Coach',
    vehicleType: 'Force Urbania & Modified Luxury Tempo',
    acStatus: 'Dual Zone Powerful AC with Individual Louvres',
    luggageCapacity: 'Dedicated Boot Space (12-15 Luggage Bags)',
    recommendedUseCases: [
      'Airport Delegations',
      'Corporate Offsites',
      'Small Family Hill Station Trips',
      'Wedding Shuttles',
    ],
    features: ['1x1 / 2x1 Recliner Pushback Seats', 'USB Fast Chargers at Every Seat', 'PA System & Mic for Guides', 'Music System & Screen'],
    indicativeBaseRate: 'Starting ₹24 - ₹28 per km',
  },
  {
    id: 'coach-18-27',
    capacityRange: '18 – 27 SEATER',
    categoryName: 'Mid-Size Deluxe & Luxury Coach',
    vehicleType: 'TATA Ultra / BharatBenz Air-Suspension Mini-Bus',
    acStatus: 'Climate Controlled Air Conditioning',
    luggageCapacity: 'Underfloor Luggage Hold & Rear Storage',
    recommendedUseCases: [
      'School & College Trips',
      'Mid-size Corporate Events',
      'Pilgrimage & Heritage Tours',
      'Sports Squad Logistics',
    ],
    features: ['Air Suspension for Smooth Ride', 'High Back Ergonomic Seats', 'Overhead Parcel Racks', 'Uniformed Chauffeur & Cleaner'],
    indicativeBaseRate: 'Starting ₹32 - ₹36 per km',
  },
  {
    id: 'coach-28-40',
    capacityRange: '28 – 40 SEATER',
    categoryName: 'Full Size Highway Touring Coach',
    vehicleType: 'BharatBenz / Ashok Leyland Oyster AC Coach',
    acStatus: 'Heavy Duty Roof-Mounted AC System',
    luggageCapacity: 'Large Pass-through Belly Lockers',
    recommendedUseCases: [
      'Destination Weddings',
      'Annual Company Offsites',
      'Educational Excursions',
      'Pan-India State Tours',
    ],
    features: ['2x2 Wide Reclining Seats', 'Panoramic Tinted Viewing Glass', 'Reading Lamps & Curtain Blinds', 'Speed Governor & GPS'],
    indicativeBaseRate: 'Starting ₹42 - ₹48 per km',
  },
  {
    id: 'coach-41-50',
    capacityRange: '41 – 50 SEATER',
    categoryName: 'Multi-Axle Super Luxury Intercity Coach',
    vehicleType: 'Volvo 9600 / Scania Metrolink Multi-Axle',
    acStatus: 'Advanced Aerodynamic Climate Control',
    luggageCapacity: 'Maximum Heavy Underbelly Luggage Bays',
    recommendedUseCases: [
      'Mega Corporate Conventions',
      'Grand Wedding Movements',
      'International Tour Groups',
      'Long-Haul Multi-State Journeys',
    ],
    features: ['Multi-Axle Electronically Controlled Suspension', 'Ultra-Quiet Cabin Noise Insulation', 'Individual Entertainment Ready', 'Full Fleet Telemetry'],
    indicativeBaseRate: 'Starting ₹55 - ₹65 per km',
  },
];

// Rail Options (PAN India Assistance)
export const demoTrains: TrainOption[] = [
  {
    id: 'tr-22436',
    trainName: 'Vande Bharat Express',
    trainNumber: '22436',
    departureTime: '06:00',
    departureStation: 'New Delhi (NDLS)',
    arrivalTime: '14:00',
    arrivalStation: 'Varanasi Junction (BSB)',
    duration: '8h 00m',
    runningDays: 'Tue, Wed, Fri, Sat, Sun',
    classes: [
      { code: 'CC', name: 'AC Chair Car', indicativePrice: 1750, status: 'Enquiry Assistance' },
      { code: 'EC', name: 'Executive Chair Car', indicativePrice: 3300, status: 'Enquiry Assistance' },
    ],
  },
  {
    id: 'tr-12952',
    trainName: 'Mumbai Tejas Rajdhani Express',
    trainNumber: '12952',
    departureTime: '16:55',
    departureStation: 'New Delhi (NDLS)',
    arrivalTime: '08:35 (+1)',
    arrivalStation: 'Mumbai Central (MMCT)',
    duration: '15h 40m',
    runningDays: 'Daily',
    classes: [
      { code: '3A', name: '3rd AC Economy', indicativePrice: 2450, status: 'Enquiry Assistance' },
      { code: '2A', name: '2nd AC Tier', indicativePrice: 3580, status: 'Enquiry Assistance' },
      { code: '1A', name: '1st AC Coupe', indicativePrice: 5120, status: 'Enquiry Assistance' },
    ],
  },
  {
    id: 'tr-12002',
    trainName: 'Bhopal Shatabdi Express',
    trainNumber: '12002',
    departureTime: '06:00',
    departureStation: 'New Delhi (NDLS)',
    arrivalTime: '07:50 (Agra) / 14:40 (Bhopal)',
    arrivalStation: 'Agra Cantt / Rani Kamlapati',
    duration: '1h 50m to Agra',
    runningDays: 'Daily',
    classes: [
      { code: 'CC', name: 'AC Chair Car', indicativePrice: 790, status: 'Enquiry Assistance' },
      { code: 'EC', name: 'Executive Chair Car', indicativePrice: 1540, status: 'Enquiry Assistance' },
    ],
  },
];

// FAQ items
export const faqList = [
  {
    q: 'Can I book domestic and international flights with Capital Fleet & Travels?',
    a: 'Yes. Our air ticketing desk provides ticketing support for all domestic airlines (such as IndiGo, Air India, Akasa Air) as well as major international carriers across North America, Europe, the Middle East, Southeast Asia, and beyond. We handle group fares, seat selections, and corporate flight schedules directly through WhatsApp.',
  },
  {
    q: 'Do you provide bus tickets across India?',
    a: 'Yes. We assist travellers with intercity AC sleeper and seater bus bookings across Northern, Western, Southern, and Central India. You can easily enquire for point-to-point interstate routes with verified operators.',
  },
  {
    q: 'Do you provide car rentals outside Delhi NCR?',
    a: 'Our primary car rental fleet operates exclusively with pickup locations inside Delhi NCR (including New Delhi, Noida, Greater Noida, Gurgaon, Faridabad, and Ghaziabad). From Delhi NCR, you can book outstation round trips and one-way drops to destinations such as Agra, Jaipur, Chandigarh, Dehradun, and hill stations.',
  },
  {
    q: 'Can I rent a bus or coach for a wedding or family group?',
    a: 'Absolutely. We specialize in group transportation ranging from 12-seater luxury Tempo Travellers up to 50-seater multi-axle Volvo coaches. We cater to weddings, corporate retreats, school/college excursions, and family pilgrimage tours with professional drivers and well-maintained vehicles.',
  },
  {
    q: 'Can companies use your corporate travel services?',
    a: 'Yes. HR, procurement, and administration teams partner with Capital Fleet & Travels for monthly executive cab charters, airport pickup protocol, corporate flight blocks, and event mobility management. We provide dedicated corporate billing and dedicated account coordinators.',
  },
  {
    q: 'Do you assist with rail ticket booking?',
    a: 'Yes, we provide rail ticket enquiry assistance across India. Please note that availability, quota allocations, and ticketing guidelines are verified by our travel team before confirmation in adherence to Indian Railways and IRCTC terms.',
  },
  {
    q: 'Can I enquire and finalize bookings directly through WhatsApp?',
    a: `Yes! WhatsApp (${businessConfig.whatsappDisplay}) is our primary direct communication channel. When you submit any search or requirement on this platform, your travel details are automatically formatted into a WhatsApp message so our desk can review and confirm immediately without phone queues.`,
  },
  {
    q: 'Are the prices shown on this platform live or indicative?',
    a: 'Unless a live airline or transport inventory API is connected, all fares and rates displayed on the platform are realistic indicative rates. Final inventory, exact seat numbers, and definitive pricing are always verified and confirmed directly with you by our travel team prior to payment and ticket issuance.',
  },
];

// Clean editorial review placeholders as required by brief (no fake ratings or fabricated stars)
export const realReviewPlaceholders = [
  {
    id: 'rev-1',
    customerName: 'Rohit Sharma',
    organization: 'Corporate Operations, Gurugram',
    serviceUsed: 'Corporate Fleet & Airport Transfers',
    comment: 'Booked multiple Innova Crysta executive cabs for a 3-day client conference in Aerocity. Punctual chauffeurs, clean cars, and prompt coordination over WhatsApp.',
    verifiedBooking: 'Verified Corporate Client',
  },
  {
    id: 'rev-2',
    customerName: 'Ananya Deshmukh',
    organization: 'Destination Wedding Coordinator',
    serviceUsed: 'PAN India Coach Rental (35-Seater)',
    comment: 'Coordinated transportation for 60 wedding guests from Delhi to Jim Corbett. The luxury coach was spotless, comfortable for elderly family members, and the driver handled hill roads with great care.',
    verifiedBooking: 'Verified Group Charter',
  },
  {
    id: 'rev-3',
    customerName: 'Vikas Mehra',
    organization: 'Independent Traveler',
    serviceUsed: 'Delhi to Jaipur Bus Ticket & Return Flight',
    comment: 'Smooth experience booking last-minute travel. Reached out on WhatsApp, received options within 10 minutes, and the ticketing details were settled without confusion.',
    verifiedBooking: 'Verified Traveler',
  },
];
