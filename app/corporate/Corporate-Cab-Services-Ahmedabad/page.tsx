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

// Head Section for SEO
<Head>
    <title>Corporate Cab Service in Kolkata | WTL Tourism Pvt Ltd</title>
    <meta name="description" content="WTL Tourism Pvt. Ltd. offers reliable corporate cab services in Kolkata, providing safe, cost-effective, and professional employee transportation solutions since 2016. Serving 50+ corporate offices with 500+ registered cabs across Salt Lake, New Town, Rajarhat, Park Street, and Howrah."/>
    <link rel="canonical" href="https://www.worldtriplink.com/corporate/Corporate-Cab-Service-Kolkata"/>
    <meta name="author" content="WTL Tourism"/>
    <meta name="keywords" content="corporate cab service in Kolkata, employee transportation services in Kolkata, corporate employee transport services in Kolkata, staff shuttle service in Kolkata, best office cab service in Kolkata, monthly corporate cab rental Kolkata, corporate travel management Kolkata, employee cab service Kolkata, corporate taxi Kolkata, staff pickup and drop Kolkata"/>
    <meta name="robots" content="index, follow"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</Head>

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
        <h1 className="text-lg font-medium text-gray-900">{question}</h1>
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
        <Navbar onTabChange={handleTabChange} disableForm={true} />
        
        {/* Hero Section with Background */}
        <div className="relative min-h-[550px] w-full flex items-stretch">
          <div className="absolute inset-0">
            <Image
              src="/images/Ahmedabad.png"
              alt="Ahmedabad Corporate Cab Service"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="relative z-10 w-full">
            <div className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 w-full mx-auto flex flex-col justify-center">
              <div className="text-center mb-8 px-2 sm:px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Corporate Cab Service in Ahmedabad
                </h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Safe, Reliable & Cost-Effective Employee Transportation
                </p>
              </div>
              
              <div className="w-full max-w-full sm:max-w-xl lg:max-w-3xl xl:max-w-4xl mx-auto">
                {renderBookingForm()}
              </div>
            </div>
          </div>
        </div>

        <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
                <div className="text-center mb-8">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                  <strong>Corporate cab service in Ahmedabad</strong> is more than just a commute option it’s the lifeline of modern businesses where employees rely on punctual, safe, and affordable transportation every single day. Worldtriplink (WTL Tourism Pvt Ltd), established in <strong>2016 in Pune</strong>, has become one of India’s most <strong>trusted corporate cab service providers</strong> with strong operations across Mumbai and now expanding successfully into Ahmedabad.                  </p>
                  <br />
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                  With a fleet of <strong>30+ personal cabs</strong>, <strong>500+ registered cabs</strong>, and service coverage across <strong>100+ cities</strong>, WTL has built its reputation on <strong>punctuality, safety, affordability, and reliability</strong>. Whether your business needs daily office commute solutions, staff pickup and drop services, or <strong>long term corporate travel management</strong>, WTL ensures every ride is professional, hygienic, and stress free.
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
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                    About WTL Tourism Pvt Ltd A Trusted Corporate Mobility Partner
                  </h3>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 shadow-lg">
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                    Founded in <strong>2016 in Pune</strong>, WTL Tourism Pvt Ltd started with a simple vision: to <strong>redefine employee commute solutions</strong> for companies struggling with inconsistent and costly cab arrangements. Over the years, WTL has grown into a <strong>pan-India corporate mobility leader</strong>, managing operations for <strong>50+ corporate offices</strong> in sectors like <strong>IT, finance, healthcare, manufacturing, and BPOs</strong>.
                    </p>
                  </div>
                </div>

                <div className="w-full max-w-7xl mx-auto">
              <div className="mb-8">
                <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                  Why WTL Stands Out:
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
                      <p className="text-gray-600">Affordable Pricing Transparent, no hidden charges.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-purple-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Fleet Strength 30+ personal cabs, 500+ registered vehicles.</p>
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
                      <p className="text-gray-600">Coverage 100+ cities, with strong hubs in Mumbai and Ahmedabad.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-red-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Reliability Always on time with real-time GPS tracking.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-orange-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Safety & Hygiene Sanitized vehicles, verified drivers, 24x7 monitoring.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-teal-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-teal-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Flexible Options Shared cabs, exclusive cars, or shuttle services.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-pink-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-pink-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Eco-Friendly Rides Fuel efficient and sustainable vehicle choices.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-indigo-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Corporate Billing Easy monthly invoicing and dedicated account managers.</p>
                    </div>
                  </div>
                </div>
                <p className="mt-12 text-gray-600">WTL’s mission is to ensure <strong>every employee reaches work safely, comfortably, and on time</strong>, while helping companies reduce logistics costs with optimized routes and reliable fleet management.</p>
              </div>
            </div>
          </section>

          {/* Service Offerings Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Service Offerings at a Glance</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Daily Staff Commute Solutions (pick-up/drop across Ahmedabad)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Shared Shuttle & Exclusive Car Options</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Long-Term Cab Contracts for IT/Corporate Firms</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Monthly & Weekly Rental Packages</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Door-to-Door Employee Pick-up & Drop</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Airport & Outstation Corporate Cab Services</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Real-Time Tracking & Reporting System</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Corporate Travel Management for Multi-City Offices</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Corporate Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate cab service in Ahmedabad</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                Ahmedabad, being Gujarat’s largest business hub, houses <strong>MNCs, IT companies, BPOs, textile industries, and startups</strong> that employ thousands of professionals. Ensuring timely and safe commutes is no longer optional it’s essential.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                WTL’s <strong>corporate cab service in Ahmedabad</strong> provides companies with:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li>Door-to-door pick-up and drop for employees across all zones (Satellite, SG Highway, Gota, Bopal, Naroda, Gandhinagar).</li>
                  <li>Shared & dedicated cab options depending on employee volume.</li>
                  <li>Comfortable AC vehicles ensuring stress-free daily rides.</li>
                  <li>Advanced GPS-enabled tracking for real-time monitoring and safety compliance.</li>
                  <li>Eco-friendly rides with optimized routing to reduce fuel consumption and carbon footprint.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                By partnering with WTL, businesses in Ahmedabad can cut down on operational inefficiencies, absenteeism due to commute issues, and transportation costs while enhancing employee satisfaction.                </p>
              </div>
            </div>
          </section>

          {/* Best Corporate Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Best Corporate cab service in Ahmedabad</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                When searching for the best corporate cab service in Ahmedabad, companies look for three things: reliability, affordability, and safety. WTL has perfected this formula by combining fleet strength, trained drivers, and smart technology.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                <strong>Why WTL is the Best:</strong>
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Fleet Variety</strong> Sedans, SUVs, and shared shuttles available.</li>
                  <br />
                  <li><strong>Affordable Monthly Plans</strong> Designed to suit both small startups and large corporations.</li>
                  <br />
                  <li><strong>Safety-First Approach</strong> Background-verified drivers, SOS features, and 24x7 helpline.</li>
                  <br />
                  <li><strong>Punctual Service</strong> Zero delay policy with contingency backup cabs.</li>
                  <br />
                  <li><strong>Custom Travel Solutions</strong> Tailored for IT companies, factories, and corporates with multi-location offices.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                For companies aiming to build an employee first culture, WTL’s <strong>best corporate cab service in Ahmedabad</strong> ensures staff arrive on time, refreshed, and stress-free every day.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Cab Service Provider Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate cab service provider in Ahmedabad</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                As a <strong>corporate cab service provider in Ahmedabad</strong>, WTL has built long-term trust by offering <strong>customizable contracts, reliable billing systems, and dedicated account managers</strong> for client companies.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li>500+ registered cabs ensure availability during peak hours.</li>
                  <br />
                  <li>100+ cities covered for businesses with offices outside Ahmedabad.</li>
                  <br />
                  <li>Easy monthly invoicing with GST-compliant bills for accounting teams.</li>
                  <br />
                  <li>Dedicated fleet managers for real-time issue resolution.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                Unlike unorganized cab operators, WTL brings <strong>professionalism, scale, and accountability</strong> key elements companies demand in a reliable service provider.
                </p>
              </div>
            </div>
          </section>

          {/* Employee Transportation Company Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee transportation company Ahmedabad</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                As an <strong>employee transportation company in Ahmedabad</strong>, WTL focuses on <strong>employee comfort, safety, and productivity</strong>. Reliable transportation directly impacts employee morale and punctuality.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                <strong>Benefits for Companies:</strong>
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li>Reduced absenteeism and late arrivals.</li>
                  <li>Boost in employee retention due to stress free commute.</li>
                  <li>Lower operational costs through shared shuttle planning.</li>
                  <li>Compliance with employee safety regulations.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                For sectors like <strong>IT parks, BPOs, industrial zones, and textile factories</strong>, WTL ensures <strong>bulk employee transportation</strong> with scalable fleet support.                </p>
              </div>
            </div>
          </section>

          {/* Staff Shuttle Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Staff shuttle service for companies Ahmedabad</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                WTL’s <strong>staff shuttle service for companies in Ahmedabad</strong> is ideal for large scale employee movements.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Multi location pick ups</strong> ensure every employee is covered.</li>
                  <br />
                  <li><strong>Air-conditioned shuttles</strong> provide a comfortable travel environment.</li>
                  <br />
                  <li><strong>Optimized routes</strong> reduce commute times by up to 20%.</li>
                  <br />
                  <li><strong>Real-time GPS tracking</strong> ensures security for employees, especially women.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                Industries with <strong>shift operations</strong> (IT, manufacturing, call centers) prefer WTL shuttles to ensure timely employee transitions.
                </p>
              </div>
            </div>
          </section>

          {/* Best Office Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Best office cab service Ahmedabad</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                WTL offers the <strong>best office cab service in Ahmedabad</strong> for companies that want both <strong>cost-effectiveness and high employee satisfaction</strong>.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Daily office commute packages</strong> for staff across Ahmedabad.</li>
                  <br />
                  <li><strong>Flexible billing cycles</strong> (weekly, monthly).</li>
                  <br />
                  <li><strong>Well-maintained, sanitized cabs</strong> with AC.</li>
                  <br />
                  <li><strong>Dedicated support team</strong> for real-time assistance.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                Companies using WTL’s office cab service report improved <strong>productivity and morale</strong>, as employees no longer worry about daily travel stress.
                </p>
              </div>
            </div>
          </section>

          {/* Monthly Corporate Cab Rental Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Monthly corporate cab rental Ahmedabad</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                For firms that require <strong>long-term yet flexible transportation</strong>, WTL offers <strong>monthly corporate cab rental in Ahmedabad</strong>.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Flat-rate monthly packages</strong> (cost-effective for bulk booking).</li>
                  <li><strong>Custom rental solutions</strong> for different departments/offices.</li>
                  <li><strong>Guaranteed vehicle availability</strong> regardless of demand spikes.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                This model is especially popular with <strong>startups and SMEs</strong> who want predictable costs with flexible service scalability.
                </p>
              </div>
            </div>
          </section>

          {/* Employee Transport Solutions Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee transport solutions Ahmedabad</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                WTL’s <strong>employee transport solutions in Ahmedabad</strong> combine <strong>technology, fleet strength, and operational expertise</strong>.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Automated route optimization</strong> to reduce travel time and cost.</li>
                  <li><strong>Shared shuttle models</strong> for cost sharing.</li>
                  <li><strong>Exclusive car services</strong> for senior management.</li>
                  <li><strong>Tracking dashboards</strong> for HR/admin teams.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                This end-to-end solution helps businesses <strong>focus on growth while WTL handles transportation</strong> seamlessly.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Travel Management Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate travel management Ahmedabad</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                Beyond daily commutes, WTL also provides <strong>corporate travel management in Ahmedabad</strong>.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Multi city cab coordination</strong> for companies with branches across India.</li>
                  <br />
                  <li><strong>Airport transfers for executives.</strong></li>
                  <br />
                  <li><strong>On demand corporate booking system.</strong></li>
                  <br />
                  <li><strong>Centralized billing for all travel services.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                This makes WTL a one-stop partner for both <strong>daily staff commutes and executive travel requirements.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Dedicated Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Dedicated cab service for employees Ahmedabad</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                Some companies prefer <strong>dedicated cab service for employees in Ahmedabad</strong> to ensure personalized and reliable transport.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li>Each department/team is allocated fixed cabs.</li>
                  <br />
                  <li>Ensures consistency with the same verified drivers.</li>
                  <br />
                  <li>Employees build trust with regular drivers.</li>
                  <br />
                  <li>Ideal for sensitive sectors like <strong>finance and IT security.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                WTL offers <strong>exclusive dedicated rides</strong> for organizations prioritizing employee comfort and safety.
                </p>
              </div>
            </div>
          </section>

          {/* Outsourced Employee Transportation Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Outsourced employee transportation Ahmedabad</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                Managing in-house transportation fleets can be expensive and inefficient. WTL solves this with <strong>outsourced employee transportation in Ahmedabad</strong>.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li>No need for companies to buy or maintain vehicles.</li>
                  <br />
                  <li>WTL manages <strong>fleet, drivers, and safety compliance.</strong></li>
                  <br />
                  <li>Scalable fleet as per changing employee volumes.</li>
                  <br />
                  <li>Reduces overhead costs significantly.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                This outsourcing model is why <strong>50+ corporate offices</strong> already rely on WTL.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Cab Fleet Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate cab fleet service Ahmedabad</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                WTL operates one of the most reliable <strong>corporate cab fleet services in Ahmedabad</strong>.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>30+ personal cars and 500+ registered vehicles.</strong></li>
                  <br />
                  <li><strong>Fleet management technology</strong> ensures punctual dispatch.</li>
                  <br />
                  <li><strong>Backup vehicles </strong>in case of breakdowns.</li>
                  <br />
                  <li><strong>Regular servicing and sanitization protocols.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                Companies enjoy <strong>zero disruption in daily operations</strong> thanks to WTL’s managed fleet services.
                </p>
              </div>
            </div>
          </section>

          {/* Business Cab Booking Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Business cab booking Ahmedabad</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                For <strong>business cab booking in Ahmedabad</strong>, WTL provides a <strong>tech enabled platform </strong>for hassle free reservations.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>One-click bookings </strong>via app/portal.</li>
                  <li><strong>Bulk booking options </strong>for HR/admins.</li>
                  <li><strong>Instant invoice generation.</strong></li>
                  <li><strong>24/7 support for emergencies.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                This ease of booking makes WTL the go-to partner for companies seeking <strong>flexibility and convenience</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Long-term Corporate Cab Contract Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Long-term corporate cab contract Ahmedabad</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                WTL specializes in <strong>long-term corporate cab contracts in Ahmedabad</strong> that guarantee availability, affordability, and scalability.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li>Fixed pricing for predictable budgeting.</li>
                  <br />
                  <li>Dedicated account manager.</li>
                  <br />
                  <li>Fleet expansion flexibility as company grows.</li>
                  <br />
                  <li>Service-level agreements (SLAs) for accountability.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                Many <strong>IT and BPO companies</strong> prefer long-term contracts for stability and employee satisfaction.
                </p>
              </div>
            </div>
          </section>

          {/* IT Company Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">IT company cab service Ahmedabad</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                IT companies in Kolkata operate round-the-clock. WTL’s <strong>IT company cab service in Ahmedabad</strong> ensures <strong>shift based commute solutions</strong>.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Night-shift employee safety measures.</strong></li>
                  <br />
                  <li><strong>GPS tracking + SOS features.</strong></li>
                  <br />
                  <li><strong>Bulk shuttles and exclusive cabs</strong> for IT parks.</li>
                  <br />
                  <li><strong>Optimized costs for large employee bases.</strong></li>  
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                By partnering with WTL, IT firms improve <strong>employee retention, safety compliance, and punctuality</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Taxi with Invoice Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate taxi with invoice Ahmedabad</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                For businesses that require <strong>transparent accounting</strong>, WTL offers <strong>corporate taxi with invoice in Ahmedabad</strong>.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>GST-compliant invoicing.</strong></li>
                  <li><strong>Monthly consolidated bills.</strong></li>
                  <li><strong>Easy cost tracking for finance teams.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                This ensures corporate finance teams maintain clarity and compliance without manual paperwork.
                </p>
              </div>
            </div>
          </section>

          {/* Staff Pickup and Drop Cab Provider Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Staff pickup and drop cab provider Ahmedabad</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                WTL’s <strong>staff pickup and drop cab services in Ahmedabad</strong> are tailored for both small teams and large enterprises.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Multi location coverage</strong> for scattered employee bases.</li>
                  <li><strong>On time daily pickups</strong> ensure punctuality.</li>
                  <li><strong>Hygienic AC rides</strong> for staff comfort.</li>
                  <li><strong>Round the clock service</strong> for shift workers.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                For companies in Ahmedabad’s <strong>industrial zones, IT hubs, and corporate parks</strong>, this service has become essential.
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose WTL Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose WTL for Corporate Cab Service in Ahmedabad</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-200 rounded-xl p-6 shadow-lg">
                  <div className="text-blue-700 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Experience since 2016</h4>
                  <p className="text-gray-600">Nearly a decade in corporate mobility.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-200 rounded-xl p-6 shadow-lg">
                  <div className="text-green-700 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Scalability</h4>
                  <p className="text-gray-600">From startups to enterprises with 5,000+ employees.</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-200 rounded-xl p-6 shadow-lg">
                  <div className="text-purple-700 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Pan India presence</h4>
                  <p className="text-gray-600">100+ cities, seamless travel for growing companies.</p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-200 rounded-xl p-6 shadow-lg">
                  <div className="text-red-700 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4 2 2 0 002 2m10 0h2a2 2 0 002-2v-3a2 2 0 110-4 2 2 0 00-2-2h-2m-5 0a9 9 0 100 18 9 9 0 000-18zm0 0a9 9 0 019 9" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Technology enabled</h4>
                  <p className="text-gray-600">GPS tracking, billing dashboards, real time updates.</p>
                </div>

                <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center gap-8">
                  <div className="bg-gradient-to-br from-orange-50 to-orange-200 rounded-xl p-6 shadow-lg max-w-sm">
                    <div className="text-orange-700 mb-4">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Employee first focus</h4>
                    <p className="text-gray-600">Safety, hygiene, and comfort prioritized.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Client Success Story Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Client Success Story A Leading IT Firm in Ahmedabad</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">    
                A top IT company with <strong>2,500 employees in Salt Lake, Ahmedabad</strong> faced rising commute challenges delays, safety issues, and high transportation costs. After partnering with WTL:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Commute delays dropped by 60%.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Employee satisfaction scores increased by 40% (based on internal HR survey).</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Operational costs reduced by 25% through optimized shared shuttle models.</span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                Today, this company has renewed a <strong>5-year corporate cab contract</strong> with WTL, citing reliability and cost-efficiency.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Conclusion Partner with WTL for Reliable Corporate Cab Service in Ahmedabad</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                If your company is looking for a <strong>trusted, affordable, and reliable corporate cab service in Ahmedabad</strong>, Worldtriplink (WTL Tourism Pvt Ltd) is the name to trust. With a proven track record since <strong>2016</strong>, operations across <strong>Mumbai, Pune, and Ahmedabad</strong>, and a fleet designed for <strong>employee safety, comfort, and cost-efficiency</strong>, WTL is the perfect mobility partner for your business.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                 <strong>Contact WTL today for customized corporate cab service in Ahmedabad</strong> and give your employees the safe, reliable commute they deserve.
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
                Contact WTL Tourism Pvt Ltd today for customized corporate cab service in Kolkata and give your employees the safe, reliable commute they deserve.
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