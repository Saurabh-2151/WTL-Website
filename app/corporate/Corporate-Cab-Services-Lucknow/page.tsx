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
export default function LucknowCorporateCabServicePage() {
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
        {/* Head Section for SEO */}
        <Head>
          <title>Corporate Cab Service in Lucknow | WTL Tourism Pvt Ltd</title>
          <meta name="description" content="WTL Tourism Pvt. Ltd. offers reliable corporate cab services in Lucknow, providing safe, cost-effective, and professional employee transportation solutions since 2016. Serving 50+ corporate offices with 500+ registered cabs across Lucknow." />
          <link rel="canonical" href="https://www.worldtriplink.com/corporate/Corporate-Cab-Service-Lucknow" />
          <meta name="author" content="WTL Tourism" />
          <meta name="keywords" content="corporate cab service in Lucknow, employee transportation services in Lucknow, corporate employee transport services in Lucknow, staff shuttle service in Lucknow, best office cab service in Lucknow, monthly corporate cab rental Lucknow, corporate travel management Lucknow, employee cab service Lucknow, corporate taxi Lucknow, staff pickup and drop Lucknow" />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>

        <Navbar onTabChange={handleTabChange} disableForm={true} />
        
        {/* Hero Section with Background */}
        <div className="relative min-h-[550px] w-full flex items-stretch">
          <div className="absolute inset-0">
            <Image
              src="/images/Lucknow.jpeg"
              alt="Lucknow Corporate Cab Service"
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
                  Corporate Cab Service in Lucknow
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


        <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
                <div className="text-center mb-8">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                  <strong>Corporate cab service in Lucknow</strong> is more than just transportation it’s about ensuring that employees travel safely, comfortably, and on time, while businesses save costs and improve productivity. Since its inception in <strong>2016 in Pune</strong>, Worldtriplink (WTL Tourism Pvt Ltd) has emerged as one of India’s most trusted names in <strong>corporate mobility solutions</strong>, with strong operations in <strong>Mumbai</strong> and <strong>Lucknow</strong>.                  </p>
                  <br />
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                  With a fleet of 500+ registered cabs, 30+ dedicated personal vehicles, and operations in over 100+ cities, WTL specializes in providing seamless, professional, and reliable employee commute services. Whether it’s daily staff shuttle services, monthly corporate cab rentals, or long-term employee transport solutions, our goal is to make travel stress-free, safe, and efficient for both employers and employees.              
                      </p>
                  <br />
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                  Trusted by 50+ corporate offices, WTL is redefining how businesses in Lucknow manage staff transportation by offering:                  </p>  
                  <br />
                  <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside text-left">
                  <li><strong>Affordable Pricing</strong> with no hidden charges</li>
                  <br />
                  <li><strong>Air conditioned, well maintained cars</strong></li>
                  <br />
                  <li><strong>Safety first approach</strong> with sanitized cabs & verified drivers</li>
                  <br />
                  <li><strong>Pan Lucknow coverage</strong> with door-to-door pickup & drop</li>
                  <br />
                  <li><strong>Flexible options</strong>: Shared rides, exclusive cars, or shuttles</li>
                  <br />
                  <li><strong>Punctuality & reliability guaranteed</strong></li>
                </ul>
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
        About WTL Tourism Pvt Ltd
      </h3>
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 shadow-lg">
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
          Founded in <strong>2016 in Pune</strong>, WTL Tourism Pvt Ltd began with a simple mission <strong>to transform corporate commuting in India</strong>. Over the years, the company has built its reputation by serving some of the <strong>biggest IT companies, startups, educational institutions, and corporate offices</strong>.
        </p>
        <br />
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
          With its headquarters in Pune, WTL has expanded operations to <strong>Mumbai, Lucknow, and more than 100 other Indian cities</strong>. Today, it is regarded as a <strong>pioneering corporate cab provider</strong> that combines <strong>fleet excellence, technology integration, and customer trust</strong>.
        </p>
      </div>
    </div>
    <div className="container mx-auto px-4">
      <h4 className="text-3xl font-bold text-left text-gray-900 mb-12">Our Milestones</h4>
      <div className="max-w-4xl">
        <ul className="space-y-4">
          <li className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-600"><strong>9+ years of excellence</strong> in corporate transportation</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-600"><strong>500+ Registered Cabs</strong> across cities</span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-600"><strong>Operations in 100+ Indian cities</strong></span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-600"><strong>50+ Corporate Offices served</strong></span>
          </li>
          <li className="flex items-start">
            <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-600"><strong>Thousands of daily rides completed successfully</strong></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

          {/* Service Offerings Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Service Offerings in Lucknow</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  At WTL, we understand that <strong>every business has unique transportation needs</strong>. That’s why we’ve designed flexible, cost-effective, and reliable services:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600"><strong>Daily Employee Pickup & Drop</strong> Door to door office commute solutions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600"><strong>Staff Shuttle Services</strong> For companies with large teams & shift based schedules</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600"><strong>Monthly/Weekly Corporate Cab Rentals</strong> Budget friendly packages</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600"><strong>Long-Term Contracts</strong> Guaranteed fleet availability for corporates</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600"><strong>Executive Travel Solutions</strong> For client meetings, airport transfers, and senior executives</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600"><strong>Eco-Friendly Rides</strong> Fuel-efficient and sustainable fleet options</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600"><strong>Real-Time Tracking & Safety Alerts</strong> For complete transparency</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>  
                    <span className="text-gray-600"><strong>Hygiene-Focused Commutes</strong> Sanitized cabs, trained & verified drivers</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Corporate Cab Service Provider Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate cab service provider in Lucknow</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  When it comes to choosing the right <strong>corporate cab service provider in Lucknow</strong>, businesses need more than just cars they need a partner that can <strong>deliver reliability, cost control, and employee safety</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                WTL offers fleet management solutions tailored for corporates:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Centralized scheduling</strong> for large companies.</li>
                  <br />
                  <li><strong>Route optimization</strong> to save time & fuel.</li>
                  <br />
                  <li><strong>Emergency backup cabs</strong> to avoid delays.</li>
                  <br />
                  <li><strong>Dedicated account managers</strong> for corporate clients.</li>
                  <br />
                  <li><strong>Transparent billing & invoicing</strong>.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Many leading IT, BPO, and finance companies in Lucknow trust WTL as their <strong>primary transportation provider</strong>, helping them reduce delays, improve employee satisfaction, and streamline operations.
                </p>
              </div>
            </div>
          </section>

          {/* Employee Transportation Company Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee transportation company Lucknow</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  As a specialized <strong>employee transportation company in Lucknow</strong>, WTL focuses on making daily office travel smooth and stress-free.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>Benefits for Employers:</strong>
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Increased Employee Productivity</strong> No more late arrivals due to transport issues.</li>
                  <li><strong>Cost Savings</strong> Shared routes & optimized packages.</li>
                  <li><strong>HR Efficiency</strong> WTL handles scheduling, billing, and management.</li>
                  <li><strong>Improved Employer Branding</strong> Offering safe commutes improves reputation.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>Benefits for Employees:</strong>
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Safe, comfortable rides every day</strong>.</li>
                  <li><strong>Air conditioned, hygienic cars</strong>.</li>
                  <li><strong>Multi location pickup & drop</strong>.</li>
                  <li><strong>Peace of mind with real time tracking</strong>.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Staff Shuttle Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Staff shuttle service for companies Lucknow</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Large businesses with 100s of employees often struggle with <strong>managing bulk transport</strong>. WTL solves this through <strong>staff shuttle services in Lucknow</strong>.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Shared AC shuttles</strong> covering multiple employee clusters.</li>
                  <br />
                  <li><strong>Punctual routes</strong> matched to shift timings.</li>
                  <br />
                  <li><strong>Female employee safety protocols.</strong></li>
                  <br />
                  <li><strong>Flexible coverage across Lucknow’s business hubs.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  For IT parks, hospitals, and call centers, our <strong>shuttle system</strong> has proven to reduce <strong>transport costs by up to 20%</strong> while ensuring timely employee arrivals.
                </p>
              </div>
            </div>
          </section>

          {/* Best Office Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Best office cab service Lucknow</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  WTL is widely recognized as the <strong>best office cab service in Lucknow</strong> because of our ability to blend <strong>affordability, comfort, and punctuality.</strong>
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Shared commute options</strong> for cost effectiveness.</li>
                  <br />
                  <li><strong>Exclusive rides</strong> for senior staff.</li>
                  <br />
                  <li><strong>Weekly & monthly rentals.</strong></li>
                  <br />
                  <li><strong>Door to door pickups.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Our <strong>office commute solutions</strong> ensure employees arrive refreshed and ready to work, while employers save on operational costs.
                </p>
              </div>
            </div>
          </section>

          {/* Monthly Corporate Cab Rental Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Monthly corporate cab rental Lucknow</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Companies looking for predictable expenses prefer <strong>monthly corporate cab rental in Lucknow</strong>.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Fixed monthly packages</strong> to avoid fluctuating costs.</li>
                  <li><strong>GST compliant invoicing</strong> for easy accounting.</li>
                  <li><strong>Flexible fleet scaling</strong> (add or reduce vehicles anytime).</li>
                  <li><strong>Availability guaranteed</strong> even during peak hours.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This model is ideal for <strong>SMEs and startups</strong> that need reliable commutes without heavy overheads.
                </p>
              </div>
            </div>
          </section>

          {/* Employee Transport Solutions Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee transport solutions Lucknow</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  WTL offers <strong>end to end employee transport solutions in Lucknow</strong> that cover every scenario:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Daily pickups & drops.</strong></li>
                  <br />
                  <li><strong>Multi route management.</strong></li>
                  <br />
                  <li><strong>Shift based commute planning.</strong></li>
                  <br />
                  <li><strong>Long distance transfers.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  By integrating technology and fleet efficiency, we deliver solutions that are <strong>cost effective, transparent, and employee friendly</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Travel Management Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate travel management Lucknow</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Corporate mobility is not just about office commutes. WTL also provides <strong>corporate travel management in Lucknow</strong>:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Airport transfers</strong> for executives & clients.</li>
                  <br />
                  <li><strong>Premium cabs for business meetings.</strong></li>
                  <br />
                  <li><strong>Event transportation solutions</strong> for seminars & conferences.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This ensures that all corporate travel needs are handled under <strong>one trusted partner</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Dedicated Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Dedicated cab service for employees Lucknow</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  WTL’s <strong>dedicated cab service in Lucknow</strong> is designed for companies that want <strong>exclusive, reliable vehicles assigned to their staff</strong>.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Same cab & driver daily</strong> for consistency.</li>
                  <br />
                  <li><strong>Guaranteed punctuality.</strong></li>
                  <br />
                  <li><strong>Fixed routes</strong> to avoid confusion.</li>
                  <br />
                  <li><strong>Ideal for senior executives or priority staff.</strong></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Outsourced Employee Transportation Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Outsourced employee transportation Lucknow</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Outsourcing your <strong>employee transportation in Lucknow</strong> to WTL means:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li>No need to manage your own fleet.</li>
                  <br />
                  <li>Reduced operational costs.</li>
                  <br />
                  <li>No stress of driver management & maintenance.</li>
                  <br />
                  <li>A professional partner handling everything end to end.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Corporate Cab Fleet Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate cab fleet service Lucknow</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  For large companies with hundreds of employees, WTL offers <strong>corporate cab fleet services in Lucknow</strong>.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li>500+ vehicles available</li>
                  <br />
                  <li>Multi-location coverage</li>
                  <br />
                  <li>Backup cabs for emergencies</li>
                  <br />
                  <li>Dedicated fleet managers for big corporates</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Business Cab Booking Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Business cab booking Lucknow</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  With <strong>business cab booking in Lucknow</strong>, WTL makes it easy for corporates to schedule cars for:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li>Client visits</li>
                  <li>Airport transfers</li>
                  <li>Short-term corporate events</li>
                  <li>24/7 support for emergencies</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Bookings can be done <strong>instantly through our support team</strong>, ensuring zero delays.
                </p>
              </div>
            </div>
          </section>

          {/* Long-term Corporate Cab Contract Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Long term corporate cab contract Lucknow</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Companies preferring stability choose <strong>long term corporate cab contract Lucknow</strong>.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Annual or multi-year contracts</strong></li>
                  <br />
                  <li><strong>Cost benefits on long term plans</strong></li>
                  <br />
                  <li><strong>Dedicated fleet assigned</strong></li>
                  <br />
                  <li><strong>Guaranteed availability</strong></li>
                </ul>
              </div>
            </div>
          </section>

          {/* IT Company Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">IT company cab service Lucknow</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  As one of Lucknow’s fastest-growing IT hubs, employee mobility is critical. WTL specializes in <strong>IT company cab services</strong>:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li>24/7 availability for shift based IT jobs</li>
                  <br />
                  <li>Shuttle services for bulk employee transfers</li>
                  <br />
                  <li>Female employee safety measures</li>
                  <br />
                  <li>Door to door pickups from residential clusters</li>
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
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate taxi with invoice Lucknow</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  WTL simplifies accounting with <strong>corporate taxi with invoice in Lucknow</strong>.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>GST compliant bills</strong></li>
                  <li><strong>Monthly consolidated invoices</strong></li>
                  <li><strong>Transparent pricing, no hidden charges</strong></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Staff Pickup and Drop Cab Provider Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Staff pickup and drop cab provider Lucknow</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  As a leading <strong>staff pickup and drop cab provider in Lucknow</strong>, WTL ensures:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li>Multi route staff transport</li>
                  <li>Shift specific scheduling</li>
                  <li>Real time tracking for safety</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This makes us the preferred partner for <strong> banks, BPOs, IT companies, and healthcare institutions.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose WTL Section */}
          <section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose WTL for Corporate Cab Service in Lucknow?</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="bg-gradient-to-br from-blue-50 to-blue-200 rounded-xl p-6 shadow-lg">
        <div className="text-blue-600 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h4 className="text-xl font-semibold text-gray-900 mb-2">500+ registered cabs across India</h4>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-green-200 rounded-xl p-6 shadow-lg">
        <div className="text-green-600 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012-2v-1a2 2 0 012-2h2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h4 className="text-xl font-semibold text-gray-900 mb-2">100+ cities covered with Lucknow & Mumbai as strong hubs</h4>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-purple-200 rounded-xl p-6 shadow-lg">
        <div className="text-purple-600 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h4 className="text-xl font-semibold text-gray-900 mb-2">50+ corporate clients already served</h4>
      </div>

      <div className="bg-gradient-to-br from-red-50 to-red-200 rounded-xl p-6 shadow-lg">
        <div className="text-red-600 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h4 className="text-xl font-semibold text-gray-900 mb-2">Affordable pricing plans with no hidden costs</h4>
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center gap-8">
        <div className="bg-gradient-to-br from-orange-50 to-orange-200 rounded-xl p-6 shadow-lg max-w-sm">
          <div className="text-orange-600 mb-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Safety & hygiene guaranteed</h4>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-teal-200 rounded-xl p-6 shadow-lg">
          <div className="text-teal-600 mb-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Door to door convenience</h4>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-pink-200 rounded-xl p-6 shadow-lg">
          <div className="text-pink-600 mb-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 1.714a5.002 5.002 0 005.288 0M12 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Shared & exclusive options</h4>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-200 rounded-xl p-6 shadow-lg">
          <div className="text-indigo-600 mb-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Easy monthly invoicing</h4>
        </div>
      </div>
    </div>
  </div>
</section>

          {/* Case Study Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Case Study: How WTL Transformed Employee Transport in Lucknow</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  A leading IT firm in Lucknow with over 400 employees faced <strong> frequent delays</strong> and <strong>low employee satisfaction</strong> due to unreliable local transport.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                After switching to WTL:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">On time arrival improved by <strong>48%</strong></span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Transport costs reduced by <strong>22%</strong></span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Employee satisfaction scores rose by <strong>35%</strong></span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Zero safety incidents reported in 12 months</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Conclusion Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Conclusion</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  If you’re looking for the <strong>most reliable corporate cab service in Lucknow</strong>, your search ends here. <strong>Worldtriplink (WTL Tourism Pvt Ltd)</strong>, established in 2016 in Pune, has become a trusted name in employee transport with strong operations in Mumbai and Lucknow.
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
                Contact <strong>WTL Tourism Pvt Ltd</strong> today to book your <strong>corporate cab service in Lucknow</strong> and ensure your employees travel <strong>safely, comfortably, and on time</strong> every single day.
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
                    suppressHydrationWarning
                    href="/"
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-blue-600 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-w-[140px]"
                  >
                    Book Now
                  </a>

                  <button
                    suppressHydrationWarning
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
            serviceName="Corporate Cab Service in Lucknow"
            serviceSlug="Corporate-Cab-Service-Lucknow"
          />
          <InquiryForm
            isOpen={isInquiryFormOpen}
            onClose={handleInquiryClose}
            serviceName="Corporate Cab Service in Lucknow"
            serviceSlug="Corporate-Cab-Service-Lucknow"
          />
        </main>
      </div>
    );
  } catch (error) {
    setHasError(true);
    return null;
  }
}