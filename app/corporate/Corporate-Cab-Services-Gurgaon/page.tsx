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
export default function GurgaonCorporateCabServicePage() {
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
          <title>Corporate Cab Service in Gurgaon | WTL Tourism Pvt Ltd</title>
          <meta
            name="description"
            content="WTL Tourism Pvt. Ltd. offers reliable corporate cab services in Gurgaon, providing safe, cost-effective, and professional employee transportation solutions since 2016. Serving 50+ corporate offices with 500+ registered cabs across DLF Cyber City, Udyog Vihar, and beyond."
          />
          <link
            rel="canonical"
            href="https://www.worldtriplink.com/corporate/Corporate-Cab-Service-Gurgaon"
          />
          <meta name="author" content="WTL Tourism" />
          <meta
            name="keywords"
            content="corporate cab service in Gurgaon, employee transportation services in Gurgaon, corporate employee transport services in Gurgaon, staff shuttle service in Gurgaon, best office cab service in Gurgaon, monthly corporate cab rental Gurgaon, corporate travel management Gurgaon, employee cab service Gurgaon, corporate taxi Gurgaon, staff pickup and drop Gurgaon"
          />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Navbar onTabChange={handleTabChange} disableForm={true} />
        
        {/* Hero Section with Background */}
        <div className="relative h-[550px] w-full">
          <div className="absolute inset-0">
            <Image
              src="/images/gurgaon place.jpg"
              alt="Gurgaon Corporate Cab Service"
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
                  Corporate Cab Service in Gurgaon
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
          <strong>Corporate cab service in Gurgaon</strong> is no longer just a convenience it has become an essential part of smooth business operations. In a city where time is money and professionals depend on reliable commuting, the role of a trusted cab partner becomes invaluable. This is where <strong>Worldtriplink (WTL Tourism Pvt Ltd)</strong> comes into the picture.
        </p>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
          Established in <strong>2016 in Pune</strong>, WTL has grown into one of India’s most trusted names in the employee and corporate transportation sector. With a strong presence in <strong>Mumbai and Gurgaon</strong>, the company has expanded to over <strong>100+ cities</strong>, serving <strong>50+ corporate offices</strong> with a fleet of <strong>500+ registered cabs</strong> and <strong>30+ personal cabs.</strong>
        </p>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
          WTL is not just another transport vendor it is a <strong>corporate mobility partner</strong> that ensures <strong>punctuality, safety, affordability</strong> and comfort. From <strong>staff shuttle solutions</strong> to monthly <strong>corporate cab rentals</strong>, WTL has built its reputation as a company that businesses can trust for hassle-free commuting.
        </p>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
          In this detailed guide, we’ll explore why WTL is the <strong>preferred corporate cab service provider in Gurgaon</strong>, highlight its <strong>unique service offerings</strong>, and explain how businesses have benefited from choosing WTL as their transportation partner.
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
          Worldtriplink (WTL) started its journey in <strong>2016</strong>, driven by a simple mission: to redefine corporate commuting by blending technology, safety, and customer-first service. Headquartered in Pune, WTL today has:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mt-4 text-left space-y-2">
          <li><strong>500+ registered cabs</strong> across India.</li>
          <br />
          <li><strong>30+ personal cabs</strong> dedicated for premium clients.</li>
          <br />
          <li>Presence in <strong>100+ Indian cities</strong>, including metro hubs and growing business zones.</li>
          <br />
          <li>Partnerships with <strong>50+ leading corporate offices</strong>.</li>
        </ul>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-4 text-left">
          Over the years, WTL has earned the reputation of being not just a transportation company but a <strong>reliable corporate partner</strong> trusted by HR managers, operations heads, and employees alike.
        </p>
      </div>
    </div>

    <div className="w-full max-w-7xl mx-auto">
      <h4 className="text-2xl font-semibold text-gray-900 mb-6 text-left">WTL’s Unique Advantages:</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-200 rounded-xl p-6 shadow-lg">
          <div className="text-left">
            <div className="text-blue-700 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-600">Affordable Pricing No hidden charges; transparent monthly/weekly packages.</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-200 rounded-xl p-6 shadow-lg">
          <div className="text-left">
            <div className="text-green-700 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <p className="text-gray-600">Hygiene & Safety First Sanitized vehicles, trained drivers, and compliance with corporate safety standards.</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-200 rounded-xl p-6 shadow-lg">
          <div className="text-left">
            <div className="text-purple-700 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <p className="text-gray-600">Punctual & Reliable Strict adherence to pick-up/drop schedules.</p>
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
            <p className="text-gray-600">Pan Gurgaon & Mumbai Coverage Extensive reach across business districts.</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-200 rounded-xl p-6 shadow-lg">
          <div className="text-left">
            <div className="text-orange-700 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-600">Shared & Exclusive Options Cost-effective solutions for large teams.</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-teal-200 rounded-xl p-6 shadow-lg">
          <div className="text-left">
            <div className="text-teal-700 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-600">Door-to-Door Pick-Up/Drop Personalized commuting for every employee.</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-pink-200 rounded-xl p-6 shadow-lg">
          <div className="text-left">
            <div className="text-pink-700 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <p className="text-gray-600">Eco-Friendly Fleet Fuel-efficient vehicles to support sustainability goals.</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-200 rounded-xl p-6 shadow-lg">
          <div className="text-left">
            <div className="text-indigo-700 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4 2 2 0 002 2m10 0h2a2 2 0 002-2v-3a2 2 0 110-4 2 2 0 00-2-2h-2m-5 0a9 9 0 100 18 9 9 0 000-18zm0 0a9 9 0 019 9" />
              </svg>
            </div>
            <p className="text-gray-600">Real-Time Tracking GPS-enabled monitoring for safety and efficiency.</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-lime-50 to-lime-200 rounded-xl p-6 shadow-lg">
          <div className="text-left">
            <div className="text-lime-700 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-600">Easy Monthly Invoicing Simplified billing for corporate accounts.</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-200 rounded-xl p-6 shadow-lg">
          <div className="text-left">
            <div className="text-amber-700 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-600">Fleet Management Expertise Streamlined solutions for large-scale companies.</p>
          </div>
        </div>
      </div>
      <p className="mt-12 text-gray-600 text-left">WTL isn’t just moving people—it’s enabling businesses to function more efficiently.</p>
    </div>
  </div>
</section>

          {/* Best Corporate Cab Service in Gurgaon Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Best Corporate cab service in Gurgaon</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Every company promises to be the “best,” but WTL proves it with <strong>data, reliability, and client stories.</strong>
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                Imagine a multinational company in <strong>DLF Cyber City</strong> with 500 employees working across multiple shifts. Their biggest challenge? <strong>On time employee transport without cost overruns.</strong> WTL designed a <strong>shared shuttle system</strong> that reduced costs by <strong>25%</strong>, ensured <strong>98% on time arrivals</strong>, and improved employee satisfaction scores.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2"><strong>What makes WTL the best?</strong></p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Largest cab network in Gurgaon.</li>
                  <br />
                  <li>24/7 operational support.</li>
                  <br />
                  <li>Scalable solutions for 50 to 1000+ employees.</li>
                  <br />
                  <li>Proven record with top IT, BPO, and consulting firms.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This combination of <strong>scale, flexibility, and safety</strong> positions WTL as the <strong>best corporate cab service in Gurgaon</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Cab Service Provider in Gurgaon Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate cab service provider in Gurgaon</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  As a <strong>corporate cab service provider in Gurgaon</strong>, WTL blends <strong>technology-driven fleet management</strong> with <strong>human-centered service</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  WTL works with:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>IT Parks</strong> in Golf Course Extension.</li>
                  <br />  
                  <li><strong>BPOs & Startups</strong> in Sohna Road.</li>
                  <br />
                  <li><strong>Multinationals</strong> in Udyog Vihar.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Each client has different needs. Some prefer <strong>dedicated cabs</strong>, while others benefit from <strong>shared employee shuttles</strong>. WTL assigns <strong>relationship managers</strong> to each corporate account to ensure <strong>customized solutions.</strong>
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                This provider first approach is why businesses continue to partner with WTL for years, not months.
                </p>
              </div>
            </div>
          </section>

          {/* Employee Transportation Company Gurgaon Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee transportation company Gurgaon</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  WTL isn’t just a cab vendor it’s a <strong>full fledged employee transportation company in Gurgaon</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Services include:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Shift based cab scheduling</strong> (BPO/KPO night shifts).</li>
                  <br />
                  <li><strong>Women’s safety programs</strong> with GPS & panic alerts.</li>
                  <br />
                  <li><strong>Holiday shuttle services</strong> for special events.</li>
                  <br />
                  <li><strong>Seasonal transport packages</strong> for corporate events.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  With employee transport being a major HR concern, WTL acts as an <strong>extension of HR teams</strong>, taking away the stress of daily commute management.
                </p>
              </div>
            </div>
          </section>

          {/* Staff Shuttle Service for Companies Gurgaon Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Staff shuttle service for companies Gurgaon</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  For companies with <strong>200+ employees, staff shuttle services</strong> become the most practical solution.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">WTL’s corporate shuttle system includes:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>AC mini buses and tempo travellers</strong> for groups.</li>
                  <br />
                  <li><strong>Optimized routes using AI tools</strong> to cut travel time.</li>
                  <br />
                  <li><strong>Employee attendance tracking</strong> through ride logs.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                This not only reduces costs but also builds a sense of <strong>team bonding during commutes.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Best Office Cab Service Gurgaon Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Best office cab service Gurgaon</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  WTL has been rated by clients as the <strong>best office cab service in Gurgaon</strong> because of its <strong>door to door employee pickup/drop solutions</strong>.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Employees save 45+ minutes daily.</li>
                  <br />
                  <li>Companies reduce attrition linked to poor commuting.</li>
                  <br />
                  <li>HR managers receive monthly reports with detailed invoices.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  For growing companies in <strong>Sector 44, Udyog Vihar, or Golf Course Road</strong>, this service ensures smooth daily operations.
                </p>
              </div>
            </div>
          </section>

          {/* Monthly Corporate Cab Rental Gurgaon Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Monthly corporate cab rental Gurgaon</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Many businesses prefer <strong>monthly contracts</strong> for budgeting and consistency.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">WTL offers:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Fixed monthly rentals</strong> for predictable costs.</li>
                  <br />
                  <li><strong>Flexible upgrades</strong> during high demand months.</li>
                  <br />
                  <li><strong>Corporate invoicing</strong> for finance teams.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This model works perfectly for IT firms and startups with steady commuting needs.
                </p>
              </div>
            </div>
          </section>

          {/* Employee Transport Solutions Gurgaon Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee transport solutions Gurgaon</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Not every business requires the same solution. WTL customizes:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Shared cabs for startups.</strong></li>
                  <br />
                  <li><strong>Dedicated premium sedans for CXOs.</strong></li>
                  <br />
                  <li><strong>Flexible shuttle solutions for BPOs.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  These <strong>employee transport solutions in Gurgaon</strong> have helped companies reduce <strong>employee late arrivals by 30%</strong> while improving retention.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Travel Management Gurgaon Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate travel management Gurgaon</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Beyond daily cabs, WTL also supports <strong>corporate travel management in Gurgaon</strong>.</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Airport transfers</strong> for executives.</li>
                  <br />
                  <li><strong>Intercity travel packages</strong> to Delhi, Noida, or Faridabad.</li>
                  <br />
                  <li><strong>Conference & event transport</strong> with large fleets.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  For businesses expanding regionally, this one-stop solution saves both <strong>time</strong> and <strong>administrative costs</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Dedicated Cab Service for Employees Gurgaon Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Dedicated cab service for employees Gurgaon</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Some companies demand <strong>exclusive, dedicated cabs</strong> for their staff.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">WTL provides:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Exclusive cabs for <strong>senior executives</strong>.</li>
                  <li>Dedicated fleets for SMEs with <strong>100+ employees</strong>.</li>
                  <li><strong>Custom branding on cabs</strong> for visibility.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This premium service ensures <strong>consistency and reliability</strong> for employees who cannot afford delays.
                </p>
              </div>
            </div>
          </section>

          {/* Outsourced Employee Transportation Gurgaon Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Outsourced employee transportation Gurgaon</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Instead of maintaining an internal fleet, companies now prefer to <strong>outsource employee transportation</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Benefits with WTL:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>No asset or maintenance liability.</li>
                  <br />
                  <li>Scalability as teams grow.</li>
                  <br />
                  <li>24/7 backup vehicles for emergencies.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  A fintech startup in Gurgaon reported saving <strong>₹15 lakhs annually</strong> by outsourcing transportation to WTL.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Cab Fleet Service Gurgaon Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate cab fleet service Gurgaon</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  WTL operates a <strong>fleet service model</strong> for corporates that require 20 100 cabs daily.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2"><strong>Features include:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Centralized GPS tracking.</li>
                  <br />
                  <li>Weekly fleet health checks.</li>
                  <br />
                  <li>Driver performance reports.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This gives corporates <strong>full visibility & control</strong> without managing the fleet themselves.
                </p>
              </div>
            </div>
          </section>

          {/* Business Cab Booking Gurgaon Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Business cab booking Gurgaon</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  For SMEs, WTL offers <strong>on demand business cab booking in Gurgaon.</strong>
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Single-day bookings for client meetings.</li>
                  <br />
                  <li>Multiple-day packages for corporate delegations.</li>
                  <br />
                  <li>Instant confirmations via mobile app/portal.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This flexibility makes WTL a <strong>partner for both daily commuting and occasional business travel.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Long-term Corporate Cab Contract Gurgaon Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Long term corporate cab contract Gurgaon</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Some of WTL’s biggest successes have come from <strong>long term contracts</strong>.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>2–5 year contracts for IT giants.</li>
                  <br />
                  <li>Exclusive fleet allocation.</li>
                  <br />
                  <li>Locked pricing for cost control.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This ensures businesses enjoy <strong>stability and reliability</strong> in their operations.
                </p>
              </div>
            </div>
          </section>

          {/* IT Company Cab Service Gurgaon Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">IT company cab service Gurgaon</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  IT companies often work in <strong>24x7 environments</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">WTL provides:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Night shift pick-up/drop with women’s safety protocols.</li>
                  <br />
                  <li>Large fleet availability for IT hubs in <strong>Cyber City</strong>.</li>
                  <br />
                  <li>Flexible scheduling synced with shift timings.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  With IT being Gurgaon’s largest employer, WTL has become the <strong>go to partner for tech companies.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Taxi with Invoice Gurgaon Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate taxi with invoice Gurgaon</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Finance teams prefer <strong>corporate taxis with GST invoices.</strong>
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">WTL ensures:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>GST compliant billing.</strong></li>
                  <br />
                  <li><strong>Monthly consolidated invoices.</strong></li>
                  <br />
                  <li><strong>Easy reconciliation for accounts.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This makes WTL not only a transport provider but also a <strong>finance friendly partner.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Staff Pickup and Drop Cab Provider Gurgaon Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Staff pickup and drop cab provider Gurgaon</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Daily staff commuting is the backbone of operations.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2"><strong>WTL offers:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Home to office and office to home pick up/drop.</li>
                  <br />
                  <li>Multi location routes for large teams.</li>
                  <br />
                  <li>Driver attendance linked with ride logs.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This service is particularly popular with <strong>call centers, hospitals, and IT firms.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose WTL for Corporate Cab Service in Gurgaon Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose WTL for Corporate Cab Service in Gurgaon</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-200 rounded-xl p-6 shadow-lg">
                  <div className="text-blue-700 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Established in 2016 with 9+ years of expertise.</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-200 rounded-xl p-6 shadow-lg">
                  <div className="text-green-700 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Trusted by 50+ corporates across India.</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-200 rounded-xl p-6 shadow-lg">
                  <div className="text-purple-700 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Pan India presence in 100+ cities.</p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-200 rounded-xl p-6 shadow-lg">
                  <div className="text-red-700 mb-4">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <p className="text-gray-600">500+ cabs with GPS tracking.</p>
                </div>

                <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center gap-8">
                  <div className="bg-gradient-to-br from-orange-50 to-orange-200 rounded-xl p-6 shadow-lg max-w-sm">
                    <div className="text-orange-700 mb-4">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Affordable, reliable, and punctual.</p>
                  </div>
                </div>
              </div>
              <br />
              <center>
              <p className="text-gray-700 leading-relaxed mb-4">
                WTL doesn’t just move employees it empowers businesses by ensuring <strong>seamless mobility.</strong>
              </p>  
              </center>
            </div>
          </section>

          {/* Case Study Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Case Study A Gurgaon IT Firm</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  A leading IT company in <strong>Cyber City Gurgaon</strong> faced <strong>high employee absenteeism</strong> due to unreliable third-party cabs.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2"><strong>Problem:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Late arrivals.</li>
                  <br />
                  <li>Unsafe travel for women employees.</li>
                  <br />
                  <li>High HR complaints.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-2"><strong>WTL’s Solution:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Deployed <strong>dedicated fleet of 60 cabs.</strong></li>
                  <br />
                  <li>Implemented <strong>real time GPS tracking.</strong></li>
                  <br />
                  <li>Introduced <strong>night shift safety escorts.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-2"><strong>Result:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>98% on time arrivals.</strong></li>
                  <br />
                  <li><strong>Zero safety incidents.</strong></li>
                  <br />
                  <li>Employee satisfaction score increased by <strong>40%.</strong></li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQs Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">FAQs about Corporate Cab Service in Gurgaon</h4>
              <div className="max-w-4xl mx-auto space-y-4">
                <FaqItem
                  question="Does WTL provide 24x7 corporate cab services in Gurgaon?"
                  answer="Yes, WTL operates round the clock to match IT, BPO, and consulting firm shift timings."
                />
                <FaqItem
                  question="How safe are WTL’s corporate cabs?"
                  answer="Every cab is GPS enabled, sanitized daily, and drivers are background verified."
                />
                <FaqItem
                  question="Can WTL handle multi-location employee pick-ups in Gurgaon?"
                  answer="Yes, WTL specializes in multi location optimized routes."
                />
                <FaqItem
                  question="Does WTL offer monthly invoicing?"
                  answer="Yes, corporates receive easy GST invoices with consolidated billing."
                />
                <FaqItem
                  question="How does WTL ensure punctuality?"
                  answer="Through real time tracking, backup fleets, and dedicated drivers."
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
                  If you’re a business searching for a <strong>reliable corporate cab service in Gurgaon</strong>, look no further than <strong>Worldtriplink (WTL Tourism Pvt Ltd).</strong>
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  With <strong>9+ years of expertise, 500+ cabs, and 50+ corporate clients</strong>, WTL has the <strong>scale, reliability, and trust</strong> you need for seamless employee transportation.</p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>Partner with WTL today for the most reliable corporate cab service in Gurgaon.</strong>
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
                Contact WTL Tourism Pvt Ltd today to discuss your requirements and experience <strong>stress free corporate cab services in Gurgaon</strong> with a brand that India’s top companies already trust.
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
            serviceName="Corporate Cab Service in Gurgaon"
            serviceSlug="Corporate-Cab-Service-Gurgaon"
          />
          <InquiryForm
            isOpen={isInquiryFormOpen}
            onClose={handleInquiryClose}
            serviceName="Corporate Cab Service in Gurgaon"
            serviceSlug="Corporate-Cab-Service-Gurgaon"
          />
        </main>
      </div>
    );
  } catch (error) {
    setHasError(true);
    return null;
  }
}