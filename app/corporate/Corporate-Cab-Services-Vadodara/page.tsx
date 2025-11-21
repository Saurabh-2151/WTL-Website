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
export default function VadodaraCorporateCabServicePage() {
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
          <title>Corporate Cab Service in Vadodara | WTL Tourism Pvt Ltd</title>
          <meta
            name="description"
            content="WTL Tourism Pvt. Ltd. offers reliable corporate cab services in Vadodara, providing safe, cost-effective, and professional employee transportation solutions since 2016. Serving 50+ corporate offices with 500+ registered cabs across IT parks, pharmaceutical hubs, and beyond."
          />
          <link
            rel="canonical"
            href="https://www.worldtriplink.com/corporate/Corporate-Cab-Service-Vadodara"
          />
          <meta name="author" content="WTL Tourism" />
          <meta
            name="keywords"
            content="corporate cab service in Vadodara, employee transportation services in Vadodara, corporate employee transport services in Vadodara, staff shuttle service in Vadodara, best office cab service in Vadodara, monthly corporate cab rental Vadodara, corporate travel management Vadodara, employee cab service Vadodara, corporate taxi Vadodara, staff pickup and drop Vadodara"
          />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Navbar onTabChange={handleTabChange} disableForm={true} />
        
        {/* Hero Section with Background */}
        <div className="relative min-h-[550px] w-full flex items-stretch">
          <div className="absolute inset-0">
            <Image
              src="/images/vadodara.jpg"
              alt="Vadodara Corporate Cab Service"
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
                  Corporate Cab Service in Vadodara
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
                    <strong>Corporate cab service in Vadodara</strong> is no longer just a convenience; it’s an essential service for companies that value employee safety, punctuality, and productivity. In a rapidly growing city like Vadodara—where IT companies, manufacturing units, pharmaceutical hubs, and service-based businesses thrive—the need for organized corporate transportation is stronger than ever.
                  </p>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                    This is where <strong>Worldtriplink (WTL Tourism Pvt Ltd)</strong> steps in as a trusted mobility partner. Established in <strong>2016 in Pune</strong>, WTL began with the vision of making corporate commuting reliable, affordable, and professional. Today, the company operates in <strong>100+ cities</strong> across India and has become a well-recognized name with strong operations in <strong>Mumbai and Vadodara</strong>.
                  </p>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                    With a robust fleet of <strong>30+ personal cars</strong> and <strong>500+ registered cabs</strong>, serving <strong>50+ corporate offices</strong> nationwide, WTL provides companies with stress-free employee transport solutions that meet modern corporate expectations.
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
                    <strong>WTL Tourism Pvt Ltd (Worldtriplink)</strong> is more than just a transport company; it is a strategic partner in corporate mobility solutions. Founded in <strong>2016 in Pune</strong>, WTL has expanded its footprint across India by offering <strong>safe, transparent, and employee-centric commuting solutions</strong>.
                  </p>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                  <strong>Key Highlights of WTL:</strong>
                  </p>
                  <br />
                  <ul className="list-disc pl-6 text-gray-700 mt-4 text-left space-y-2">
                  <li><strong>Established:</strong> 2016 in Pune</li>
                  <br />
                    <li><strong>Fleet:</strong> 30+ owned cars, 500+ registered cabs nationwide</li>
                    <br />
                    <li><strong>Reach:</strong> 100+ Indian cities, including Vadodara & Mumbai</li>
                    <br />
                    <li><strong>Corporate Clients:</strong> 50+ established businesses served</li>
                    <br />
                    <li><strong>Core Values:</strong> Safety, punctuality, affordability, and transparency</li>
                  </ul>
                </div>
              </div>

              <div className="w-full max-w-7xl mx-auto">
                <h4 className="text-2xl font-semibold text-gray-900 mb-6 text-left">What Makes WTL Stand Out?</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-blue-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Affordable pricing with no hidden charges</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-green-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Sanitized, well maintained vehicles for hygiene & safety</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-purple-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <p className="text-gray-600">On time arrivals with door to door service</p>
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
                      <p className="text-gray-600">Real time GPS tracking for employee safety</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-orange-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Options for shared and exclusive cabs</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-teal-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-teal-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Weekly & monthly packages for corporates</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-pink-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-pink-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Eco friendly, fuel efficient vehicles to support sustainability</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-indigo-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4 2 2 0 002 2m10 0h2a2 2 0 002-2v-3a2 2 0 110-4 2 2 0 00-2-2h-2m-5 0a9 9 0 100 18 9 9 0 000-18zm0 0a9 9 0 019 9" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Easy invoicing with GST compliant bills</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-lime-50 to-lime-200 rounded-xl p-6 shadow-lg">
                    <div className="text-left">
                      <div className="text-lime-700 mb-4">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <p className="text-gray-600">A dedicated fleet management system for large firms</p>
                    </div>
                  </div>
                </div>
                <p className="mt-12 text-gray-600 text-left">
                With these strengths, WTL has earned the trust of companies that value <strong>employee well being</strong> and <strong>organizational efficiency</strong>.
                </p>
              </div>
            </div>
          </section>

           {/* Service Offerings by WTL in Vadodara Section */}
           <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Service Offerings by WTL in Vadodara</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                WTL offers a comprehensive range of corporate cab services in Vadodara, tailored to meet the needs of IT firms, factories, BPOs, SMEs, and large enterprises.                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Employee pick-up and drop services</li>
                  <br />
                  <li>Staff shuttle solutions for bulk movement</li>
                  <br />
                  <li>Exclusive cabs for executives & senior managers</li>
                  <br />
                  <li>Monthly rental packages for corporates</li>
                  <br />
                  <li>Long term corporate transport contracts</li>
                  <br />
                  <li>Airport transfers for staff and clients</li>
                  <br />
                  <li>IT park specific cab services for shift based employees</li>
                  <br />
                  <li>Eco friendly options for sustainability-focused companies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Best Corporate Cab Service in Vadodara Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Best Corporate Cab Service in Vadodara</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Being recognized as the <strong>best corporate cab service in Vadodara</strong> doesn’t come overnight. It takes years of reliability, consistent service delivery, and genuine focus on customer satisfaction. WTL has earned this position by:
                </p>
                <p className="text-gray-700 leading-relaxed mb-2"><strong>What makes WTL the best?</strong></p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Offering <strong>cost effective packages</strong> that save companies 15% to 20% on transport budgets.</li>
                  <br />
                  <li>Ensuring <strong>safety first policies</strong>, including GPS enabled rides and verified drivers.</li>
                  <br />
                  <li>Maintaining <strong>punctual service</strong>, even during peak traffic hours.</li>
                  <br />
                  <li>Customizing travel plans for <strong>small startups and large enterprises alike.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Example:</strong> A Vadodara-based pharmaceutical company faced delays in staff arrival, affecting shift changes. After partnering with WTL, they reported a <strong>60% improvement in punctuality</strong> within three months, directly boosting productivity.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Cab Service Provider in Vadodara Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Cab Service Provider in Vadodara</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  As a <strong>corporate cab service provider in Vadodara</strong>, WTL does more than just run vehicles it <strong>manages entire transportation ecosystems</strong> for companies.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Centralized fleet management</strong> ensures consistency.</li>
                  <br />
                  <li><strong>Customizable plans</strong> allow HR/Admin teams to design schedules around employee needs.</li>
                  <br />
                  <li><strong>Reporting & analytics</strong> help companies track usage and optimize costs.</li>
                  <br />
                  <li><strong>24/7 customer support</strong> guarantees quick resolution.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                By positioning itself as a <strong>strategic provider</strong>, WTL gives organizations peace of mind and allows them to focus on growth while transportation runs seamlessly.                </p>
              </div>
            </div>
          </section>

          {/* Employee Transportation Company Vadodara Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee Transportation Company Vadodara</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                Employee transportation is not just about commuting it’s about <strong>employee satisfaction and retention</strong>. A study by SHRM India found that <strong>57% of employees link job satisfaction to commute quality</strong>.                </p>
                <p className="text-gray-700 leading-relaxed mb-2">As a leading <strong>employee transportation company in Vadodara</strong>, WTL addresses these challenges by:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Offering <strong>multi shift commute options</strong> for IT and factory employees.</li>
                  <br />
                  <li>Ensuring <strong>women safety protocols</strong> such as live tracking and SOS support.</li>
                  <br />
                  <li>Using <strong>eco friendly cabs</strong> to align with CSR initiatives.</li>
                  <br />
                  <li>Providing <strong>flexible seating options</strong> shared rides or dedicated cabs.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  When commute stress is reduced, employees arrive at work <strong>more focused and motivated</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Staff Shuttle Service for Companies Vadodara Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Staff Shuttle Service for Companies Vadodara</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  For organizations with <strong>large workforces</strong>, WTL’s <strong>staff shuttle service in Vadodara</strong> is a cost efficient solution.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Shuttles accommodating <strong>10 to 20 employees in one trip.</strong></li>
                  <br />
                  <li>Fixed time slots for shift workers to ensure punctuality.</li>
                  <br />
                  <li>Shared rides to reduce per head transport costs.</li>
                  <br />
                  <li>Door to door or common pickup points for convenience.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>Case Study:</strong> A large BPO in Vadodara’s IT hub opted for WTL’s shuttle services. Within 6 months, they reported a <strong>35% reduction in absenteeism</strong> and higher employee satisfaction in post shift surveys.
                </p>
              </div>
            </div>
          </section>

          {/* Best Office Cab Service Vadodara Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Best Office Cab Service Vadodara</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Small businesses and startups often prefer <strong>best office cab service</strong> packages over large shuttle models. WTL provides:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Daily and monthly plans</strong> for small teams.</li>
                  <br />
                  <li>Comfortable, AC vehicles for executives.</li>
                  <br />
                  <li>GST compliant invoices for easy accounting.</li>
                  <br />
                  <li>Flexible pick up and drop timings.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  For companies with <strong>10 to 50 employees</strong>, this model offers both affordability and reliability.
                </p>
              </div>
            </div>
          </section>

          {/* Monthly Corporate Cab Rental Vadodara Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Monthly Corporate Cab Rental Vadodara</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  WTL’s <strong>monthly corporate cab rental service in Vadodara</strong> is designed for firms that require consistent, long term transportation.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Benefits include:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Fixed monthly billing</strong> for predictable budgeting.</li>
                  <br />
                  <li>Reserved cars and drivers dedicated to the company.</li>
                  <br />
                  <li>Unlimited rides within contract terms.</li>
                  <br />
                  <li>Cost savings up to <strong>20% compared to daily bookings.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This model is especially beneficial for <strong>mid sized IT companies, factories, and BPOs</strong> with regular commuting needs.
                </p>
              </div>
            </div>
          </section>

          {/* Employee Transport Solutions Vadodara Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee Transport Solutions Vadodara</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                 WTL offers <strong>tailor made employee transport solutions</strong> depending on company size and industry:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Shared cabs for <strong>cost efficiency</strong>.</li>
                  <br />
                  <li>Dedicated women only cabs for <strong>night shifts</strong>.</li>
                  <br />
                  <li>Multi location pickups for scattered employees.</li>
                  <br />
                  <li>Green fuel efficient cars for eco conscious companies.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Every solution is designed to reduce <strong>HR workload</strong>, improve punctuality, and ensure safety.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Travel Management Vadodara Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Travel Management Vadodara</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Beyond daily commuting, WTL handles <strong>corporate travel management in Vadodara</strong>:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Airport pickups/drop offs</strong> for employees and clients.</li>
                  <br />
                  <li><strong>Luxury cars</strong> for senior executives.</li>
                  <br />
                  <li><strong>Outstation business travel cabs</strong>.</li>
                  <br />
                  <li><strong>On demand bookings</strong> for urgent meetings.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This ensures companies don’t have to deal with multiple vendors <strong>WTL becomes a single trusted partner</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Dedicated Cab Service for Employees Vadodara Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Dedicated Cab Service for Employees Vadodara</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  A <strong>dedicated cab service</strong> ensures employees always have reliable transportation without last minute cancellations.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Cars assigned exclusively to your workforce.</li>
                  <br />
                  <li>Drivers allocated on fixed schedules.</li>
                  <br />
                  <li>Flexible routes to cover multiple employee locations.</li>
                  <br />
                  <li>Predictable monthly cost for companies.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This model enhances <strong>employee trust and corporate reputation</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Outsourced Employee Transportation Vadodara Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Outsourced Employee Transportation Vadodara</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Managing in-house fleets can be expensive and stressful. That’s why many companies prefer <strong>outsourced employee transportation in Vadodara</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Advantages with WTL:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>No need to buy/maintain vehicles.</li>
                  <br />
                  <li>Professional drivers and fleet managers.</li>
                  <br />
                  <li>Automated billing and reporting.</li>
                  <br />
                  <li>Scalable fleets for growing companies.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This allows businesses to <strong>focus on operations while WTL handles the logistics</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Cab Fleet Service Vadodara Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Cab Fleet Service Vadodara</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  With <strong>500+ registered vehicles</strong>, WTL offers a diverse <strong>fleet service</strong> ranging from hatchbacks to premium sedans.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2"><strong>Features include:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Companies can book <strong>entire fleets</strong> for their workforce.</li>
                  <br />
                  <li>Branded vehicles available for corporate identity.</li>
                  <br />
                  <li>Priority support for fleet clients.</li>
                  <br />
                  <li>Bulk contract discounts.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Business Cab Booking Vadodara Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Business Cab Booking Vadodara</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  WTL provides <strong>business cab booking services</strong> suitable for SMEs, corporates, and MNCs.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Daily, weekly, or monthly bookings.</li>
                  <br />
                  <li>Quick reservations through account managers.</li>
                  <br />
                  <li>Real time tracking for safety.</li>
                  <br />
                  <li>Flexible models for sudden requirements.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Long-term Corporate Cab Contract Vadodara Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Long term Corporate Cab Contract Vadodara</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Companies with predictable transport needs can sign <strong>long term corporate cab contracts</strong> with WTL.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Locked in pricing for stability.</li>
                  <br />
                  <li>Guaranteed availability of fleet.</li>
                  <br />
                  <li>Reduced administrative burden.</li>
                  <br />
                  <li>Strong partnership with priority service.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* IT Company Cab Service Vadodara Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">IT Company Cab Service Vadodara</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                Vadodara’s <strong>IT and BPO hubs</strong> operate multiple shifts. WTL specializes in <strong>IT company cab services</strong>, offering:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Shift based schedules.</li>
                  <br />
                  <li>GPS tracking for employee safety.</li>
                  <br />
                  <li>Special services for women working night shifts.</li>
                  <br />
                  <li>Multi route shuttles to cover large teams.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This ensures <strong>timely arrivals, lower attrition, and better employee morale</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Taxi with Invoice Vadodara Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Taxi with Invoice Vadodara</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  One of the biggest challenges for finance teams is <strong>unstructured billing</strong>. WTL solves this with:
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">WTL ensures:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>GST ready monthly invoices.</li>
                  <br />
                  <li>Clear breakup of rides and costs.</li>
                  <br />
                  <li>Consolidated billing across locations.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                This makes transport <strong>easy to manage and audit</strong> for corporates.
                </p>
              </div>
            </div>
          </section>

          {/* Staff Pickup and Drop Cab Provider Vadodara Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Staff Pickup and Drop Cab Provider Vadodara</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  As a trusted <strong>staff pickup and drop provider in Vadodara</strong>, WTL ensures:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>On time arrivals every day.</li>
                  <br />
                  <li>Safe late night drops.</li>
                  <br />
                  <li>Flexible pickup points.</li>
                  <br />
                  <li>Hassle free routing for employees.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  When staff commute is sorted, companies see <strong>better productivity and satisfaction</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose WTL for Corporate Cab Service in Vadodara Section */}
          <section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose WTL for Corporate Cab Service in Vadodara</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="bg-gradient-to-br from-teal-50 to-teal-200 rounded-xl p-6 shadow-lg">
        <div className="text-teal-700 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Experience Icon">
            <title>Experience Icon</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-700">Experience: Trusted since 2016</p>
      </div>

      <div className="bg-gradient-to-br from-indigo-50 to-indigo-200 rounded-xl p-6 shadow-lg">
        <div className="text-indigo-700 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Clients Icon">
            <title>Clients Icon</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v1m-7 0a3 3 0 01-5.356 1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v1m5-15a4 4 0 100 8 4 4 0 000-8zm0 0a8 8 0 100 16 8 8 0 000-16z" />
          </svg>
        </div>
        <p className="text-gray-700">Clients: 50+ corporate offices served</p>
      </div>

      <div className="bg-gradient-to-br from-pink-50 to-pink-200 rounded-xl p-6 shadow-lg">
        <div className="text-pink-700 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Scale Icon">
            <title>Scale Icon</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </div>
        <p className="text-gray-700">Scale: 500+ cabs, 100+ cities</p>
      </div>

      <div className="bg-gradient-to-br from-yellow-50 to-yellow-200 rounded-xl p-6 shadow-lg">
        <div className="text-yellow-700 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Reliability Icon">
            <title>Reliability Icon</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-700">Reliability: On time, every time</p>
      </div>

      <div className="bg-gradient-to-br from-cyan-50 to-cyan-200 rounded-xl p-6 shadow-lg">
        <div className="text-cyan-700 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Safety Icon">
            <title>Safety Icon</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 2c-2.761 0-5 2.239-5 5h10c0-2.761-2.239-5-5-5z" />
          </svg>
        </div>
        <p className="text-gray-700">Safety: Real time GPS tracking & sanitized vehicles</p>
      </div>

      <div className="bg-gradient-to-br from-lime-50 to-lime-200 rounded-xl p-6 shadow-lg">
        <div className="text-lime-700 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Flexibility Icon">
            <title>Flexibility Icon</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
        <p className="text-gray-700">Flexibility: Shared/exclusive cabs, monthly rentals, long-term contracts</p>
      </div>
    </div>
  </div>
</section>

          {/* Case Study Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Case Study: WTL’s Impact in Vadodara</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  A <strong>multinational chemical company</strong> in Vadodara struggled with staff commuting due to multiple shifts and late night work. Complaints ranged from <strong>delayed cabs to safety concerns</strong>.After signing a <strong>2 year contract with WTL</strong>:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Punctuality improved by <strong>70%</strong>.</li>
                  <br />
                  <li>Employee satisfaction scores rose significantly.</li>
                  <br />
                  <li>HR workload related to transport dropped by <strong>50%</strong>.</li>
                  <br />
                  <li>The company extended its contract for another <strong>3 years</strong>.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">FAQs Corporate Cab Service in Vadodara</h4>
              <div className="max-w-4xl mx-auto space-y-4">
                <FaqItem
                  question="Does WTL provide night shift cabs in Vadodara?"
                  answer="Yes, with GPS enabled vehicles and women safety measures."
                />
                <FaqItem
                  question="Can small companies book services?"
                  answer="Absolutely. Packages are tailored for startups, SMEs, and large enterprises."
                />
                <FaqItem
                  question="Are bills GST compliant?"
                  answer="Yes, all invoices are transparent and GST ready."
                />
                <FaqItem
                  question="Can we get both shared and dedicated cabs?"
                  answer="Yes, depending on company requirements."
                />
                <FaqItem
                  question="How does WTL maintain hygiene?"
                  answer="Daily sanitization and regular servicing of vehicles."
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
                  If your business is looking for a <strong>corporate cab service in Vadodara</strong> that combines affordability, reliability, safety, and professionalism, <strong>Worldtriplink (WTL Tourism Pvt Ltd)</strong> is the trusted partner you need.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  With <strong>operations in 100+ cities</strong>, <strong>500+ registered cabs</strong>, and a proven track record since <strong>2016</strong>, WTL is transforming the way companies handle employee transportation.
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
                Contact <strong>WTL Tourism Pvt Ltd</strong> today and experience the difference of a <strong>professional corporate cab service in Vadodara</strong> designed for businesses that value their employees.</p>    
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
            serviceName="Corporate Cab Service in Vadodara"
            serviceSlug="Corporate-Cab-Service-Vadodara"
          />
          <InquiryForm
            isOpen={isInquiryFormOpen}
            onClose={handleInquiryClose}
            serviceName="Corporate Cab Service in Vadodara"
            serviceSlug="Corporate-Cab-Service-Vadodara"
          />
        </main>
      </div>
    );
  } catch (error) {
    setHasError(true);
    return null;
  }
}