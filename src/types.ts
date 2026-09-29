export type TravelService =
  | 'flights'
  | 'buses'
  | 'cars'
  | 'coaches'
  | 'trains'
  | 'corporate';

export type TripType = 'one-way' | 'round-trip';
export type CarRentalType = 'local' | 'outstation' | 'airport';
export type CoachTripType = 'one-way' | 'round-trip' | 'local' | 'outstation';
export type CabinClass = 'economy' | 'premium-economy' | 'business' | 'first';

export interface FlightSearchParams {
  tripType: TripType;
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  infants: number;
  cabin: CabinClass;
}

export interface BusSearchParams {
  from: string;
  to: string;
  travelDate: string;
  passengers: number;
}

export interface CarSearchParams {
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  pickupTime: string;
  rentalType: CarRentalType;
  carCategory: string;
}

export interface CoachSearchParams {
  pickup: string;
  destination: string;
  travelDate: string;
  passengers: number;
  tripType: CoachTripType;
  coachType?: string;
}

export interface TrainSearchParams {
  from: string;
  to: string;
  journeyDate: string;
  passengers: number;
  trainClass?: string;
}

export interface CorporateSearchParams {
  companyName: string;
  travelRequirement: string;
  numberOfTravellers: string;
  travelDate: string;
  destination: string;
  serviceRequired: string;
}

export interface FlightOption {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  departureCity: string;
  departureTime: string;
  arrivalCity: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopDetails?: string;
  cabin: string;
  indicativePrice: number;
  baggage: string;
  mealIncluded: boolean;
  aircraftType: string;
  isBest?: boolean;
  isCheapest?: boolean;
  isFastest?: boolean;
}

export interface BusOption {
  id: string;
  operator: string;
  busType: string;
  isAC: boolean;
  isSleeper: boolean;
  departureTime: string;
  departurePoint: string;
  arrivalTime: string;
  arrivalPoint: string;
  duration: string;
  indicativePrice: number;
  availableSeats: number;
  amenities: string[];
  isPopular?: boolean;
}

export interface CarOption {
  id: string;
  name: string;
  category: 'Sedan' | 'SUV' | 'Premium' | 'Tempo Traveller' | 'Luxury';
  seats: number;
  transmission: 'Manual' | 'Automatic';
  fuel: 'Petrol / CNG' | 'Diesel' | 'Hybrid' | 'Electric';
  ac: boolean;
  luggage: string;
  indicativeLocal8h80k: string;
  indicativeOutstationPerKm: string;
  popularFor: string;
  isDelhiNCR: boolean;
}

export interface CoachOption {
  id: string;
  capacityRange: string;
  categoryName: string;
  vehicleType: string;
  acStatus: string;
  luggageCapacity: string;
  recommendedUseCases: string[];
  features: string[];
  indicativeBaseRate: string;
}

export interface TrainOption {
  id: string;
  trainName: string;
  trainNumber: string;
  departureTime: string;
  departureStation: string;
  arrivalTime: string;
  arrivalStation: string;
  duration: string;
  runningDays: string;
  classes: {
    code: string;
    name: string;
    indicativePrice: number;
    status: string;
  }[];
}

export interface EnquiryDraft {
  id: string;
  createdAt: string;
  service: TravelService;
  route: string;
  date: string;
  passengers: number | string;
  optionTitle: string;
  indicativePrice?: number | string;
  details: string;
  requesterName?: string;
  requesterPhone?: string;
  status: 'Ready to Confirm via WhatsApp' | 'Enquiry Sent';
}
