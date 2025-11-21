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
export default function ChandigarhCorporateCabServicePage() {
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
          <title>Corporate Cab Service in Chandigarh | WTL Tourism Pvt Ltd</title>
          <meta
            name="description"
            content="WTL Tourism Pvt. Ltd. offers reliable corporate cab services in Chandigarh, providing safe, cost-effective, and professional employee transportation solutions since 2016. Serving 50+ corporate offices with 500+ registered cabs across Chandigarh, Panchkula, and Mohali."
          />
          <link
            rel="canonical"
            href="https://www.worldtriplink.com/corporate/Corporate-Cab-Service-Chandigarh"
          />
          <meta name="author" content="WTL Tourism" />
          <meta
            name="keywords"
            content="corporate cab service in Chandigarh, employee transportation services in Chandigarh, corporate employee transport services in Chandigarh, staff shuttle service in Chandigarh, best office cab service in Chandigarh, monthly corporate cab rental Chandigarh, corporate travel management Chandigarh, employee cab service Chandigarh, corporate taxi Chandigarh, staff pickup and drop Chandigarh"
          />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Navbar onTabChange={handleTabChange} disableForm={true} />
        
        {/* Hero Section with Background */}
        <div className="relative h-[550px] w-full">
          <div className="absolute inset-0">
            <Image
              src="/images/Chandighar place.png"
              alt="Chandigarh Corporate Cab Service"
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
                  Corporate Cab Service in Chandigarh
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
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                  Introduction
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 shadow-lg">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                    <strong>Corporate cab service in Chandigarh</strong> is no longer just about travel—it’s about reliability, safety, and efficiency for businesses that value their employees’ comfort and punctuality. Since its establishment in <strong>2016 in Pune, Worldtriplink (WTL Tourism Pvt Ltd)</strong> has been one of India’s trusted names in the employee commute industry. Today, WTL proudly manages <strong>corporate cab services in Mumbai and Chandigarh</strong>, catering to IT companies, manufacturing firms, financial institutions, and fast-growing startups that need dependable transport for their staff.
                    <br/><br/>
                    With a growing fleet of <strong>500+ registered cabs</strong>, a presence in <strong>100+ cities</strong>, and trusted by <strong>50+ corporate offices</strong>, WTL ensures safe, hygienic, and timely rides every day. Our mission is simple—provide affordable, hassle-free, and professional employee transportation that strengthens workplace productivity while keeping employee well-being a priority.
                  </p>
                </div>
              </div>

              {/* About WTL Section */}
              <div className="w-full max-w-7xl mx-auto">
                <div className="mb-8">
                  <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                    About WTL Tourism Pvt Ltd
                  </h4>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 shadow-lg">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    Founded in 2016 by a team of transport professionals in <strong>Pune</strong>, WTL Tourism Pvt Ltd was built to solve one of the most pressing challenges for companies <strong>how to ensure smooth, daily commute solutions for their employees without the burden of managing logistics themselves.</strong>
                    <br/><br/>
                    Today, WTL has expanded across <strong>Mumbai, Chandigarh, Nagpur, Bhopal, and 100+ Indian cities</strong>, becoming a reliable partner for both small and large organizations. Our corporate clients include IT parks, BPOs, pharma companies, banks, and educational institutions that rely on <strong>our punctual, clean, and safe cabs</strong> to keep their teams moving.
                  </p>
                </div>

                <div className="mb-8 mt-12">
                  <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                    Our Numbers Speak for Themselves:
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
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
                      <p className="text-gray-600">Personal cabs for VIP corporate executives</p>
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
                      <p className="text-gray-600">Registered cabs under WTL fleet</p>
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
                      <p className="text-gray-600">Cities covered across India</p>
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
                      <p className="text-gray-600">Corporate offices served daily</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-orange-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Eco friendly & fuel-efficient rides</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-teal-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-teal-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <p className="text-gray-600">Easy monthly invoicing & GST billing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Service Offerings Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Service Offerings</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  At WTL, we don’t just provide cabs—we provide <strong>complete employee commute solutions</strong>.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Daily staff pickup & drop</strong> (multi-location, door-to-door service)</li>
                  <br />
                  <li><strong>Shared & exclusive cab options</strong> for employees</li>
                  <br />
                  <li><strong>Long-term monthly & weekly packages</strong> for corporates</li>
                  <br />
                  <li><strong>Safe, sanitized, air-conditioned vehicles</strong> with professional drivers</li>
                  <br />
                  <li><strong>Real-time tracking</strong> & 24/7 support desk</li>
                  <br />
                  <li><strong>Corporate travel management</strong> for inter-city business tours</li>
                  <br />
                  <li><strong>Dedicated account manager</strong> for every company</li>
                  <br />
                  <li><strong>Flexible billing</strong> & easy monthly invoicing</li>
                  <br />
                  <li><strong>Specialized IT company cab service</strong> (with late-night and odd-hour drops)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Best Corporate Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Best Corporate Cab Service in Chandigarh</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  When businesses search for the <strong>best corporate cab service in Chandigarh</strong>, they expect more than just cars. They <strong>want consistency, safety, and accountability</strong>. That’s exactly what WTL Tourism Pvt Ltd has built its reputation on since 2016.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Unlike smaller vendors, WTL operates with <strong>structured systems</strong>:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Verified drivers</strong> with background checks</li>
                  <br/>
                  <li><strong>24/7 helpline</strong> for immediate support</li>
                  <br/>
                  <li><strong>On-time pickups</strong> guaranteed with GPS-monitored fleets</li>
                  <br/>
                  <li><strong>Customizable travel packages</strong> to suit large and small companies</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  For IT hubs in Chandigarh, where shift timings often extend late into the night, <strong>our cab services ensure safe and comfortable rides for women employees as well</strong>. This has made WTL a <strong>preferred partner for MNCs and tech companies</strong> in the region.
                  <br/><br/>
                  What makes us the “best” isn’t just our fleet it’s the trust of companies that know WTL delivers <strong>zero-hassle, professional travel management</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Cab Service Provider Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Cab Service Provider in Chandigarh</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  As a <strong>leading corporate cab service provider in Chandigarh</strong>, WTL has invested in <strong>technology-driven transport solutions</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2"><strong>Key Features:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Real-time tracking</strong> through GPS for employee safety</li>
                  <br/>
                  <li><strong>Dedicated account managers</strong> for companies</li>
                  <br/>
                  <li><strong>Scalable fleet options</strong> (from 10 cabs to 100+)</li>
                  <br/>
                  <li><strong>Multi-location staff pickups</strong> across Chandigarh, Panchkula, and Mohali</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  By acting not just as a cab vendor but as a <strong>transport partner</strong>, WTL helps companies save <strong>30 to 40% on employee transportation costs</strong> through optimized routing and shared cab models.
                  <br/><br/>
                  Our role as a corporate provider is simple <strong>to remove the daily stress of staff transport from your HR and admin teams</strong> while delivering employee satisfaction.
                </p>
              </div>
            </div>
          </section>

          {/* Employee Transportation Company Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee Transportation Company Chandigarh</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Employee well-being begins with <strong>comfortable, safe commutes</strong>. As an <strong>employee transportation company in Chandigarh</strong>, WTL bridges the gap between home and office for thousands of workers daily.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Imagine this: A BPO with 500 employees working in night shifts needs a <strong>guaranteed safe commute plan</strong>. WTL designs routes, provides gender-sensitive travel policies, assigns trusted drivers, and ensures on time drop-offs even at 2 AM.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This reliability reduces <strong>attrition rates, late logins, and absenteeism</strong>. For HR managers, WTL becomes a <strong>strategic partner</strong> in improving productivity and morale.
                </p>
              </div>
            </div>
          </section>

          {/* Staff Shuttle Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Staff Shuttle Service for Companies Chandigarh</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  For companies with <strong>bulk staff requirements</strong>, WTL provides <strong>shuttle services</strong> that can accommodate multiple employees in a single ride.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Shared cab pooling models</strong> lower costs</li>
                  <br />
                  <li><strong>Flexible seating options</strong> (sedans, SUVs, tempo travelers)</li>
                  <br />
                  <li><strong>Door-to-door or central pickup points</strong></li>
                  <br />
                  <li><strong>Seamless monthly contracts</strong> with transparent billing</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Large firms in Chandigarh IT Park and industrial hubs prefer shuttle services because they combine <strong>affordability with efficiency</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Best Office Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Best Office Cab Service Chandigarh</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  When employees rely on punctuality, companies must invest in the <strong>best office cab service in Chandigarh</strong>. WTL ensures:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Air-conditioned rides</strong> with daily cleaning</li>
                  <br />
                  <li><strong>Affordable packages</strong> (weekly & monthly)</li>
                  <br />
                  <li><strong>Multi-route flexibility</strong> for different office branches</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  A smooth office commute means employees arrive on time, stress-free, and ready to perform making WTL a <strong>productivity partner, not just a cab provider.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Monthly Corporate Cab Rental Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Monthly Corporate Cab Rental Chandigarh</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Many organizations prefer monthly rentals over daily booking chaos. With WTL’s <strong>monthly corporate cab rental in Chandigarh</strong>, businesses get:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Fixed pricing <strong>with no hidden charges</strong></li>
                  <br />
                  <li>Easy <strong>GST-compliant invoices</strong></li>
                  <br />
                  <li>Dedicated drivers and vehicles</li>
                  <br />
                  <li>Flexibility to scale fleets up or down</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This model is especially popular among IT and BPO firms where staff transport is a <strong>non-negotiable daily requirement</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Employee Transport Solutions Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee Transport Solutions Chandigarh</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  WTL designs <strong>end to end employee transport solutions in Chandigarh</strong>. This includes:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Route optimization for cost efficiency</li>
                  <br />
                  <li>Safe travel protocols for women employees</li>
                  <br />
                  <li>Real-time updates for HR teams</li>
                  <br />
                  <li>Shared and exclusive ride plans</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  By integrating technology and human oversight, WTL creates solutions that <strong>reduce cost, improve safety, and boost employee satisfaction</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Travel Management Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Travel Management Chandigarh</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Beyond daily cabs, WTL also offers <strong>corporate travel management</strong> for inter city travel, business tours, and VIP transport.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Our services include:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Airport transfers for executives</li>
                  <br />
                  <li>Inter-city business cabs (Delhi Chandigarh Shimla routes)</li>
                  <br />
                  <li>Luxury sedans & SUVs for client meetings</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This makes WTL not just an employee cab provider but a <strong>holistic corporate mobility partner</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Dedicated Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Dedicated Cab Service for Employees Chandigarh</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  For companies that prioritize <strong>employee safety and comfort</strong>, WTL provides <strong>dedicated cab services</strong> with fixed drivers and routes.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Employees feel safer traveling with familiar drivers and vehicles daily, and companies gain confidence knowing their staff has <strong>exclusive, accountable commute arrangements</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Outsourced Employee Transportation Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Outsourced Employee Transportation Chandigarh</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Managing staff travel in-house is costly and inefficient. By choosing WTL for <strong>outsourced employee transportation in Chandigarh</strong>, companies cut down on:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Driver hiring & training costs</li>
                  <br />
                  <li>Fleet maintenance expenses</li>
                  <br />
                  <li>Admin workload on HR teams</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Outsourcing ensures <strong>professional management, better safety compliance, and cost savings</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Cab Fleet Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Cab Fleet Service Chandigarh</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  With a fleet of <strong>500+ vehicles</strong>, WTL operates as a leading <strong>corporate cab fleet service in Chandigarh</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Fleet diversity includes:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Sedans for daily commute</li>
                  <br />
                  <li>SUVs for managerial staff</li>
                  <br />
                  <li>Tempo travelers for large groups</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Every vehicle undergoes <strong>regular maintenance, sanitization, and GPS installation</strong> for safety.
                </p>
              </div>
            </div>
          </section>

          {/* Business Cab Booking Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Business Cab Booking Chandigarh</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Need an urgent cab for business travel? WTL offers on demand <strong>business cab booking in Chandigarh</strong> for:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Client visits</li>
                  <br />
                  <li>Airport transfers</li>
                  <br />
                  <li>Intra-city corporate travel</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This quick, reliable service ensures companies never face last-minute transport hassles.
                </p>
              </div>
            </div>
          </section>

          {/* Long-term Corporate Cab Contract Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Long term Corporate Cab Contract Chandigarh</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Many organizations prefer stability through long term contracts. WTL provides flexible annual and multi year <strong>corporate cab contracts</strong> that guarantee:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Fixed pricing</li>
                  <br />
                  <li>Priority fleet allocation</li>
                  <br />
                  <li>Dedicated relationship managers</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This model ensures <strong>continuity and reliability</strong> for growing businesses.
                </p>
              </div>
            </div>
          </section>

          {/* IT Company Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">IT Company Cab Service Chandigarh</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  IT companies often operate <strong>24/7 shifts</strong>, making transport critical. WTL specializes in <strong>IT company cab service in Chandigarh</strong>, offering:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Odd hour pickups & drops</li>
                  <br />
                  <li>Gender sensitive safety policies</li>
                  <br />
                  <li>Multi location employee pickups</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This service is designed to <strong>support the demanding schedules of IT professionals</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Taxi with Invoice Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Taxi with Invoice Chandigarh</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Corporate accounting teams prefer <strong>GST compliant invoices</strong>. With WTL’s <strong>corporate taxi with invoice in Chandigarh</strong>, companies get:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Clear billing</li>
                  <br />
                  <li>Monthly consolidated statements</li>
                  <br />
                  <li>No hidden charges</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This makes financial planning easier and compliant with tax policies.
                </p>
              </div>
            </div>
          </section>

          {/* Staff Pickup and Drop Cab Provider Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Staff Pickup and Drop Cab Provider Chandigarh</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  As a <strong>staff pickup and drop cab provider in Chandigarh</strong>, WTL ensures employees reach office and home safely every day.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2"><strong>Employees enjoy:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Door to door convenience</strong></li>
                  <br />
                  <li><strong>On time arrivals</strong></li>
                  <br />
                  <li><strong>Comfortable rides</strong></li>
                  <br />
                  <li><strong>Safety first policy</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This service boosts morale and ensures employees feel <strong>valued by their employers</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose WTL Section */}
          <section className="py-16 bg-gray-100">
  <div className="container mx-auto px-4">
    <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose WTL for Corporate Cab Service in Chandigarh?</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="bg-gradient-to-br from-indigo-50 to-indigo-200 rounded-xl p-6 shadow-lg">
        <div className="text-indigo-700 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <p className="text-gray-600">500+ fleet, 100+ cities covered</p>
      </div>

      <div className="bg-gradient-to-br from-emerald-50 to-emerald-200 rounded-xl p-6 shadow-lg">
        <div className="text-emerald-700 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-600">Affordable, transparent pricing</p>
      </div>

      <div className="bg-gradient-to-br from-rose-50 to-rose-200 rounded-xl p-6 shadow-lg">
        <div className="text-rose-700 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-gray-600">Punctual, reliable services</p>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-amber-200 rounded-xl p-6 shadow-lg">
        <div className="text-amber-700 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <p className="text-gray-600">Eco friendly, fuel efficient vehicles</p>
      </div>

      <div className="bg-gradient-to-br from-cyan-50 to-cyan-200 rounded-xl p-6 shadow-lg">
        <div className="text-cyan-700 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <p className="text-gray-600">Trusted by 50+ corporate offices across India</p>
      </div>

      <div className="bg-gradient-to-br from-lime-50 to-lime-200 rounded-xl p-6 shadow-lg">
        <div className="text-lime-700 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A8 8 0 0117.657 18.657z" />
          </svg>
        </div>
        <p className="text-gray-600">100+ cities covered</p>
      </div>
    </div>
  </div>
</section>

          {/* Client Success Story Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Client Success Story</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  A leading <strong>Chandigarh based IT company</strong> faced high attrition due to <strong>unsafe late night commute issues</strong>. Within 3 months of partnering with WTL:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Employee satisfaction improved by 40%</strong></li>
                  <br />
                  <li><strong>Late arrivals dropped by 60%</strong></li>
                  <br />
                  <li><strong>Attrition rates reduced</strong> because employees trusted the company’s transport facilities</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This is how WTL transforms not just transport but also workplace culture.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">FAQs</h4>
              <div className="max-w-4xl mx-auto space-y-4">
                <FaqItem
                  question="How safe are WTL corporate cabs in Chandigarh?"
                  answer="All cabs are GPS enabled, drivers are verified, and rides are monitored in real time."
                />
                <FaqItem
                  question="Can we get customized packages for staff transport?"
                  answer="Yes, companies can choose shared, dedicated, or shuttle options."
                />
                <FaqItem
                  question="Do you provide night shift employee cabs?"
                  answer="Absolutely. We specialize in odd hour staff commutes for IT/BPOs."
                />
                <FaqItem
                  question="What areas do you cover in Chandigarh?"
                  answer="Entire Chandigarh, Panchkula, and Mohali regions."
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
                When it comes to <strong>corporate cab service in Chandigarh, Worldtriplink (WTL Tourism Pvt Ltd)</strong> stands out as a <strong>reliable, affordable, and safety first partner.</strong></p>
                <p className="text-gray-700 leading-relaxed mb-6">
                Since 2016, WTL has been helping companies improve employee satisfaction and reduce logistical challenges with <strong>professional transport management.</strong></p>
              </div>
            </div>
          </section>


          {/* Call to Action*/}
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
                <strong>Contact WTL Tourism Pvt Ltd today</strong> to book your <strong>corporate cab service in Chandigarh</strong> and give your employees the comfort, safety, and punctuality they deserve.
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
            serviceName="Corporate Cab Service in Chandigarh"
            serviceSlug="Corporate-Cab-Service-Chandigarh"
          />
          <InquiryForm
            isOpen={isInquiryFormOpen}
            onClose={handleInquiryClose}
            serviceName="Corporate Cab Service in Chandigarh"
            serviceSlug="Corporate-Cab-Service-Chandigarh"
          />
        </main>
      </div>
    );
  } catch (error) {
    setHasError(true);
    return null;
  }
}