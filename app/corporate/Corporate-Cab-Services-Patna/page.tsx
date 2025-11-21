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
        <h2 className="text-lg font-medium text-gray-900">{question}</h2>
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
export default function PatnaCorporateCabServicePage() {
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
          <title>Corporate Cab Service in Patna | WTL Tourism Pvt Ltd</title>
          <meta
            name="description"
            content="WTL Tourism Pvt. Ltd. offers reliable corporate cab services in Patna, providing safe, cost-effective, and professional employee transportation solutions since 2016. Serving 50+ corporate offices with 500+ registered cabs across IT hubs, industrial belts, and beyond."
          />
          <link
            rel="canonical"
            href="https://www.worldtriplink.com/corporate/Corporate-Cab-Service-Patna"
          />
          <meta name="author" content="WTL Tourism" />
          <meta
            name="keywords"
            content="corporate cab service in Patna, employee transportation services in Patna, corporate employee transport services in Patna, staff shuttle service in Patna, best office cab service in Patna, monthly corporate cab rental Patna, corporate travel management Patna, employee cab service Patna, corporate taxi Patna, staff pickup and drop Patna"
          />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Navbar onTabChange={handleTabChange} disableForm={true} />
        
        {/* Hero Section with Background */}
        <div className="relative min-h-[550px] w-full flex items-stretch">
          <div className="absolute inset-0">
            <Image
              src="/images/patna.jpg"
              alt="Patna Corporate Cab Service"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="relative z-10 w-full">
            <div className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 w-full mx-auto flex flex-col justify-center">
              <div className="text-center mb-8 px-2 sm:px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Corporate Cab Service in Patna
                </h1>
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

        {/* Main Content */}
        <main className="bg-gray-50 w-full">
          {/* Introduction Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="mb-8">
                <div className="flex justify-center">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center mx-auto">
                    Introduction
                  </h3>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 shadow-lg space-y-4">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                  Corporate cab service in Patna is no longer just about travel; it’s about providing a seamless, safe, and professional commuting solution for businesses and their employees. At the forefront of this transformation is <strong>Worldtriplink (WTL Tourism Pvt Ltd)</strong>. Established in <strong>2016 in Pune</strong>, WTL has grown from a regional player into one of <strong>India’s most trusted corporate cab service providers</strong>, with strong operations in <strong>Mumbai and Patna</strong>.
                  </p>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                  Over the years, WTL has become a name synonymous with <strong>punctuality, safety, and reliability</strong>. Whether you are a small startup in Patna looking for affordable employee transport solutions, or a large IT firm managing thousands of daily commutes, WTL provides a tailor-made cab service designed for your business needs.                  </p>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                  With a fleet that includes <strong>30+ personal cabs</strong>, <strong>500+ registered vehicles</strong>, and presence across <strong>100+ cities</strong>, WTL ensures your employees reach the workplace on time and return home safely. Today, <strong>50+ corporate offices</strong> across India trust us for their daily office commute solutions.                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* About WTL Tourism Pvt Ltd Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="mb-8">
                <div className="flex justify-center">
                  <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center mx-auto">
                    About WTL Tourism Pvt Ltd
                  </h4>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 shadow-lg">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                    Founded in <strong>2016 in Pune</strong>, WTL Tourism Pvt Ltd started with a clear vision: to redefine employee commute services in India. From the very beginning, WTL understood the challenges companies faced with staff transportation rising costs, unorganized fleets, safety concerns, and lack of professional management.
                  </p>
                  <br />
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                    Over the past 9+ years, WTL has built an ecosystem that addresses these concerns head on. By combining <strong>technology driven fleet management, well maintained cabs, trained chauffeurs, and customer first policies</strong>, WTL has become a preferred partner for corporate travel management in cities like <strong>Patna and Mumbai</strong>.
                  </p>
                  <br />
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                  <strong>Our Numbers Speak for Themselves:</strong>
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mt-4 text-left space-y-2">
                    <li><strong>30+ personal cabs</strong> for VIP clients and special use cases</li>
                    <br />
                    <li><strong>500+ registered cabs</strong> across multiple cities</li>
                    <br />
                    <li><strong>100+ Indian cities</strong> covered with pan-India fleet strength</li>
                    <br />
                    <li><strong>50+ corporate offices</strong> served with long-term contracts</li>
                  </ul>
                </div>
              </div>

              <div className="w-full max-w-7xl mx-auto">
                <h4 className="text-2xl font-semibold text-gray-900 mb-6 text-left">What Sets Us Apart (USPs):</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-blue-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Affordable Pricing No hidden charges</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-green-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Strict safety & hygiene standards (sanitized, well-maintained vehicles)</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-purple-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Punctual & reliable services with real-time tracking</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-red-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Coverage across Patna and Mumbai with pan city reach</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-orange-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Shared & exclusive cab options to suit every business</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-teal-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-teal-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Door to door pick-up/drop services for employees</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-pink-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-pink-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Flexible weekly & monthly packages</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-indigo-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4 2 2 0 002 2m10 0h2a2 2 0 002-2v-3a2 2 0 110-4 2 2 0 00-2-2h-2m-5 0a9 9 0 100 18 9 9 0 000-18zm0 0a9 9 0 019 9" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Air conditioned, comfortable rides</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-lime-50 to-lime-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-lime-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Eco-friendly, fuel-efficient vehicles</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-amber-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-amber-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Easy invoicing & monthly billing for companies</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


           {/* Service Offerings Section */}
           <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Service Offerings</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                WTL offers a wide range of <strong>corporate mobility solutions</strong> to suit different business needs in Patna:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Employee pick-up & drop services across Patna</li>
                  <br />
                  <li>Staff shuttle services for IT parks, manufacturing hubs, and MNCs</li>
                  <br />
                  <li>Dedicated cabs for top management & VIP clients</li>
                  <br />
                  <li>Monthly corporate cab rental plans</li>
                  <br />
                  <li>Outsourced transportation management for HR/Admin teams</li>
                  <br />
                  <li>Business cab booking with instant invoicing</li>
                  <br />
                  <li>Shared shuttle service to reduce costs for startups</li>
                  <br />
                  <li>Long term corporate cab contracts with guaranteed fleet availability</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                Each of these offerings is built with business <strong>efficiency</strong>, employee <strong>satisfaction</strong>, and cost <strong>optimization</strong> in mind.
                </p>
              </div>
            </div>
          </section>


          {/* Best Corporate Cab Service in Patna Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Best Corporate Cab Service in Patna</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  When businesses search for the <strong>best corporate cab service in Patna</strong>, they aren’t just looking for vehicles they are looking for trust, dependability, and consistency. WTL has earned this reputation through years of service to top corporate clients in the city.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Imagine this: An IT company in Patna with over 500 employees spread across different parts of the city faced daily absenteeism and late arrivals because of inconsistent local transport. After switching to WTL’s structured corporate cab solution, employee punctuality improved by <strong>38% in just 3 months</strong>, and HR reported a significant drop in attrition linked to commute stress.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                This is why WTL is considered the <strong>best corporate cab service in Patna</strong> because we don’t just provide cars, we provide <strong>solutions that transform businesses</strong>.</p>
              </div>
            </div>
          </section>

          {/* Corporate Cab Service Provider in Patna Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Cab Service Provider in Patna</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  As a leading <strong>corporate cab service provider in Patna</strong>, WTL doesn’t believe in one size fits all. Every company has unique requirements some want shuttle services across industrial belts, while others want <strong>VIP cab services for client visits</strong>.</p>
                <p className="text-gray-700 leading-relaxed mb-6">Our approach is <strong>consultative:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>We study your <strong>employee locations & shifts.</strong></li>
                  <br />
                  <li>We design <strong>cost effective routes</strong> for shared or dedicated services.</li>
                  <br />
                  <li>We assign <strong>trained chauffeurs & air conditioned vehicles.</strong></li>
                  <br />
                  <li>We implement <strong>tracking & reporting</strong> for complete transparency.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This makes us a trusted <strong>cab service provider in Patna</strong> for industries like IT, healthcare, BPO, education, and finance.
                </p>
              </div>
            </div>
          </section>

          {/* Employee Transportation Company Patna Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee Transportation Company Patna</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  For companies, arranging <strong>employee transportation</strong> is more than convenience it’s a necessity. Patna, with its growing IT and industrial hubs, demands structured solutions.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">
                WTL acts as a <strong>full service employee transportation company</strong> in Patna, helping HR teams reduce administrative stress. From <strong>fleet allocation to billing automation</strong>, everything is handled seamlessly.</p>
                <p className="text-gray-700 leading-relaxed mb-2">
                <strong>Benefits for Companies:</strong>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Higher employee retention due to safe commutes</li>
                  <br />
                  <li>Lower absenteeism & late arrivals</li>
                  <br />
                  <li>Simplified billing for finance teams</li>
                  <br />
                  <li>Positive employer branding</li>
                </ul>
                </p>
                </div>
            </div>
          </section>

          {/* Staff Shuttle Service for Companies Patna Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Staff Shuttle Service for Companies Patna</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                For organizations with <strong>bulk staff requirements</strong>, WTL offers <strong>staff shuttle service in Patna</strong>. This is ideal for <strong>IT parks, call centers, and manufacturing units</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Instead of multiple small cabs, WTL designs <strong>shared shuttle routes</strong> that pick up multiple employees along a corridor. This reduces costs, ensures timely arrival, and creates an eco-friendly commute.</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  For example, one of our manufacturing clients in Patna reduced their <strong>transportation costs by 22%</strong> after moving to WTL’s shuttle services. Employees also appreciated the air-conditioned comfort compared to public transport.
                </p>
              </div>
            </div>
          </section>

          {/* Best Office Cab Service Patna Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Best Office Cab Service Patna</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                If you’re looking for the <strong>best office cab service in Patna</strong>, WTL ensures that your team gets a <strong>reliable, on time commute every day</strong>. With <strong>door to door pick up/drop</strong>, employees can avoid the stress of local autos or buses.</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Our <strong>real time tracking</strong> ensures safety, and our <strong>flexible packages</strong> suit both startups and large enterprises.
                </p>
              </div>
            </div>
          </section>

          {/* Monthly Corporate Cab Rental Patna Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Monthly Corporate Cab Rental Patna</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  One of our most popular offerings is <strong>monthly corporate cab rental in Patna</strong>. Companies don’t want the headache of booking daily rides they want fixed, <strong>reliable services at predictable costs</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">With WTL, businesses get:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Fixed monthly charges (no hidden costs)</li>
                  <br />
                  <li>Guaranteed vehicle availability</li>
                  <br />
                  <li>Flexible route adjustments</li>
                  <br />
                  <li>Easy monthly invoicing</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Employee Transport Solutions Patna Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee Transport Solutions Patna</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Employee transport is a <strong>critical HR function</strong> in cities like Patna. WTL provides <strong>end to end employee transport solutions</strong> that combine fleet, technology, and management.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Whether it’s <strong>night shift cab services for IT companies</strong> or <strong>early morning shuttles for healthcare staff</strong>, WTL ensures employees feel safe and valued.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Travel Management Patna Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Travel Management Patna</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                Beyond daily commutes, businesses often need <strong>corporate travel management in Patna</strong> for client visits, intercity travel, and VIP logistics. WTL provides <strong>dedicated cars with invoicing</strong>, ensuring companies maintain a professional image.                </p>
              </div>
            </div>
          </section>

          {/* Dedicated Cab Service for Employees Patna Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Dedicated Cab Service for Employees Patna</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Some companies prefer a <strong>dedicated cab service for employees in Patna</strong>. WTL offers exclusive vehicles assigned to your team, ensuring <strong>flexibility, privacy, and reliability</strong>.
                </p>               
              </div>
            </div>
          </section>

          {/* Outsourced Employee Transportation Patna Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Outsourced Employee Transportation Patna</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  HR and Admin teams spend enormous time managing transport. With WTL’s <strong>outsourced employee transportation in Patna</strong>, companies can focus on their core business while we handle everything from <strong>fleet deployment</strong> to <strong>driver management</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Cab Fleet Service Patna Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Cab Fleet Service Patna</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  WTL provides a <strong>corporate cab fleet service in Patna</strong> with 500+ registered vehicles. Whether you need <strong>hatchbacks, sedans, or SUVs</strong>, we have a fleet tailored to different employee levels and company budgets.
                </p>
               
              </div>
            </div>
          </section>

          {/* Business Cab Booking Patna Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Business Cab Booking Patna</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                Need a <strong>business cab booking in Patna</strong> for clients or executives? WTL offers instant booking with <strong>professional chauffeurs</strong> and <strong>clean vehicles</strong>.
                </p>
              
              </div>
            </div>
          </section>

          {/* Long-term Corporate Cab Contract Patna Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Long term Corporate Cab Contract Patna</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                For large organizations, we recommend a <strong>long term corporate cab contract in Patna</strong>. This ensures <strong>cost savings</strong>, <strong>guaranteed availability</strong>, and <strong>predictable service levels</strong>.                </p>
        
              </div>
            </div>
          </section>

          {/* IT Company Cab Service Patna Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">IT Company Cab Service Patna</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                Patna is witnessing a surge in <strong>IT companies</strong>, and with it, the need for <strong>IT company cab services</strong>. WTL specializes in <strong>night shift and 24/7 transport solutions</strong>, ensuring IT employees are picked up and dropped home safely. </p>
                
              </div>
            </div>
          </section>

          {/* Corporate Taxi with Invoice Patna Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Taxi with Invoice Patna</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  For businesses, <strong>invoicing and transparency</strong> are critical. WTL provides <strong>corporate taxis with invoices in Patna</strong>, making expense management easy for finance departments.
                </p>
                
              </div>
            </div>
          </section>

          {/* Staff Pickup and Drop Cab Provider Patna Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Staff Pickup and Drop Cab Provider Patna</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                With <strong>multi location pick ups and drops</strong>, WTL is the most reliable <strong>staff pickup and drop cab provider in Patna</strong>. This ensures even employees in remote areas can commute safely.                </p>
              </div>
            </div>
          </section>

          {/* Why Choose WTL for Corporate Cab Service in Patna Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose WTL for Corporate Cab Service in Patna</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-200 rounded-xl p-6 shadow-lg">
                  <div className="text-blue-700 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Affordable Pricing Clear packages with no hidden costs</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-200 rounded-xl p-6 shadow-lg">
                  <div className="text-green-700 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Safety First GPS enabled cabs, background verified drivers</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-200 rounded-xl p-6 shadow-lg">
                  <div className="text-purple-700 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Pan Patna Coverage Serving all corporate hubs</p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-200 rounded-xl p-6 shadow-lg">
                  <div className="text-red-700 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Technology Driven Real time tracking & automated billing</p>
                </div>

                <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center gap-8">
                  <div className="bg-gradient-to-br from-orange-50 to-orange-200 rounded-xl p-6 shadow-lg max-w-sm">
                    <div className="text-orange-700 mb-4">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <p className="text-gray-600">9+ Years of Expertise Trusted by 50+ corporate offices.</p>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center gap-8">
                  <div className="bg-gradient-to-br from-orange-50 to-orange-200 rounded-xl p-6 shadow-lg max-w-sm">
                    <div className="text-orange-700 mb-4">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <p className="text-gray-600">On Time Every Time Fleet reliability ensures punctuality</p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Case Study Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Case Study: A Success Story</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                A <strong>leading BPO in Patna</strong> faced rising employee turnover due to unsafe and inconsistent commutes. After switching to WTL’s corporate cab service:                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Employee satisfaction scores rose by 45%</li>
                  <br />
                  <li>Attrition linked to commute stress dropped by 30%</li>
                  <br />
                  <li>HR reported saving 15 hours weekly on transport coordination</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-2">This is how WTL transforms not just commutes but entire organizations.</p>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">FAQs about Corporate Cab Service in Patna</h4>
              <div className="max-w-4xl mx-auto space-y-4">
                <FaqItem
                  question="How does WTL ensure employee safety in Patna?"
                  answer="All cabs are GPS enabled, sanitized daily, and drivers are background verified."
                />
                <FaqItem
                  question="Can we get both shared and dedicated cab services?"
                  answer="Yes. WTL offers flexible shared shuttles as well as dedicated cabs."
                />
                <FaqItem
                  question="Do you provide monthly invoicing?"
                  answer="Yes, companies receive consolidated monthly invoices for easy expense management."
                />
                <FaqItem
                  question="Is WTL’s service available across Patna?"
                  answer="Yes, we provide pan Patna coverage across business hubs, IT parks, and residential zones."
                />
              </div>
            </div>
          </section>

          {/* Conclusion Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Conclusion</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  If your business in Patna is looking for <strong>safe, reliable, and cost-effective employee commute solutions</strong>, look no further than <strong>Worldtriplink (WTL Tourism Pvt Ltd)</strong>.  With nearly a decade of experience, a <strong>500+ fleet</strong>, and trust from <strong>50+ corporate offices</strong>, WTL is the partner you need.
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
                <h4 className="text-4xl md:text-5xl font-bold mb-6">Call to Action</h4>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                Contact us today for the most trusted corporate cab service in Patna – Worldtriplink (WTL Tourism Pvt Ltd).                </p>    
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
            serviceName="Corporate Cab Service in Patna"
            serviceSlug="Corporate-Cab-Service-Patna"
          />
          <InquiryForm
            isOpen={isInquiryFormOpen}
            onClose={handleInquiryClose}
            serviceName="Corporate Cab Service in Patna"
            serviceSlug="Corporate-Cab-Service-Patna"
          />
        </main>
      </div>
    );
  } catch (error) {
    setHasError(true);
    return null;
  }
}