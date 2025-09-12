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
export default function KochiCorporateCabServicePage() {
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
          <title>Corporate Cab Service in Kochi | WTL Tourism Pvt Ltd</title>
          <meta
            name="description"
            content="WTL Tourism Pvt. Ltd. offers reliable corporate cab services in Kochi, providing safe, cost-effective, and professional employee transportation solutions since 2016. Serving 50+ corporate offices with 500+ registered cabs across Infopark, Kakkanad, and beyond."
          />
          <link
            rel="canonical"
            href="https://www.worldtriplink.com/corporate/Corporate-Cab-Service-Kochi"
          />
          <meta name="author" content="WTL Tourism" />
          <meta
            name="keywords"
            content="corporate cab service in Kochi, employee transportation services in Kochi, corporate employee transport services in Kochi, staff shuttle service in Kochi, best office cab service in Kochi, monthly corporate cab rental Kochi, corporate travel management Kochi, employee cab service Kochi, corporate taxi Kochi, staff pickup and drop Kochi"
          />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Navbar onTabChange={handleTabChange} disableForm={true} />
        
        {/* Hero Section with Background */}
        <div className="relative h-[550px] w-full">
          <div className="absolute inset-0">
            <Image
              src="/images/kochi.jpg"
              alt="Kochi Corporate Cab Service"
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
                  Corporate Cab Service in Kochi
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Safe, Reliable & Cost-Effective Employee Transportation
                </p>
              </div>
              
              {renderBookingForm()}
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
                    <strong>Corporate cab service in Kochi</strong> is no longer just an added convenience it has become a backbone of efficient business operations in Kerala’s commercial hub. In a city where traffic congestion and long commutes can eat away at productivity, reliable transportation isn’t optional it’s essential. That’s where <strong>Worldtriplink (WTL Tourism Pvt Ltd)</strong> makes all the difference.
                  </p>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                    Founded in <strong>2016 in Pune</strong>, WTL has grown into one of India’s most trusted names in corporate and employee transportation. With strong operations in <strong>Mumbai and Kochi</strong>, WTL today proudly manages over <strong>500+ registered cabs</strong>, <strong>30+ personal cabs</strong>, and services <strong>50+ corporate offices</strong> across <strong>100+ cities</strong> in India.
                  </p>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                    WTL isn’t just another transport vendor—it is a <strong>corporate mobility partner</strong> committed to <strong>punctuality, safety, affordability</strong>, and comfort. From daily <strong>staff shuttle services</strong> to monthly <strong>employee cab rentals</strong>, WTL has become a name corporates in Kochi rely on for smooth employee commuting.
                  </p>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                    This detailed guide will show why WTL is the <strong>most trusted corporate cab service in Kochi</strong>, break down its <strong>unique service offerings</strong>, and explain how businesses save costs and improve employee satisfaction with WTL’s solutions.
                  </p>
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
                    Worldtriplink (WTL) was built on a vision: to simplify employee commuting through technology, safety, and efficiency. Starting small in <strong>2016</strong> in Pune, today WTL has expanded into a nationwide presence.
                  </p>
                  <br />
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                   <strong>Quick Facts about WTL:</strong>
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mt-4 text-left space-y-2">
                    <li><strong>500+ registered cabs</strong> across India</li>
                    <br />
                    <li><strong>30+ personal cabs</strong> for premium corporate clients</li>
                    <br />
                    <li><strong>100+ cities covered nationwide</strong></li>
                    <br />
                    <li><strong>50+ corporate offices served daily</strong></li>
                  </ul>
                </div>
              </div>

              <div className="w-full max-w-7xl mx-auto">
                <h4 className="text-2xl font-semibold text-gray-900 mb-6 text-left">What Sets WTL Apart?</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-blue-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Affordable Pricing: No hidden charges, transparent billing.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-green-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Sanitized & Safe Fleet: Vehicles cleaned daily, drivers trained.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-purple-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Punctual Service: Strict adherence to pick-up and drop schedules.</p>
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
                      <p className="text-gray-600">Pan Mumbai & Kochi Coverage: Covering all major corporate hubs.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-orange-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Flexible Options: Shared or exclusive employee transport.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-teal-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-teal-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Door-to-Door Solutions: Employee convenience first.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-pink-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-pink-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Eco-Friendly Vehicles: Supporting sustainability goals.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-indigo-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4 2 2 0 002 2m10 0h2a2 2 0 002-2v-3a2 2 0 110-4 2 2 0 00-2-2h-2m-5 0a9 9 0 100 18 9 9 0 000-18zm0 0a9 9 0 019 9" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Real-Time GPS Tracking: Safety for employees, transparency for corporates.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-lime-50 to-lime-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-lime-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Easy Monthly Invoicing: Simplified GST-compliant billing.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-amber-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-amber-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Fleet Management Expertise: Reliable, scalable, and technology-driven.</p>
                    </div>
                  </div>
                </div>
                <p className="mt-12 text-gray-600 text-left">WTL isn’t just moving people it’s ensuring companies in Kochi run on time, every day.</p>
              </div>
            </div>
          </section>

          {/* Best Corporate Cab Service in Kochi Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Best Corporate Cab Service in Kochi</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  What makes a company the <strong>best corporate cab service in Kochi</strong>? Not just big promises, but measurable results.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Take the example of a <strong>leading IT company in Infopark Kochi</strong> with 700 employees working in rotating shifts. Their pain points were <strong>delays in commuting</strong>, <strong>lack of accountability from vendors</strong>, and <strong>increasing HR complaints</strong>.  
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                WTL stepped in and implemented:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Optimized shuttle routes</strong> to reduce travel time by 30%</li>
                  <br />
                  <li><strong>98% on-time pick-up/drop success rate</strong></li>
                  <br />
                  <li><strong>Dedicated corporate account manager</strong> for daily oversight</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The result? Employee satisfaction scores jumped by <strong>40%</strong>, and HR escalations dropped drastically.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2"><strong>Why clients call WTL the best in Kochi:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Largest fleet network in Kerala’s IT hub</li>
                  <br />
                  <li>24/7 operational support.</li>
                  <br />
                  <li>Customized solutions from <strong>50 to 1000+ employees</strong></li>
                  <br />
                  <li>Trusted by top IT, BPO, and finance companies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Corporate Cab Service Provider in Kochi Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Cab Service Provider in Kochi</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  As a <strong>corporate cab service provider in Kochi</strong>, WTL combines <strong>technology enabled fleet management</strong> with <strong>customer first service</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  WTL works closely with:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>IT & Tech companies</strong> in Infopark and Kakkanad</li>
                  <br />
                  <li><strong>Healthcare & hospitals</strong> around Edappally and Vytilla</li>
                  <br />
                  <li><strong>BPOs & startups</strong> spread across Kochi city</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Every corporate client has different commuting challenges. Some want <strong>dedicated cabs</strong> for executives, while others need <strong>shared employee shuttle services</strong>. WTL assigns a <strong>relationship manager</strong> for every corporate client to design a <strong>tailor made transport plan</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This provider-first approach makes WTL a <strong>long term mobility partner</strong> for Kochi’s leading businesses.
                </p>
              </div>
            </div>
          </section>

          {/* Employee Transportation Company Kochi Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee Transportation Company Kochi</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  WTL doesn’t stop at being a cab vendor it functions as a <strong>complete employee transportation company in Kochi</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Services include:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Shift-based cabs</strong> for IT/BPO night shifts</li>
                  <br />
                  <li><strong>Special safety programs</strong> for women employees (panic alerts + tracking)</li>
                  <br />
                  <li><strong>Corporate event shuttles</strong> for large gatherings</li>
                  <br />
                  <li><strong>Holiday-season transportation packages</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  For HR teams, WTL becomes an <strong>extension of their department</strong>, managing the logistics of employee commuting while they focus on core HR tasks.
                </p>
                <br />
                <p className="text-gray-700 leading-relaxed mb-6">
                With over <strong>500+ cabs</strong> and <strong>100+ cities covered</strong>, WTL ensures that whether it’s a small startup or a global MNC, every employee reaches office on time, safely.
                </p>
              </div>
            </div>
          </section>

          {/* Staff Shuttle Service for Companies Kochi Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Staff Shuttle Service for Companies Kochi</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Companies with <strong>200+ employees</strong> find <strong>staff shuttle services</strong> more cost efficient than individual cab bookings.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">WTL’s <strong>staff shuttle service in Kochi</strong> offers:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>AC mini buses, tempo travellers, and shared cabs</strong></li>
                  <br />
                  <li><strong>AI optimized routes</strong> for reducing commute times</li>
                  <br />
                  <li><strong>Employee ride logs and attendance tracking</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This model doesn’t just reduce transport costs it creates an environment where employees can <strong>network and build team spirit during commutes.</strong>
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  For instance, a BPO with 300 employees in Kochi cut transport expenses by <strong>22%</strong> by shifting to WTL’s shuttle system.
                </p>
              </div>
            </div>
          </section>

          {/* Best Office Cab Service Kochi Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Best Office Cab Service Kochi</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Employees often complain about irregular pick ups or long wait times. WTL has changed that narrative by being the <strong>best office cab service in Kochi.</strong>
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Door-to-door pick up and drop</strong> for employees</li>
                  <br />
                  <li><strong>GPS tracking</strong> for route optimization</li>
                  <br />
                  <li><strong>45+ minutes daily time saved per employee</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  For HR and operations teams, WTL provides <strong>monthly usage reports and consolidated billing</strong>, which makes budgeting and compliance easy. This service has become highly popular in <strong>Kaloor, Vytilla, and Kakkanad</strong> corporate hubs.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                This service has become highly popular in <strong>Kaloor, Vytilla, and Kakkanad corporate hubs.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Monthly Corporate Cab Rental Kochi Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Monthly Corporate Cab Rental Kochi</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Most companies prefer predictable monthly expenses for budgeting.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">WTL’s <strong>monthly corporate cab rental in Kochi</strong> includes:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Fixed packages with <strong>no hidden costs</strong></li>
                  <br />
                  <li>Flexible fleet upgrades during high-demand seasons</li>
                  <br />
                  <li>Transparent GST-compliant invoicing</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This service works best for IT firms, healthcare organizations, and startups who need <strong>reliable transport every day.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Employee Transport Solutions Kochi Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee Transport Solutions Kochi</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  No two companies are alike. That’s why WTL designs <strong>custom employee transport solutions in Kochi.</strong>
                </p>
                <p className="text-gray-700 leading-relaxed mb-2"><strong>Examples of tailored solutions:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Shared cab services for startups</strong> with limited budgets</li>
                  <br />
                  <li><strong>Premium sedans for CXOs and executives</strong></li>
                  <br />
                  <li><strong>Shuttle buses for large enterprises</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  By using these models, WTL has helped companies reduce <strong>employee late arrivals by 30%</strong> while improving workforce morale.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Travel Management Kochi Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Travel Management Kochi</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Beyond daily staff commuting, WTL also manages <strong>corporate travel solutions in Kochi</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Services include:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Airport transfers</strong> for business executives</li>
                  <br />
                  <li><strong>Outstation travel packages</strong> to Trivandrum, Bangalore, or Coimbatore</li>
                  <br />
                  <li><strong>Conference & seminar transportation</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This one-stop solution helps companies save both <strong>administrative overhead</strong> and <strong>travel budgets</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Dedicated Cab Service for Employees Kochi Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Dedicated Cab Service for Employees Kochi</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Some corporates demand <strong>dedicated vehicles</strong> for their employees.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">WTL provides:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Exclusive cabs for <strong>CXOs and executives</strong></li>
                  <br />
                  <li>Dedicated fleets for SMEs and IT firms</li>
                  <br />
                  <li><strong>Branding on cabs</strong> for long-term contracts</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This guarantees employees a <strong>consistent and reliable commute</strong>, boosting trust and loyalty.
                </p>
              </div>
            </div>
          </section>

          {/* Outsourced Employee Transportation Kochi Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Outsourced Employee Transportation Kochi</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Maintaining an internal fleet is expensive. That’s why many corporates prefer to <strong>outsource employee transportation</strong> to WTL.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2"><strong>Benefits:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Zero maintenance headaches</li>
                  <br />
                  <li>Scalability with company growth</li>
                  <br />
                  <li>24/7 backup cabs available</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  For example, a fintech company in Kochi saved <strong>₹12 lakhs annually</strong> by outsourcing employee transport to WTL.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Cab Fleet Service Kochi Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Cab Fleet Service Kochi</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  WTL offers <strong>fleet services</strong> for corporates that need <strong>20 to 100 cabs daily.</strong></p>
                <p className="text-gray-700 leading-relaxed mb-2">Features include:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Centralized GPS based monitoring</li>
                  <br />
                  <li>Weekly fleet maintenance reports</li>
                  <br />
                  <li>Performance tracking of drivers</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This gives corporates <strong>total control over transportation operations</strong> without handling the logistics themselves.
                </p>
              </div>
            </div>
          </section>

          {/* Business Cab Booking Kochi Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Business Cab Booking Kochi</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  SMEs and startups often need <strong>flexible business cab booking services in Kochi</strong>.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Single day cabs for meetings</li>
                  <br />
                  <li>Multi day packages for client delegations</li>
                  <br />
                  <li>Instant confirmations through app/portal</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This gives businesses the <strong>flexibility of daily or occasional travel</strong> without committing to large-scale rentals.
                </p>
              </div>
            </div>
          </section>

          {/* Long-term Corporate Cab Contract Kochi Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Long term Corporate Cab Contract Kochi</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Some of WTL’s most successful partnerships come from <strong>long term contracts</strong>.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>2 to 5 year fleet contracts with IT companies</li>
                  <br />
                  <li>Dedicated cab allocations</li>
                  <br />
                  <li>Locked pricing to control budgets</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This ensures <strong>stability, reliability, and peace of mind</strong> for large corporates in Kochi.
                </p>
              </div>
            </div>
          </section>

          {/* IT Company Cab Service Kochi Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">IT Company Cab Service Kochi</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                Kochi’s <strong>IT industry</strong> works round the clock. WTL provides tailor-made <strong>IT company cab services in Kochi</strong> including:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Night shift pick up/drop with women’s safety escorts</li>
                  <br />
                  <li>Large fleets covering Infopark and Kakkanad</li>
                  <br />
                  <li>Shift synced transport schedules</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  With IT being one of Kochi’s fastest-growing industries, WTL has become the <strong>go to partner for tech-driven mobility solutions</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Taxi with Invoice Kochi Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Taxi with Invoice Kochi</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Finance teams prefer clarity and compliance. WTL provides <strong>corporate taxis with GST invoices in Kochi</strong>.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>GST compliant billing</li>
                  <br />
                  <li>Monthly consolidated invoices</li>
                  <br />
                  <li>Easy reconciliation for finance teams</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This reduces accounting stress and ensures 100% compliance.
                </p>
              </div>
            </div>
          </section>

          {/* Staff Pickup and Drop Cab Provider Kochi Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Staff Pickup and Drop Cab Provider Kochi</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  The backbone of operations is staff commuting. WTL is a leading <strong>staff pickup and drop cab provider in Kochi</strong>.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Door to door routes</li>
                  <br />
                  <li>Multi location coverage</li>
                  <br />
                  <li>Attendance tracking linked with rides</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This service is highly popular with <strong>IT companies, hospitals, and BPOs</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose WTL for Corporate Cab Service in Kochi Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose WTL for Corporate Cab Service in Kochi</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-200 rounded-xl p-6 shadow-lg">
                  <div className="text-blue-700 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Established in 2016 with 9+ years of experience.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-200 rounded-xl p-6 shadow-lg">
                  <div className="text-green-700 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Trusted by 50+ corporates across India</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-200 rounded-xl p-6 shadow-lg">
                  <div className="text-purple-700 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">500+ cabs, 100+ cities nationwide</p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-200 rounded-xl p-6 shadow-lg">
                  <div className="text-red-700 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Affordable, safe, and reliable services</p>
                </div>

                <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center gap-8">
                  <div className="bg-gradient-to-br from-orange-50 to-orange-200 rounded-xl p-6 shadow-lg max-w-sm">
                    <div className="text-orange-700 mb-4">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <p className="text-gray-600">GPS tracking and real time monitoring</p>
                  </div>
                </div>
              </div>
              <br />
              <center>
                <p className="text-gray-700 leading-relaxed mb-4">
                  With WTL, companies don’t just get a cab they get <strong>seamless corporate mobility</strong>.
                </p>
              </center>
            </div>
          </section>

          {/* Case Study Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Case Study IT Firm in Kochi</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  A leading <strong>software development company in Infopark, Kochi</strong> faced <strong>rising attrition and late arrivals</strong> due to poor transport management.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2"><strong>Challenges:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Delayed cabs</li>
                  <br />
                  <li>Women safety concerns</li>
                  <br />
                  <li>High HR escalations</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-2"><strong>WTL’s Solution:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Dedicated 50+ cab fleet</li>
                  <br />
                  <li>Real time tracking with panic alerts</li>
                  <br />
                  <li>24/7 backup vehicles</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-2"><strong>Results:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>97% on time arrivals</strong></li>
                  <br />
                  <li>Employee satisfaction up by <strong>42%</strong></li>
                  <br />
                  <li>Significant reduction in HR complaints</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">FAQs about Corporate Cab Service in Kochi</h4>
              <div className="max-w-4xl mx-auto space-y-4">
                <FaqItem
                  question="Does WTL provide 24x7 corporate cab service in Kochi?"
                  answer="Yes, WTL operates round the clock, especially for IT/BPO shift requirements."
                />
                <FaqItem
                  question="How does WTL ensure employee safety?"
                  answer="All cabs are GPS enabled, sanitized, and drivers are background verified."
                />
                <FaqItem
                  question="Can WTL handle multi location employee pickups?"
                  answer="Yes, WTL specializes in multi route optimization for large teams."
                />
                <FaqItem
                  question="Does WTL provide monthly invoicing?"
                  answer="Yes, with easy GST invoices and consolidated billing."
                />
                <FaqItem
                  question="Can startups in Kochi also use WTL?"
                  answer="Absolutely WTL provides cost effective shared cab solutions for startups."
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
                  If your business is looking for a <strong>reliable corporate cab service in Kochi</strong>, then <strong>Worldtriplink (WTL Tourism Pvt Ltd)</strong> is your ideal partner.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  With <strong>500+ cabs, 100+ cities covered, and 9+ years of expertise</strong>, WTL guarantees <strong>affordable, safe, and punctual</strong> employee transportation.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>Partner with WTL today and experience the most reliable corporate cab service in Kochi.</strong>
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
                  Contact WTL Tourism Pvt Ltd today to discuss your requirements and experience <strong>stress-free corporate cab services in Kochi</strong> with a brand that India’s top companies already trust.
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
            serviceName="Corporate Cab Service in Kochi"
            serviceSlug="Corporate-Cab-Service-Kochi"
          />
          <InquiryForm
            isOpen={isInquiryFormOpen}
            onClose={handleInquiryClose}
            serviceName="Corporate Cab Service in Kochi"
            serviceSlug="Corporate-Cab-Service-Kochi"
          />
        </main>
      </div>
    );
  } catch (error) {
    setHasError(true);
    return null;
  }
}