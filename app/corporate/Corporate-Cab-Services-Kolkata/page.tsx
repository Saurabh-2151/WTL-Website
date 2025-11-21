"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import CabBookingForm from "@/components/CabBookingForm";
import BusBookingForm from "@/components/BusBookingForm";
import HotelBookingForm from "@/components/HotelBookingForm";
import FlightBookingForm from "@/components/FlightBookingForm";
import HomestaysBookingForm from "@/components/HomestaysBookingForm";
import HolidayBookingForm from "@/components/HolidayBookingForm";
import FloatingIcons from "@/components/FloatingIcons";
import InquiryPopup from "@/components/InquiryPopup";
import InquiryForm from "@/components/InquiryForm";
import Head from "next/head";

// Counter hook for animated numbers
const useCounter = (target: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const startTime = Date.now();
            const animate = () => {
              const currentTime = Date.now();
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              setCount(Math.floor(target * progress));
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(target);
              }
            };
            animate();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return { count, elementRef };
};

// FAQ Item Component
function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <button
        className="w-full text-left p-4 focus:outline-none flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 pt-0 border-t border-gray-200">
          <p className="text-gray-600">{answer}</p>
        </div>
      </div>
    </div>
  );
}

// Main Page Component
export default function KolkataCorporateCabServicePage() {
  const [hasError, setHasError] = useState(false);
  const [activeTab, setActiveTab] = useState('cabs');
  const [isInquiryFormOpen, setIsInquiryFormOpen] = useState(false);

  // Handler for opening inquiry form
  const handleInquiryClick = () => {
    setIsInquiryFormOpen(true);
  };

  // Handler for closing inquiry form
  const handleInquiryClose = () => {
    setIsInquiryFormOpen(false);
  };

  // Initialize counters with updated values
  const personalCabsCounter = useCounter(30);
  const registeredCabsCounter = useCounter(500);
  const citiesCounter = useCounter(100);
  const officesCounter = useCounter(50);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderBookingForm = () => {
    switch (activeTab) {
      case 'cabs':
        return <CabBookingForm />;
      case 'buses':
        return <BusBookingForm />;
      case 'flights':
        return <FlightBookingForm />;
      case 'hotels':
        return <HotelBookingForm />;
      case 'homestays':
        return <HomestaysBookingForm />;
      case 'holiday':
        return <HolidayBookingForm />;
      default:
        return <CabBookingForm />;
    }
  };

  if (hasError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 max-w-lg w-full">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                There was an error loading this page. Please try again later.
              </p>
            </div>
          </div>
        </div>
        <Link href="/" className="text-blue-500 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  try {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Corporate Cab Service in Kolkata | WTL Tourism Pvt Ltd</title>
          <meta
            name="description"
            content="WTL Tourism Pvt. Ltd. offers reliable corporate cab services in Kolkata, providing safe, cost-effective, and professional employee transportation solutions since 2016. Serving 50+ corporate offices with 500+ registered cabs across Salt Lake, New Town, and beyond."
          />
          <link
            rel="canonical"
            href="https://www.worldtriplink.com/corporate/Corporate-Cab-Service-Kolkata"
          />
          <meta name="author" content="WTL Tourism" />
          <meta
            name="keywords"
            content="corporate cab service in Kolkata, employee transportation services in Kolkata, corporate employee transport services in Kolkata, staff shuttle service in Kolkata, best office cab service in Kolkata, monthly corporate cab rental Kolkata, corporate travel management Kolkata, employee cab service Kolkata, corporate taxi Kolkata, staff pickup and drop Kolkata"
          />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Navbar onTabChange={handleTabChange} disableForm={true} />
        
        {/* Hero Section with Background */}
        <div className="relative h-[550px] w-full">
          <div className="absolute inset-0">
            <Image
              src="/images/Kolkata place.jpg"
              alt="Kolkata Corporate Cab Service"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="relative z-10 h-full">
            <div className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 w-full mx-auto h-full flex flex-col justify-center">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Corporate Cab Service in Kolkata
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Safe, Reliable & Cost-Effective Employee Transportation
                </p>
                {/* <p className="text-lg text-white/80 max-w-3xl mx-auto mt-4">
                  WTL Tourism Pvt. Ltd., established in 2016 in Pune, now operates in Kolkata and Mumbai, serving 50+ corporate offices with 500+ registered cabs, including 30+ personal cabs for door-to-door employee transportation solutions.
                </p> */}
              </div>
              
              {renderBookingForm()}
            </div>
          </div>
        </div>

        <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
                <div className="text-center mb-8">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                  <strong>Corporate cab service in Kolkata</strong> is no longer a luxury but a necessity for businesses aiming to provide safe, reliable, and cost effective employee transportation. Established in <strong>2016 in Pune, Worldtriplink (WTL Tourism Pvt Ltd)</strong> has grown into one of India’s most trusted names in corporate cab services. From humble beginnings, WTL today operates with a strong presence in <strong>Mumbai</strong> and <strong>Kolkata</strong>, serving 50+ corporate offices, managing 500+ registered cabs, and offering <strong>door to door employee commute solutions</strong> with unmatched professionalism.
                  </p>
                  <br />
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                  Whether it’s <strong>daily office commute</strong>, <strong>staff shuttle services</strong>, or <strong>dedicated long term contracts</strong>, WTL is redefining how companies in Kolkata approach corporate mobility. With a fleet of 30+ personal cabs, eco friendly vehicles, and shared & exclusive travel packages, WTL combines <strong>safety, comfort, and affordability</strong> backed by a reliable fleet management system and <strong>real time tracking for peace of mind.</strong>
                  </p>
                </div>
                <div className="w-full max-w-7xl mx-auto">
              <div className="mb-8">
              </div>               
              </div>
            </div>
          </section>

       {/* Main Content */}
       <main className="bg-gray-50 w-full">
          {/* Available Cabs Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                    About WTL Tourism Pvt Ltd A Trusted Corporate Mobility Partner
                  </h2>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 shadow-lg">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                    Founded in 2016 in Pune, WTL Tourism Pvt Ltd began with a simple vision: to make corporate travel in India safer, more reliable, and more efficient. Over the years, this vision has transformed into reality, making WTL a trusted partner for businesses, IT parks, multinational companies, and SMEs.
                  </p>
                  </div>
                </div>

                <div className="w-full max-w-7xl mx-auto">
              <div className="mb-8">
                <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                  Key Company Highlights:
                </h4>
              </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                  {/* Statistics Cards */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-blue-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2" ref={personalCabsCounter.elementRef}>
                        {personalCabsCounter.count}+
                      </h4>
                      <p className="text-gray-600">Dedicated Personal Cabs for corporate executives</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-purple-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2" ref={registeredCabsCounter.elementRef}>
                        {registeredCabsCounter.count}+
                      </h4>
                      <p className="text-gray-600">Registered Cabs across India</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-green-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2" ref={citiesCounter.elementRef}>
                        {citiesCounter.count}+
                      </h4>
                      <p className="text-gray-600">Operations spanning 100+ cities with specialized focus on Mumbai & Kolkata</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-red-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2" ref={officesCounter.elementRef}>
                        {officesCounter.count}+
                      </h4>
                      <p className="text-gray-600">Trusted by 50+ corporate offices for daily staff commute.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-orange-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Affordable pricing with zero hidden charges.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-teal-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-teal-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Well maintained, sanitized, and air-conditioned vehicles for comfort and hygiene.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-pink-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-pink-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Door to door employee pick up and drop off with multi location support.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-indigo-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Monthly & weekly rental packages customized for businesses.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-lime-50 to-lime-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-lime-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Eco friendly, fuel efficient fleet aligned with sustainable travel practices.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-amber-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-amber-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Easy monthly invoicing with GST compliant billing.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-cyan-50 to-cyan-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-cyan-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4 2 2 0 002 2m10 0h2a2 2 0 002-2v-3a2 2 0 110-4 2 2 0 00-2-2h-2m-5 0a9 9 0 100 18 9 9 0 000-18zm0 0a9 9 0 019 9" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Real time GPS tracking to ensure employee safety.</p>
                    </div>
                  </div>
                </div>
                <p className="mt-12 text-gray-600">WTL isn’t just a cab booking company it is a <strong>complete corporate transportation partner</strong> trusted for <strong>punctuality, professionalism, and reliability.</strong></p>
              </div>
            </div>
          </section>

          {/* Service Offerings Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Service Offerings What Makes WTL Different?</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p>WTL’s offerings go beyond just “a cab with a driver.” We provide <strong>end-to-end employee mobility solutions</strong> designed for businesses in Kolkata.</p>
                <ul>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Employee pick up and drop services for seamless daily commutes</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Shared and exclusive cabs for cost efficiency and privacy</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Shuttle services for IT parks and BPO hubs</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Monthly cab rentals for predictable costs</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Outstation corporate travel for business trips</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Efficient fleet management with real time tracking</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Eco-friendly and fuel-efficient ride options</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">24/7 operational support for uninterrupted service</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Corporate Cab Service Provider Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Cab Service Provider in Kolkata</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                As a <strong>leading corporate cab service provider in Kolkata</strong>, WTL understands the challenges faced by HR managers, admin teams, and business owners. Employee transportation isn’t just about convenience it impacts <strong>attendance, punctuality, safety, and employee satisfaction.</strong></p>
                <p className="text-gray-700 leading-relaxed mb-6">
                We provide <strong>custom transportation packages</strong> that fit different business requirements. Whether your office is in <strong>Salt Lake, New Town, Park Street, or Sector V IT hub</strong>, WTL ensures <strong>timely arrival and safe departure of employees.</strong></p>
              </div>
            </div>
          </section>
{/* Why Companies Prefer WTL Section */}
<section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Companies Prefer WTL?</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Scalable fleet:</strong> Handle 10 employees or 1000 employees.</li>
                  <br/>
                  <li><strong>Cost transparency:</strong> No hidden surcharges or unpredictable bills.</li>
                  <br/>
                  <li><strong>Data-driven travel management:</strong> Reports & analytics for HR/Admin.</li>
                  <br/>
                  <li><strong>Trusted drivers:</strong> Verified, trained, and experienced.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                Our reputation as a <strong>corporate cab service provider in Kolkata</strong> comes from <strong>real results</strong>lower employee absenteeism, better punctuality, and improved employee morale.
                </p>
              </div>
            </div>
          </section>

          {/* Employee Transportation Company Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee Transportation Company Kolkata</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                Employee transportation is no longer a perk; it is an essential <strong>HR policy</strong> for modern businesses in Kolkata. As a specialized <strong>employee transportation company in Kolkata</strong>, WTL ensures:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong> Safe late-night travel</strong>for IT & BPO employees.</li>
                  <br/>
                  <li><strong>Comfortable commutes</strong> with AC seating, music, and hygiene.</li>
                  <br/>
                  <li><strong>On-time arrivals</strong> to reduce workplace disruptions.</li>
                  <br/>
                  <li><strong>Fuel efficient routes</strong>with GPS optimization.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                For example, an IT company in <strong>Salt Lake Sector V</strong> partnered with WTL in 2023. With our <strong>shared shuttle system</strong>, they reduced <strong>employee commute costs by 35%</strong> while improving <strong>staff punctuality by 42%</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                This is why WTL is recognized as a trusted <strong>employee transportation company in Kolkata</strong>, serving <strong>startups, IT firms, banks, and manufacturing units</strong> alike.
                </p>
              </div>
            </div>
          </section>

          {/* Staff Shuttle Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Staff Shuttle Service for Companies Kolkata</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                The demand for <strong>staff shuttle service in Kolkata</strong> has surged, especially in IT parks and BPO hubs. WTL offers <strong>dedicated corporate shuttles</strong> that operate on fixed routes, picking up employees from residential clusters and dropping them at office premises.                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                <strong>Features of WTL Shuttle Services :</strong>
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Fixed route shared cabs</strong>for cost efficiency.</li>
                  <br/>
                  <li><strong>AC mini-vans & sedans for staff transport.</strong>for staff transport.</li>
                  <br/>
                  <li><strong>Monthly reporting dashboards</strong>for HR.</li>
                  <br/>
                  <li><strong>Real time tracking</strong>so companies can monitor fleet movement.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This system is particularly useful for companies with <strong>large workforce clusters</strong> in <strong>Howrah, Dum Dum, and New Town</strong>. By outsourcing staff shuttle services to WTL, companies save <strong>time, effort, and operational cost</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Best Office Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Best Office Cab Service in Kolkata</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  When businesses search for the <strong>best office cab service in Kolkata</strong>, they look for three things: <strong>reliability, affordability, and safety</strong>. WTL offers all three.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Reliability:</strong> 98% on-time record across our Kolkata operations.</li>
                  <li><strong>Affordability:</strong> Transparent pricing with corporate discounts.</li>
                  <li><strong>Safety:</strong> Sanitized cars, trained drivers, and GPS monitoring.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  From <strong>small startups to Fortune 500 companies</strong>, WTL has earned the reputation of being the <strong>best office cab service in Kolkata</strong> by ensuring employee satisfaction through stress-free commuting.
                </p>
              </div>
            </div>
          </section>

         {/* Monthly Corporate Cab Rental Section */}
<section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Monthly Corporate Cab Rental Kolkata</h4>
    <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
      <p className="text-gray-700 leading-relaxed mb-4">
        For companies that require predictable costs and uninterrupted service, WTL offers <strong>monthly corporate cab rental packages in Kolkata.</strong>
      </p>
      <p className="text-gray-700 leading-relaxed mb-2"><strong>Benefits of Monthly Rentals:</strong></p>
      <ul className="list-disc pl-6 text-gray-700 mb-4"> 
        <li>Fixed monthly cost – easier budgeting.</li>
        <li>Dedicated cabs allocated to your office.</li>
        <li>Priority support with replacement cabs in case of breakdown.</li>
        <li>Custom packages – weekly, monthly, and quarterly.</li>
      </ul>
      <p className="text-gray-700 leading-relaxed mb-6">
        This model is perfect for <strong>IT companies, hospitals, and financial institutions</strong> that need continuous staff mobility.
      </p>
    </div>
</div>
</section>

          {/* Employee Transport Solutions Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee transport solutions Kolkata</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Every company’s commute needs are different. That’s why WTL provides <strong>customized employee transport solutions in Kolkata</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2"><strong>Types of Solutions:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Shared employee cabs</strong> – budget-friendly.</li>
                  <li><strong>Dedicated executive cabs</strong> – for senior management.</li>
                  <li><strong>Multi-location pick-ups</strong> – for large corporate teams.</li>
                  <li><strong>Emergency cab dispatch</strong> – for urgent requirements.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Our <strong>employee transport solutions</strong> are trusted by companies like IT startups, consulting firms, and call centers in Kolkata.
                </p>
              </div>
            </div>
          </section>


          {/* Corporate Travel Management Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee transport solutions Kolkata</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                WTL isn’t just about office commute—we are a corporate travel management company in Kolkata.
                </p>
                <br/>
                <br/>
                <p><strong>We handle:</strong></p>
                <ul className="list-disc pl-6">
                  <li><strong>Intercity travel</strong> for business meetings.</li>
                  <br/>
                  <li><strong>Airport transfers</strong> for executives.</li>
                  <br/>
                  <li><strong>Event & conference transport</strong> for staff.</li>
                  <br/>
                  <li><strong>Pan-India corporate travel coordination.</strong></li>
                </ul>
                <br/>
                With our <strong>500+ cabs and 100+ city network</strong>, WTL is uniquely positioned to manage <strong>end-to-end corporate mobility</strong>.
              </div>
            </div>
          </section>

          {/* Dedicated Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Dedicated cab service for employees Kolkata</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                Some businesses prefer <strong>dedicated cab services</strong> for executives or specific teams. WTL provides <strong>exclusive cabs for employees in Kolkata</strong> that are permanently assigned to a company for daily use.
                </p>
                <br/>
                <br/>
                <p><strong>This ensures:</strong></p>
                <ul className="list-disc pl-6">
                  <li><strong>Privacy & comfort.</strong></li>
                  <br/>
                  <li><strong>Driver consistency</strong> Same driver daily for trust building.</li>
                  <br/>
                  <li><strong>Faster commutes</strong> with no shared routes.</li>
                </ul>
                <br/>
                This is highly preferred by <strong>law firms, banks, and IT managers.</strong>
                </div>
            </div>
          </section>

          {/* Outsourced Employee Transportation Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Outsourced Employee Transportation Kolkata</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                Managing an in-house transport team is costly. That’s why many businesses prefer <strong>outsourced employee transportation in Kolkata.</strong> </p>
                <p>WTL takes full responsibility for:</p>
                <ul className="list-disc pl-6">
                  <li>Fleet management.</li>
                  <li>Driver allocation.</li>
                  <li>Scheduling & routing.</li>
                  <li>Billing & compliance.</li>
                </ul>
                <br/>
                This saves businesses up to <strong>40% operational cost</strong> and allows them to focus on <strong>core business activities</strong>.
                </div>
            </div>
          </section>

          {/* Corporate Cab Fleet Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Cab Fleet Service Kolkata</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  WTL operates a <strong>dedicated corporate cab fleet service in Kolkata.</strong> With <strong>500+ vehicles</strong>, our fleet ranges from:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Sedans</li>
                  <li>SUVs</li>
                  <li>Tempo travelers</li>
                  <li>Mini-vans</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Each vehicle is equipped with <strong>AC, GPS, and sanitized interiors</strong>. Our fleet is monitored <strong>24/7</strong> to ensure <strong>punctuality and safety</strong>.
                </p>
            </div>
          </div>
        </section>

          {/* Business Cab Booking Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Business Cab Booking Kolkata</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Businesses can now simplify commute management with <strong>corporate cab booking in Kolkata</strong> via WTL’s centralized system.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Bulk cab booking</strong> for events & daily commute.</li>
                  <li><strong>One-click reservation portal</strong> for HR teams.</li>
                  <li><strong>Flexible packages</strong> for daily, weekly, or monthly travel.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This has helped companies reduce <strong>administrative workload</strong> while ensuring smooth transport operations.
                </p>
            </div>
          </div>
        </section>

          {/* Long-term Corporate Cab Contract Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Long-term Corporate Cab Contract Kolkata</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  WTL offers <strong>long-term corporate cab contracts in Kolkata</strong> for organizations that need continuous services.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2"><strong>Advantages:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Fixed annual pricing.</strong></li>
                  <li><strong>Guaranteed fleet availability.</strong></li>
                  <li><strong>Dedicated account manager.</strong></li>
                  <li><strong>Customized reporting & dashboards.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Long-term contracts provide stability and peace of mind for <strong>IT companies, banks, and government offices.</strong>
                </p>
            </div>
          </div>
        </section>

          {/* IT Company Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">IT Company Cab Service Kolkata</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kolkata is home to numerous IT companies in <strong>Sector V, Salt Lake, and Rajarhat.</strong> WTL specializes in <strong>IT company cab services in Kolkata</strong>, offering <strong>late-night drops, early-morning pick-ups, and multi-shift scheduling.</strong>
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Our IT clients value us for:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-6">
                  <li><strong>Round-the-clock operations.</strong></li>
                  <li><strong>Safety protocols for women employees.</strong></li>
                  <li><strong>Flexible shuttle routes</strong> for large teams.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Corporate Taxi with Invoice Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Taxi with Invoice Kolkata</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  For businesses that require <strong>GST-compliant invoices</strong>, WTL provides <strong>corporate taxis with invoice</strong> in Kolkata.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Easy monthly billing.</strong></li>
                  <li><strong>Tax-compliant reports.</strong></li>
                  <li><strong>Centralized invoicing</strong> for multiple branches.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This ensures <strong>transparency and accounting accuracy</strong>.
                </p>
            </div>
          </div>
        </section>

          {/* Staff Pickup and Drop Cab Provider Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Staff Pickup and Drop Cab Provider Kolkata</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  WTL is recognized as a <strong>reliable staff pick-up and drop cab provider in Kolkata</strong>, covering <strong>Howrah, New Alipore, Salt Lake, Park Circus, and beyond</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Employees enjoy:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Door-to-door service.</strong></li>
                  <li><strong>Punctual schedules.</strong></li>
                  <li><strong>Comfortable seating.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This service has improved <strong>employee retention and satisfaction</strong> for many of our clients.
                </p>
            </div>
          </div>
        </section>

          {/* Why Choose Us Section */}
         {/* Why Choose WTL for Corporate Cab Service in Kolkata Section */}
         <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose WTL for Corporate Cab Service in Kolkata?</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-200 rounded-xl p-6 shadow-lg">
                  <div className="text-blue-700 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Affordable Pricing</h4>
                  <p className="text-gray-600">No hidden charges with transparent billing</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-200 rounded-xl p-6 shadow-lg">
                  <div className="text-green-700 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Safety First</h4>
                  <p className="text-gray-600">Sanitized, well-maintained vehicles with GPS tracking</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-200 rounded-xl p-6 shadow-lg">
                  <div className="text-purple-700 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Pan-Kolkata Coverage</h4>
                  <p className="text-gray-600">From Salt Lake to Howrah</p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-200 rounded-xl p-6 shadow-lg">
                  <div className="text-red-700 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4 2 2 0 002 2m10 0h2a2 2 0 002-2v-3a2 2 0 110-4 2 2 0 00-2-2h-2m-5 0a9 9 0 100 18 9 9 0 000-18zm0 0a9 9 0 019 9" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Real time Tracking</h4>
                  <p className="text-gray-600">Employee security guaranteed</p>
                </div>

                <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center gap-8">
                  <div className="bg-gradient-to-br from-orange-50 to-orange-200 rounded-xl p-6 shadow-lg max-w-sm">
                    <div className="text-orange-700 mb-4">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">500+ Cabs</h4>
                    <p className="text-gray-600">Scalable for any company size</p>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-teal-200 rounded-xl p-6 shadow-lg max-w-sm">
                    <div className="text-teal-700 mb-4">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Flexible Packages</h4>
                    <p className="text-gray-600">Weekly, monthly, long-term</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Case Study Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Case Study – Improving Commute for a Kolkata IT Firm</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  In <strong>2022</strong>, a leading IT company in <strong>Salt Lake Sector V</strong> faced challenges with <strong>late-night staff commute</strong>. Employee satisfaction scores were dropping, and HR was struggling to manage vendor coordination.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">WTL stepped in with:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-6">
                  <li><strong>Dedicated night-shift cabs.</strong></li>
                  <li><strong>Female employee safety measures.</strong></li>
                  <li><strong>Monthly invoicing system.</strong></li>
                </ul>
                <h4 className="text-2xl font-semibold text-gray-900 mb-4">Results After 6 Months:</h4>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">42% increase in employee punctuality</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">35% reduction in transport costs</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Improved retention due to safer commutes</span>
                  </li>
                </ul>
                <br/>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This success story reflects how WTL goes beyond “transport” to become a <strong>strategic HR partner.</strong>
                </p>
              </div>
            </div>
          </section>


            {/* Conclusion Section */}
            <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Conclusion</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                If you are a business in Kolkata searching for a<strong> reliable, safe, and affordable corporate cab service in Kolkata</strong>, look no further than <strong>Worldtriplink (WTL Tourism Pvt Ltd)</strong>. Since 2016, we have been transforming corporate mobility in <strong>Pune, Mumbai, and Kolkata</strong>, delivering <strong>employee transportation solutions that businesses can trust.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-20 w-full bg-gradient-to-br from-blue-600 to-purple-700 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ 
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                backgroundSize: '30px 30px'
              }}></div>
            </div>
            
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-12">
                <h4 className="text-4xl md:text-5xl font-bold mb-6"> Call to Action</h4>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                Contact WTL Tourism Pvt Ltd today to discuss your requirements and experience <strong>stress-free corporate cab services in Kolkata</strong> with a brand that India’s top companies already trust.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <a href="tel:+919130030053" className="group">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📞</div>
                    <h4 className="text-2xl font-semibold mb-2">Phone</h4>
                    <p className="text-lg text-white/90">+91 9130030053</p>
                    <div className="mt-4 text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                      Click to call us directly
                    </div>
                  </div>
                </a>
                
                <a href="mailto:contact@worldtriplink.com" className="group">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📧</div>
                    <h4 className="text-2xl font-semibold mb-2">Email</h4>
                    <p className="text-lg text-white/90">contact@worldtriplink.com</p>
                    <div className="mt-4 text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                      Click to send us an email
                    </div>
                  </div>
                </a>
                
                <div className="group">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📍</div>
                    <h4 className="text-2xl font-semibold mb-2">Address</h4>
                    <p className="text-lg text-white/90">Kharadi, Pune</p>
                    <div className="mt-4 text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                      Visit our office
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-16 text-center">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-md mx-auto">
                  <a
                    href="/"
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-blue-600 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-w-[140px]"
                  >
                    Book Now
                  </a>

                  <button
                    onClick={handleInquiryClick}
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-blue-600 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer min-w-[140px]"
                  >
                    Enquiry Now
                  </button>
                </div>
              </div>
            </div>
          </section>

          <Footer />
          <FloatingIcons />
          <InquiryPopup
            serviceName="Corporate Cab Service in Kolkata"
            serviceSlug="Corporate-Cab-Service-Kolkata"
          />
          <InquiryForm
            isOpen={isInquiryFormOpen}
            onClose={handleInquiryClose}
            serviceName="Corporate Cab Service in Kolkata"
            serviceSlug="Corporate-Cab-Service-Kolkata"
          />
        </main>
      </div>
    );
  } catch (error) {
    setHasError(true);
    return null;
  }
}