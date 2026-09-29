import React, { useState, useEffect } from 'react';
import { TravelService, EnquiryDraft } from './types';
import { Header } from './components/Header';
import { HeroSearch } from './components/HeroSearch';
import { TrustStrip } from './components/TrustStrip';
import { ResultsView } from './components/ResultsView';
import { PopularRoutes } from './components/PopularRoutes';
import { WhyCapital } from './components/WhyCapital';
import { ServiceDiscovery } from './components/ServiceDiscovery';
import { PlanningTimeline } from './components/PlanningTimeline';
import { CorporateSection } from './components/CorporateSection';
import { GroupTravelSection } from './components/GroupTravelSection';
import { DestinationNetwork } from './components/DestinationNetwork';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { BookingDrawer } from './components/BookingDrawer';
import { MyEnquiryModal } from './components/MyEnquiryModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { getWhatsAppUrl, generateGeneralMessage } from './data/travelData';

export default function App() {
  const [activeService, setActiveService] = useState<TravelService>('flights');
  
  // Results display state
  const [hasSearched, setHasSearched] = useState(false);
  const [currentSearchParams, setCurrentSearchParams] = useState<any>(null);

  // Drawer state for booking/enquiry
  const [bookingDrawerOpen, setBookingDrawerOpen] = useState(false);
  const [selectedBookingOption, setSelectedBookingOption] = useState<{
    service: TravelService;
    title: string;
    route: string;
    date: string;
    passengers: number | string;
    price?: number | string;
    details: string;
    rawItem?: any;
  } | null>(null);

  // Session Enquiries state (stores user travel requests in the current session)
  const [enquiries, setEnquiries] = useState<EnquiryDraft[]>(() => {
    try {
      const saved = sessionStorage.getItem('cft_enquiries');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default initial sample to showcase session state as specified in Section 28
    return [
      {
        id: 'enq-initial-1',
        createdAt: '10:45 AM',
        service: 'flights',
        route: 'Delhi (DEL) → Dubai (DXB)',
        date: '20 Sep',
        passengers: 2,
        optionTitle: 'Emirates (EK-511) - Economy',
        indicativePrice: '₹22,400',
        details: 'Cabin: Economy (International) · 30 kg Check-in · Non-Stop 3h 55m',
        status: 'Ready to Confirm via WhatsApp',
      },
    ];
  });

  const [myEnquiriesOpen, setMyEnquiriesOpen] = useState(false);

  // Keep sessionStorage in sync
  useEffect(() => {
    try {
      sessionStorage.setItem('cft_enquiries', JSON.stringify(enquiries));
    } catch {
      // ignore
    }
  }, [enquiries]);

  // Handle Search Submission
  const handleExecuteSearch = (service: TravelService, params: any) => {
    setActiveService(service);
    setCurrentSearchParams(params);
    setHasSearched(true);
    
    // Smooth scroll down to results section
    setTimeout(() => {
      const resultsEl = document.getElementById('search-results-section');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Modify Search
  const handleModifySearch = () => {
    const searchSection = document.getElementById('search-module');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Option Selected -> Opens Booking Drawer
  const handleSelectOption = (optionData: {
    service: TravelService;
    title: string;
    route: string;
    date: string;
    passengers: number | string;
    price?: number | string;
    details: string;
    rawItem?: any;
  }) => {
    setSelectedBookingOption(optionData);
    setBookingDrawerOpen(true);
  };

  // Save enquiry to session list
  const handleSaveToSession = (draft: EnquiryDraft) => {
    setEnquiries((prev) => [draft, ...prev.filter((item) => item.id !== draft.id)]);
  };

  const handleRemoveEnquiry = (id: string) => {
    setEnquiries((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAllEnquiries = () => {
    setEnquiries([]);
  };

  // Direct WhatsApp open
  const handleOpenWhatsAppDirect = (messageText: string) => {
    const url = getWhatsAppUrl(messageText);
    window.open(url, '_blank');
  };

  // Popular route selection handler
  const handleSelectPopularRoute = (route: {
    from: string;
    to: string;
    service: TravelService;
  }) => {
    setActiveService(route.service);
    const params = {
      from: route.from,
      to: route.to,
      travelDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      passengers: 2,
    };
    handleExecuteSearch(route.service, params);
  };

  // Destination Network route select handler
  const handleNetworkRouteSelect = (from: string, to: string, service: TravelService) => {
    setActiveService(service);
    const params = {
      from,
      to,
      travelDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      passengers: 2,
    };
    handleExecuteSearch(service, params);
  };

  const scrollToSearch = () => {
    const searchSection = document.getElementById('search-module');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-[#0F172A]">
      {/* 3-Zone Top Navigation Contract */}
      <Header
        enquiryCount={enquiries.length}
        onOpenMyEnquiries={() => setMyEnquiriesOpen(true)}
        onBookEnquireClick={scrollToSearch}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section & Central Travel Command Search Engine */}
        <HeroSearch
          activeService={activeService}
          onSelectService={(srv) => {
            setActiveService(srv);
          }}
          onExecuteSearch={handleExecuteSearch}
          onOpenWhatsAppDirect={handleOpenWhatsAppDirect}
        />

        {/* Horizontal Trust Strip */}
        <TrustStrip />

        {/* Results View (Rendered when user searches) */}
        {hasSearched && (
          <div id="search-results-section">
            <ResultsView
              service={activeService}
              searchParams={currentSearchParams}
              onSelectOption={handleSelectOption}
              onModifySearch={handleModifySearch}
            />
          </div>
        )}

        {/* Popular Searches & Travel Corridors */}
        <PopularRoutes onSelectRoute={handleSelectPopularRoute} />

        {/* Why Capital Fleet & Travels (6 Trust Pillars) */}
        <WhyCapital />

        {/* Service Discovery (6 Distinctive Cards) */}
        <ServiceDiscovery
          onSelectService={(srv) => {
            setActiveService(srv);
          }}
        />

        {/* Editorial Planning Timeline (Plan -> Search -> Choose -> Confirm -> Travel) */}
        <PlanningTimeline />

        {/* Corporate Travel Section (Dark Premium Section) */}
        <CorporateSection />

        {/* Group Travel & Coach Charters */}
        <GroupTravelSection
          onPlanGroupClick={() => {
            setActiveService('coaches');
            scrollToSearch();
          }}
        />

        {/* Destination Discovery & Pan-India Network */}
        <DestinationNetwork onRouteSelect={handleNetworkRouteSelect} />

        {/* Client Reviews & Experiences */}
        <TestimonialsSection />

        {/* Frequently Asked Questions */}
        <FAQSection />

        {/* High-Impact Final CTA */}
        <FinalCTA onStartBooking={scrollToSearch} />
      </main>

      {/* Footer */}
      <Footer
        onSelectService={(srv) => {
          setActiveService(srv);
          scrollToSearch();
        }}
      />

      {/* Slide-over Booking Details Drawer */}
      <BookingDrawer
        isOpen={bookingDrawerOpen}
        onClose={() => setBookingDrawerOpen(false)}
        selection={selectedBookingOption}
        onSaveToSession={handleSaveToSession}
      />

      {/* My Enquiries Session Modal */}
      <MyEnquiryModal
        isOpen={myEnquiriesOpen}
        onClose={() => setMyEnquiriesOpen(false)}
        enquiries={enquiries}
        onRemoveEnquiry={handleRemoveEnquiry}
        onClearAll={handleClearAllEnquiries}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />
    </div>
  );
}
