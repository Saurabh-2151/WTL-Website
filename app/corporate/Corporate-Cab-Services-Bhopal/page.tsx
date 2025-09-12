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
export default function BhopalCorporateCabServicePage() {
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
          <title>Corporate Cab Service in Bhopal WTL Tourism Pvt Ltd</title>
          <meta
            name="description"
            content="WTL Tourism Pvt. Ltd. offers reliable corporate cab services in Bhopal, providing safe, cost-effective, and professional employee transportation solutions since 2016. Serving 50+ corporate offices with 500+ registered cabs across Bhopal and beyond."
          />
          <link
            rel="canonical"
            href="https://www.worldtriplink.com/corporate/Corporate-Cab-Service-Bhopal"
          />
          <meta name="author" content="WTL Tourism" />
          <meta
            name="keywords"
            content="corporate cab service in Bhopal, employee transportation services in Bhopal, corporate employee transport services in Bhopal, staff shuttle service in Bhopal, best office cab service in Bhopal, monthly corporate cab rental Bhopal, corporate travel management Bhopal, employee cab service Bhopal, corporate taxi Bhopal, staff pickup and drop Bhopal"
          />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Navbar onTabChange={handleTabChange} disableForm={true} />
        
        {/* Hero Section with Background */}
        <div className="relative h-[550px] w-full">
          <div className="absolute inset-0">
            <Image
              src="/images/Bhopal.jpg"
              alt="Bhopal Corporate Cab Service"
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
                  Corporate Cab Service in Bhopal
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Safe, Reliable & Cost-Effective Employee Transportation
                </p>
              </div>
              
              {renderBookingForm()}
            </div>
          </div>
        </div>


        <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
                <div className="text-center mb-8">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                  <strong>Corporate cab service in Bhopal</strong> is not just about transporting employees it’s about ensuring punctuality, safety, comfort, and productivity for organizations that value their workforce. At <strong>Worldtriplink (WTL Tourism Pvt Ltd)</strong>, we understand that efficient employee transportation can directly impact business performance.
                  </p>
                  <br />
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                  Established in 2016 in Pune, WTL has grown into one of India’s <strong>most trusted corporate cab service providers</strong>, with a strong presence in <strong>Mumbai and Bhopal</strong>. With 500+ registered cabs, <strong>30+ personal vehicles, and coverage across 100+ Indian cities</strong>, we specialize in <strong>corporate travel solutions</strong> tailored for businesses of every size.
                  </p>
                  <br />
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                  From <strong>daily office commutes</strong> and staff shuttle services to <strong>long term corporate cab contracts</strong>, WTL ensures that every ride is safe, hygienic, and reliable. Today, we proudly serve <strong>50+ corporate offices</strong>, delivering stress free commutes through <strong>real time tracking, sanitized vehicles, and cost effective packages.</strong>
                  </p>  
                  <br />
                </div>
                <div className="w-full max-w-7xl mx-auto">
              <div className="mb-8">
              </div>               
              </div>
            </div>
          </section>


        {/* Main Content */}
        <main className="bg-gray-50 w-full">
          {/* About WTL Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                  About WTL Tourism Pvt Ltd A Trusted Name Since 2016
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 shadow-lg">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                    Founded in <strong>2016 in Pune</strong>, WTL Tourism Pvt Ltd started with a mission: to simplify corporate employee commutes with <strong>professional, affordable, and technology-driven cab services</strong>. Over nearly a decade, we’ve built a pan-India network covering 100+ cities, while establishing a stronghold in <strong>Mumbai and Bhopal</strong>.
                  </p>
                </div>
              </div>

              <div className="w-full max-w-7xl mx-auto">
                <div className="mb-8">
                  <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                    Our Credibility is Backed By:
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
                      <p className="text-gray-600">personal vehicles dedicated for exclusive client needs.</p>
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
                      <p className="text-gray-600">registered cabs equipped with real-time GPS tracking.</p>
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
                      <p className="text-gray-600">Cities covered, ensuring pan India presence</p>
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
                      <p className="text-gray-600">Corporate partnerships across IT, finance, manufacturing, and services.</p>
                    </div>
                  </div>
                </div>
                <p className="mt-12 text-gray-600">We go beyond being just a cab provider we act as a <strong>strategic mobility partner</strong> for organizations. Our service philosophy combines <strong>affordability, hygiene, punctuality, and technology</strong>, making us a trusted name for corporate travel in India.</p>
              </div>
            </div>
          </section>

          {/* Core Service Offerings Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Service Offerings</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p>WTL offers a wide range of corporate cab and employee transportation services in Bhopal:</p>
                <ul className="list-disc pl-6 text-gray-700 mt-4">
                  <li><strong>Daily office commutes</strong> (shared & exclusive options)</li>
                  <br />
                  <li><strong>Staff shuttle services</strong> for companies with large teams</li>
                  <br />
                  <li><strong>Weekly & monthly rental packages</strong> with flexible billing</li>
                  <br />
                  <li><strong>Multi-location pick-up/drop solutions</strong></li>
                  <br />
                  <li><strong>Airport transfers & business cab booking</strong></li>
                  <br />
                  <li><strong>Corporate travel management systems</strong></li>
                  <br />
                  <li><strong>Eco-friendly, fuel-efficient rides</strong></li>
                  <br />
                  <li><strong>Easy monthly invoicing & GST-compliant billing</strong></li>
                </ul>
                <p className="mt-6 text-gray-600">Every ride is designed to ensure <strong>comfort, safety, and timeliness</strong> for employees and <strong>hassle-free fleet management</strong> for employers.</p>
              </div>
            </div>
          </section>

          {/* Best Corporate Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Best Corporate Cab Service in Bhopal</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  When organizations look for the <strong>best corporate cab service in Bhopal</strong>, they need more than cars—they need <strong>reliability, consistency, and cost transparency</strong>. WTL delivers exactly that.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2"><strong>Why businesses rate us the best:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Door to door pick up & drop</strong> across Bhopal’s corporate hubs.</li>
                  <br/>
                  <li><strong>Air conditioned, sanitized vehicles</strong> with verified drivers.</li>
                  <br/>
                  <li><strong>No hidden charges</strong> flat rate packages with clear invoicing.</li>
                  <br/>
                  <li><strong>Shared or exclusive rides</strong> to match business needs.</li>
                  <br/>
                  <li><strong>Strong corporate client base</strong> with proven reliability.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Industry fact: According to a 2023 survey, <strong>78% of employees in tier-2 cities like Bhopal consider office commute a key factor in job satisfaction</strong>. Companies that invested in professional transport solutions saw <strong>25% better retention rates</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  By choosing WTL, businesses not only provide comfort but also enhance <strong>productivity</strong> and <strong>employee morale</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Cab Service Provider Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Cab Service Provider in Bhopal</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  As a <strong>leading corporate cab service provider in Bhopal</strong>, WTL is trusted by both <strong>large enterprises and growing startups</strong>. Our role goes beyond fleet supply—we help companies design <strong>optimized employee transportation systems</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">We provide:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-6">
                  <li><strong>Flexible fleet options</strong> hatchbacks, sedans, SUVs, tempo travellers.</li>
                  <br />
                  <li><strong>Backup vehicles</strong> to ensure no commute is ever missed.</li>
                  <br />
                  <li><strong>Custom route planning</strong> for employee clusters.</li>
                  <br />
                  <li><strong>Round-the-clock support</strong> for HR and admin teams.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Story Example:<br/>
                  A Bhopal-based IT company with <strong>200+ employees</strong> faced high attrition due to transport delays.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  After switching to WTL’s managed cab service, punctuality improved by <strong>35%</strong> and employee feedback showed <strong>80% satisfaction rates</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Employee Transportation Company Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee Transportation Company Bhopal</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Being a <strong>dedicated employee transportation company in Bhopal</strong>, WTL understands the unique challenges of workforce mobility. Large teams, shift timings, and multiple office locations require <strong>precision planning</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Our solutions include:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-6">
                  <li><strong>Shift based scheduling</strong> (morning, night, 24/7 IT operations).</li>
                  <br/>
                  <li><strong>GPS tracked rides</strong> for employee safety.</li>
                  <br/>
                  <li><strong>Centralized dashboards</strong> for HR to monitor rides.</li>
                  <br/>
                  <li><strong>Eco friendly vehicles</strong> supporting sustainable goals.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  With WTL, companies experience smoother workforce operations, while employees enjoy <strong>stress free, comfortable commutes</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Staff Shuttle Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Staff Shuttle Service for Companies Bhopal</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  For companies with <strong>large teams</strong>, WTL provides reliable <strong>staff shuttle service in Bhopal</strong>. Whether it’s <strong>factory workers, IT staff, or corporate teams</strong>, our shuttle fleet ensures <strong>group transport efficiency</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Benefits:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-6">
                  <li><strong>Cost sharing models</strong> lower per employee commute cost.</li>
                  <br/>
                  <li><strong>Buses, vans, and tempo travellers</strong> for bulk transport.</li>
                  <br/>
                  <li><strong>Multi stop routing</strong> to cover maximum employees.</li>
                  <br/>
                  <li><strong>Safe night shift commutes</strong> with driver background checks.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  This is especially useful for manufacturing hubs and IT parks where companies need to move <strong>hundreds of employees daily</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Best Office Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Best Office Cab Service Bhopal</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  WTL is often rated as the <strong>best office cab service in Bhopal</strong> due to our <strong>employee first approach</strong>. Unlike traditional rentals, our service is designed around:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Punctuality</strong> employees reach office on time, every time.</li>
                  <br/>
                  <li><strong>Hygiene & comfort</strong> air-conditioned, sanitized cabs.</li>
                  <br/>
                  <li><strong>Professionalism</strong> trained drivers with corporate etiquette.</li>
                  <br/>
                  <li><strong>Technology</strong> app tracking, digital payments, and e-invoices.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  This makes WTL a top choice for <strong>HR departments and business leaders</strong> who care about employee satisfaction.
                </p>
              </div>
            </div>
          </section>

          {/* Monthly Corporate Cab Rental Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Monthly Corporate Cab Rental Bhopal</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  For organizations preferring predictable costs, WTL offers <strong>monthly corporate cab rentals in Bhopal</strong>. These plans ensure:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Fixed budgets</strong> without fluctuating daily fares.</li>
                  <br/>
                  <li><strong>Priority service</strong> for rental clients.</li>
                  <br/>
                  <li><strong>Custom routes & shift coverage</strong>.</li>
                  <br/>
                  <li><strong>Single consolidated invoice</strong> every month.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  This model is ideal for <strong>SMEs, IT companies, and startups</strong> looking for reliable employee transportation without operational headaches.
                </p>
              </div>
            </div>
          </section>

          {/* Employee Transport Solutions Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee Transport Solutions Bhopal</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Every company is unique. That’s why our <strong>employee transport solutions in Bhopal</strong> are customizable.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Shared rides for cost efficiency.</strong></li>
                  <br/>
                  <li><strong>Exclusive cars for senior executives.</strong></li>
                  <br/>
                  <li><strong>Emergency backup fleet.</strong></li>
                  <br/>
                  <li><strong>Real-time tracking for safety.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  By reducing commute stress, WTL helps companies improve <strong>productivity, attendance, and retention</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Travel Management Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Travel Management Bhopal</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Beyond daily commutes, WTL also provides <strong>corporate travel management in Bhopal</strong>. This includes:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-6">
                  <li><strong>Client transfers & executive travel.</strong></li>
                  <br/>
                  <li><strong>Airport pick-up/drop packages.</strong></li>
                  <br/>
                  <li><strong>Outstation travel for business meetings.</strong></li>
                  <br/>
                  <li><strong>Dedicated account managers</strong> for corporate clients.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  This end-to-end travel solution reduces admin workload while ensuring <strong>smooth business mobility</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Dedicated Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Dedicated Cab Service for Employees Bhopal</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Some businesses prefer <strong>dedicated cabs</strong> for executives or specific teams. WTL offers:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-6">
                  <li><strong>Full-day rentals for employees.</strong></li>
                  <br/>
                  <li><strong>Exclusive cars for management staff.</strong></li>
                  <br/>
                  <li><strong>Safe, reliable, and private commutes.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  This is especially popular among <strong>IT firms and senior leadership teams</strong> who need uninterrupted travel availability.
                </p>
              </div>
            </div>
          </section>

          {/* Outsourced Employee Transportation Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Outsourced Employee Transportation Bhopal</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Managing transport fleets is resource-heavy. That’s why many companies choose <strong>outsourced employee transportation in Bhopal</strong> with WTL.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">We manage:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-6">
                  <li>Fleet ownership & maintenance</li>
                  <br/>
                  <li>Driver hiring & training</li>
                  <br/>
                  <li>Scheduling & route planning</li>
                  <br/>
                  <li>Billing & compliance</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  This allows HR and admin teams to focus on <strong>core operations</strong> while WTL handles employee commutes.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Cab Fleet Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Cab Fleet Service Bhopal</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  With a <strong>500+ cab network</strong>, WTL runs one of the largest <strong>corporate cab fleet services in Bhopal</strong>. Our fleet includes:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Hatchbacks (for individuals)</li>
                  <br/>
                  <li>Sedans (for executives)</li>
                  <br/>
                  <li>SUVs (for teams)</li>
                  <br/>
                  <li>Vans & tempo travellers (for shuttles)</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  All vehicles undergo <strong>regular maintenance and sanitization</strong> for reliability.
                </p>
              </div>
            </div>
          </section>

          {/* Business Cab Booking Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Business Cab Booking Bhopal</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Need quick <strong>business cab booking in Bhopal</strong>? WTL provides:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>On-demand bookings</strong> for meetings & conferences.</li>
                  <br/>
                  <li><strong>Executive travel packages.</strong></li>
                  <br/>
                  <li><strong>Airport transfers.</strong></li>
                  <br/>
                  <li><strong>24/7 support line</strong> for corporate accounts.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  This service ensures companies always have access to <strong>instant, reliable business mobility</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Long-term Corporate Cab Contract Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Long term Corporate Cab Contract Bhopal</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Many companies prefer stability. WTL offers <strong>long term corporate cab contracts in Bhopal</strong> with:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Discounted packages</strong> for multi year tie ups.</li>
                  <br/>
                  <li><strong>Guaranteed fleet availability.</strong></li>
                  <br/>
                  <li><strong>Flexible invoicing & reporting.</strong></li>
                  <br/>
                  <li><strong>Custom SLAs</strong> for service quality.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Such contracts are ideal for companies that need <strong>consistent transport solutions year-round.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* IT Company Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">IT Company Cab Service Bhopal</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Bhopal’s IT sector is growing, and so is the demand for <strong>IT company cab services</strong>. WTL caters to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-6">
                  <li><strong>Night-shift commutes</strong> with safety measures.</li>
                  <br/>
                  <li><strong>Real-time tracking</strong> for HR.</li>
                  <br/>
                  <li><strong>Multi-route pickups</strong> for IT employees.</li>
                  <br/>
                  <li><strong>Dedicated support for IT accounts.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  By ensuring <strong>safe, punctual travel</strong>, we help IT companies maintain <strong>round-the-clock operations</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Taxi with Invoice Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Taxi with Invoice Bhopal</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  For finance teams, <strong>corporate taxi with invoice in Bhopal</strong> makes accounting easier. WTL provides:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>GST-compliant invoices.</strong></li>
                  <br/>
                  <li><strong>Detailed monthly reports.</strong></li>
                  <br/>
                  <li><strong>Transparent billing with no hidden fees.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                This ensures <strong>smooth financial tracking</strong> for businesses.
                </p>
              </div>
            </div>
          </section>

          {/* Staff Pickup and Drop Cab Provider Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Staff Pickup and Drop Cab Provider Bhopal</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  As a leading <strong>staff pickup and drop cab provider in Bhopal</strong>, WTL guarantees:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Door-to-door service.</strong></li>
                  <br/>
                  <li><strong>Multi-location routes.</strong></li>
                  <br/>
                  <li><strong>Shared and exclusive ride options.</strong></li>
                  <br/>
                  <li><strong>Safe, comfortable vehicles.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  This ensures employees travel stress-free, boosting <strong>morale and productivity</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose WTL Section */}
          <section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">
      Why Choose WTL for Corporate Cab Service in Bhopal?
    </h4>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="bg-gradient-to-br from-blue-50 to-blue-200 rounded-xl p-6 shadow-lg">
        <div className="text-blue-600 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h4 className="text-xl font-semibold text-gray-900 mb-2">
          Established in 2016 in Pune
        </h4>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-green-200 rounded-xl p-6 shadow-lg">
        <div className="text-green-600 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v6m0 0v6m0-6h6m6 0h-6m-6 0H3m18 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h4 className="text-xl font-semibold text-gray-900 mb-2">
          500+ Registered Cabs with 30+ Dedicated Vehicles
        </h4>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-purple-200 rounded-xl p-6 shadow-lg">
        <div className="text-purple-600 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h4 className="text-xl font-semibold text-gray-900 mb-2">
          100+ Cities Covered, Strong Base in Mumbai & Bhopal
        </h4>
      </div>

      <div className="bg-gradient-to-br from-red-50 to-red-200 rounded-xl p-6 shadow-lg">
        <div className="text-red-600 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h4 className="text-xl font-semibold text-gray-900 mb-2">
          Affordable, Transparent Pricing
        </h4>
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-wrap justify-center gap-8">
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-200 rounded-xl p-6 shadow-lg max-w-sm">
          <div className="text-indigo-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            Sanitized, Air-Conditioned Rides
          </h4>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-teal-200 rounded-xl p-6 shadow-lg max-w-sm">
          <div className="text-teal-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            Real-Time Tracking & Driver Verification
          </h4>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-200 rounded-xl p-6 shadow-lg max-w-sm">
          <div className="text-orange-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            Eco-Friendly, Fuel-Efficient Fleet
          </h4>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-pink-200 rounded-xl p-6 shadow-lg max-w-sm">
          <div className="text-pink-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 1.714a5.002 5.002 0 005.288 0M12 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            Trusted by 50+ Corporate Offices
          </h4>
        </div>
      </div>
    </div>
  </div>
</section>

          {/* Client Success Story Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Client Success Story Bhopal Manufacturing Firm</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  A <strong>leading manufacturing firm in Bhopal</strong> faced frequent late arrivals and absenteeism due to poor transport. After partnering with WTL:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600"><strong>On-time arrival rates improved by 40%</strong></span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600"><strong>Employee satisfaction increased to 87%</strong> in surveys</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">The company saved <strong>15% in operational transport costs</strong></span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-6">
                  This case highlights how <strong>corporate cab service in Bhopal by WTL</strong> creates measurable results.
                </p>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">FAQs Corporate Cab Service in Bhopal</h4>
              <div className="max-w-4xl mx-auto space-y-4">
                <FaqItem
                  question="How does WTL ensure safety for employees?"
                  answer="All cabs are GPS enabled, sanitized daily, and driven by verified professionals."
                />
                <FaqItem
                  question="Do you provide night-shift transport for IT companies?"
                  answer="Yes, we specialize in IT/24x7 operations with safe, reliable night shift commutes."
                />
                <FaqItem
                  question="Can we get GST invoices for corporate billing?"
                  answer="Absolutely. All corporate clients get GST-compliant monthly invoices."
                />
                <FaqItem
                  question="What if a cab breaks down mid route?"
                  answer="Backup cabs are dispatched immediately to avoid disruptions."
                />
                <FaqItem
                  question="Do you cover areas outside Bhopal as well?"
                  answer="Yes, with coverage in 100+ Indian cities, we support pan India operations."
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
                  When it comes to <strong>corporate cab service in Bhopal</strong>, <strong>Worldtriplink (WTL Tourism Pvt Ltd)</strong> stands out as a <strong>trusted, reliable, and affordable partner</strong> for businesses. With nearly a decade of experience, <strong>500+ cabs</strong>, and <strong>50+ corporate clients</strong>, we ensure your employees travel safely, comfortably, and on time.
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
                  <strong>Contact WTL today and experience the most reliable corporate cab service in Bhopal.</strong>
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
            serviceName="Corporate Cab Service in Bhopal"
            serviceSlug="Corporate-Cab-Service-Bhopal"
          />
          <InquiryForm
            isOpen={isInquiryFormOpen}
            onClose={handleInquiryClose}
            serviceName="Corporate Cab Service in Bhopal"
            serviceSlug="Corporate-Cab-Service-Bhopal"
          />
        </main>
      </div>
    );
  } catch (error) {
    setHasError(true);
    return null;
  }
}