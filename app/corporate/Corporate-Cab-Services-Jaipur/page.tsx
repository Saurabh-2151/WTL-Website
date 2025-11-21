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
const HeadSection = () => (
  <Head>
    <title>Corporate Cab Service in Jaipur | WTL Tourism Pvt Ltd</title>
    <meta
      name="description"
      content="WTL Tourism Pvt. Ltd. offers reliable corporate cab services in Jaipur, providing safe, cost-effective, and professional employee transportation solutions since 2016. Serving 50+ corporate offices with 500+ registered cabs across Jaipur, Mumbai, and 100+ cities."
    />
    <link rel="canonical" href="https://www.worldtriplink.com/corporate/Corporate-Cab-Service-Jaipur" />
    <meta name="author" content="WTL Tourism" />
    <meta
      name="keywords"
      content="corporate cab service in Jaipur, employee transportation services in Jaipur, corporate employee transport services in Jaipur, staff shuttle service in Jaipur, best office cab service in Jaipur, monthly corporate cab rental Jaipur, corporate travel management Jaipur, employee cab service Jaipur, corporate taxi Jaipur, staff pickup and drop Jaipur"
    />
    <meta name="robots" content="index, follow" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </Head>
);

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
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <button
        className="w-full text-left p-4 focus:outline-none flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-medium text-gray-900">{question}</h2>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="p-4 pt-0 border-t border-gray-200">
          <p className="text-gray-600">{answer}</p>
        </div>
      </div>
    </div>
  );
}

// Main Page Component
export default function JaipurCorporateCabServicePage() {
  const [hasError, setHasError] = useState(false);
  const [activeTab, setActiveTab] = useState("cabs");
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
      case "cabs":
        return <CabBookingForm />;
      case "buses":
        return <BusBookingForm />;
      case "flights":
        return <FlightBookingForm />;
      case "hotels":
        return <HotelBookingForm />;
      case "homestays":
        return <HomestaysBookingForm />;
      case "holiday":
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
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">There was an error loading this page. Please try again later.</p>
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
        <HeadSection />
        <Navbar onTabChange={handleTabChange} disableForm={true} />

        {/* Hero Section with Background */}
        <div className="relative min-h-[550px] w-full flex items-stretch">
          <div className="absolute inset-0">
            <Image src="/images/jaipur temple.jpg" 
            alt="Jaipur Corporate Cab Service" 
            fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          <div className="relative z-10 w-full">
            <div className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 w-full mx-auto flex flex-col justify-center">
              <div className="text-center mb-8 px-2 sm:px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Corporate Cab Service in Jaipur</h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Safe, Reliable & Cost Effective Employee Transportation
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
                  <strong>Corporate cab service in Jaipur</strong> is no longer just about moving employees from one point to another it’s about safety, reliability, and the efficiency of your business operations. Worldtriplink (WTL Tourism Pvt Ltd), established in <strong>2016 in Pune</strong>, has grown into one of India’s most <strong>trusted corporate cab service providers</strong>. With a strong presence in <strong>Mumbai</strong> and <strong>Jaipur</strong>, WTL has become the preferred choice for companies that value punctuality, safety, and seamless employee transportation solutions.
                  </p>           
                  <br />       
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                  Backed by a <strong>fleet of 500+ registered cabs, 30+ personal cars</strong>, coverage across <strong>100+ cities</strong>, and trusted by over <strong>50 corporate offices</strong>, WTL is committed to making corporate mobility smooth, stress-free, and affordable. Whether you need <strong>daily employee commute solutions, staff shuttle services, or long term corporate cab contracts in Jaipur</strong>, WTL ensures you get <strong>door to door comfort, real time tracking, sanitized vehicles, and easy monthly billing</strong>.   
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
          {/* About WTL Tourism Pvt Ltd Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                  About WTL Tourism Pvt Ltd
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 shadow-lg">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                    Founded in <strong>2016 in Pune</strong>, WTL Tourism Pvt Ltd started with the mission of revolutionizing employee transport in India. Over the years, WTL has evolved from a regional cab provider to a <strong>pan India corporate mobility partner</strong>, now delivering exceptional service in <strong>Jaipur, Mumbai, and over 100 cities nationwide.</strong>
                  </p>
                </div>
              </div>

              <div className="w-full max-w-7xl mx-auto">
                <div className="mb-8">
                  <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
                    Our Strengths at a Glance:
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-blue-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-600">Affordable Pricing Plans, no hidden charges.</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-purple-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-600">30+ Personal Cabs dedicated to corporate clients</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-green-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">50+ Corporate Offices already served successfully</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-red-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-600">500+ Registered Cabs across Jaipur, Mumbai & 100+ cities</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-orange-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-600">High Safety & Hygiene Sanitized, well maintained vehicles</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-teal-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-teal-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-600">Punctual & Reliable Always on time, every time</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-pink-200 rounded-xl p-6 shadow-lg">
                    <div className="text-center">
                      <div className="text-pink-700 mb-4">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-600">Eco-Friendly Fleet Fuel-efficient cabs to reduce carbon footprint</p>
                    </div>
                  </div>

                </div>
                <p className="mt-12 text-gray-600">
                  From <strong>shared cabs to exclusive rides, staff shuttles to executive car rentals</strong>, WTL ensures flexibility and professionalism in every trip.
                </p>
              </div>
            </div>
          </section>

          {/* Service Offerings Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Service Offerings by WTL</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  WTL is not just a cab provider it’s a <strong>corporate transportation partner</strong>. Here’s what makes our services stand out in Jaipur:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600"><strong>Daily Employee Commute Solutions</strong> Shared & exclusive rides, multi-location pickups, reliable staff commute.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600"><strong>Monthly & Weekly Corporate Cab Rentals</strong> Fixed packages for predictable costs.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600"><strong>IT & BPO Shuttle Services</strong> 24/7 transport for employees working in shifts.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600"><strong>Corporate Travel Management</strong> From airport transfers to executive meetings.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600"><strong>Dedicated Employee Transport</strong> Long-term contracts for uninterrupted services.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600"><strong>Eco-Friendly Cab Options</strong> Supporting sustainable corporate policies.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600"><strong>Real-Time Tracking & Safety</strong> GPS monitoring and emergency support.</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600"><strong>Flexible Billing Options</strong> Monthly invoicing, GST-compliant receipts.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Best Corporate Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Best Corporate cab service in Jaipur</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  When companies search for the <strong>best corporate cab service in Jaipur</strong>, reliability, affordability, and safety are their top priorities. At WTL, we combine all three.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Unlike traditional taxi providers, we focus exclusively on <strong>corporate mobility solutions</strong>. This specialization means that every ride is tailored to <strong>company policies, employee convenience, and cost-efficiency.</strong>
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>Why WTL is Rated Among the Best:</strong>
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Affordable Corporate Plans</strong> Tailored packages starting at weekly or monthly rentals.</li>
                  <br />
                  <li><strong>Safety-First Operations</strong> Trained drivers, background-verified staff, sanitized cars.</li>
                  <br />
                  <li><strong>Large Fleet</strong> Ensuring availability even during peak office hours.</li>
                  <br />
                  <li><strong>Custom Routes</strong> Multi-location pickups and drops for employees.</li>
                  <br />
                  <li><strong>Real Time Monitoring</strong> Employers can track employee commutes via GPS.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>Case in Point:</strong> A leading IT firm in Jaipur with 300+ employees cut transport delays by 45% after shifting to WTL’s corporate cab model. Employees now reach on time, safely, and stress-free.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Cab Service Provider Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate cab service provider in Jaipur</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  As a <strong>corporate cab service provider in Jaipur</strong>, WTL doesn’t just operate vehicles it manages an entire <strong>transportation ecosystem</strong> for businesses.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>Key Features of Our Provider Model:</strong>
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Fleet Management</strong> 500+ cars managed with a centralized system.</li>
                  <br />
                  <li><strong>Punctuality Promise</strong> 98% on-time arrival rate.</li>
                  <br />
                  <li><strong>Multi City Scalability</strong> Support for companies with offices across India.</li>
                  <br />
                  <li><strong>Emergency Support</strong> 24/7 helpline for employees on the move.</li>
                  <br />
                  <li><strong>Data Driven Operations</strong> Reports & analytics for HR and admin teams.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This professional management system has made us the <strong>go to provider for IT parks, banks, educational institutions, and MNCs in Jaipur.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Employee Transportation Company Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee transportation company Jaipur</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  As an <strong>employee transportation company in Jaipur</strong>, WTL focuses on solving the most pressing HR and admin challenges:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Employee Retention & Satisfaction</strong> On time, comfortable travel reduces attrition.</li>
                  <br />
                  <li><strong>Cost Management</strong> Predictable monthly billing helps finance teams.</li>
                  <br />
                  <li><strong>Shift Based Solutions</strong> Perfect for IT & BPO night shifts.</li>
                  <br />
                  <li><strong>Hassle Free HR Management</strong> No need for HR teams to coordinate daily rides manually.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>Example:</strong> A Jaipur-based BPO saved 20% in transport costs by outsourcing employee commute to WTL while improving employee satisfaction scores by 30%.
                </p>
              </div>
            </div>
          </section>

          {/* Staff Shuttle Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Staff shuttle service for companies Jaipur</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  For companies managing <strong>large teams and multiple shifts</strong>, WTL offers <strong>staff shuttle services in Jaipur</strong>.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Shared Shuttle Rides</strong> for bulk employee transfers.</li>
                  <br />
                  <li><strong>Multi Point Pickups</strong> across Jaipur’s business districts.</li>
                  <br />
                  <li><strong>Round the Clock Service</strong> for 24/7 companies.</li>
                  <br />
                  <li><strong>Comfortable AC Shuttles</strong> with trained drivers.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Our <strong>staff shuttles</strong> are trusted by IT companies, hospitals, and call centers across Jaipur, ensuring that employees arrive <strong>on time, safely, and without travel fatigue.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Best Office Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Best office cab service Jaipur</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  If you’re looking for the <strong>best office cab service in Jaipur</strong>, WTL ensures a balance of <strong>affordability and comfort</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>Why Offices Prefer WTL:</strong>
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Exclusive Employee Cars</strong> for senior staff.</li>
                  <br />
                  <li><strong>Shared Commute Options</strong> for teams.</li>
                  <br />
                  <li><strong>Weekly/Monthly Cab Packages</strong> for budget control.</li>
                  <br />
                  <li><strong>Door to Door Pickup & Drop</strong> with real time updates.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This makes WTL a <strong>top choice for startups, SMEs, and MNCs in Jaipur.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Monthly Corporate Cab Rental Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Monthly corporate cab rental Jaipur</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Businesses that prefer predictable costs can choose WTL’s <strong>monthly corporate cab rental in Jaipur</strong>.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Fixed Packages</strong> for employees.</li>
                  <br />
                  <li><strong>Easy Invoicing</strong> with GST-compliance.</li>
                  <br />
                  <li><strong>Flexibility</strong> to increase/decrease fleet size.</li>
                  <br />
                  <li><strong>City Wide Coverage</strong> across Jaipur.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This system helps companies <strong>manage budgets effectively while ensuring uninterrupted employee transport.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Employee Transport Solutions Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee transport solutions Jaipur</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  From daily commutes to airport transfers, WTL offers <strong>complete employee transport solutions in Jaipur</strong>.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li>Daily staff pickup/drop</li>
                  <br />
                  <li>Multi-route management</li>
                  <br />
                  <li>Long-term contracts</li>
                  <br />
                  <li>Shift-based scheduling</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  By combining technology with logistics expertise, we provide <strong>seamless, end-to-end commute solutions.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Travel Management Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate travel management Jaipur</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Beyond daily cabs, WTL also provides <strong>corporate travel management in Jaipur</strong>.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Executive Travel</strong> for client meetings.</li>
                  <br />
                  <li><strong>Airport Transfers</strong> for business travelers.</li>
                  <br />
                  <li><strong>Long Distance Trips</strong> for corporate events.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This one-stop travel solution ensures that companies don’t need multiple vendors for transportation.
                </p>
              </div>
            </div>
          </section>

          {/* Dedicated Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Dedicated cab service for employees Jaipur</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  WTL’s <strong>dedicated cab service for employees in Jaipur</strong> ensures that businesses can reserve cars <strong>exclusively for their staff</strong>.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Assigned Drivers</strong> for reliability.</li>
                  <br />
                  <li><strong>Same Cab, Same Route</strong> for familiarity.</li>
                  <br />
                  <li><strong>Priority Scheduling</strong> during rush hours.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This is especially useful for companies with <strong>senior executives or employees with fixed schedules.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Outsourced Employee Transportation Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Outsourced employee transportation Jaipur</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  By choosing <strong>outsourced employee transportation in Jaipur</strong>, companies eliminate the stress of managing fleets.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  WTL takes full responsibility for:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li>Fleet management</li>
                  <br />
                  <li>Driver scheduling</li>
                  <br />
                  <li>Fuel & maintenance</li>
                  <br />
                  <li>Employee safety</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This allows businesses to <strong>focus on core operations</strong> while we handle transportation.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Cab Fleet Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate cab fleet service Jaipur</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Our <strong>corporate cab fleet service in Jaipur</strong> is built for scale. Whether your company has <strong>50 employees or 5,000</strong>, WTL can manage it seamlessly.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  We ensure:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li>24/7 availability</li>
                  <br />
                  <li>Large fleet coverage</li>
                  <br />
                  <li>Backup vehicles in emergencies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Business Cab Booking Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Business cab booking Jaipur</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  With WTL’s <strong>business cab booking in Jaipur</strong>, companies can easily schedule cars via our <strong>dedicated support team and online system.</strong>
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Single day bookings</strong> for meetings.</li>
                  <br />
                  <li><strong>Short term rentals</strong> for events.</li>
                  <br />
                  <li><strong>On demand cars</strong> with real time confirmation.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Long-term Corporate Cab Contract Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Long term corporate cab contract Jaipur</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Many businesses prefer a <strong>long term corporate cab contract in Jaipur</strong> for stability.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  WTL offers:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li>Annual contracts</li>
                  <br />
                  <li>Multi year agreements</li>
                  <br />
                  <li>Fixed pricing benefits</li>
                  <br />
                  <li>Guaranteed fleet availability</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This reduces costs while ensuring <strong>zero disruption in employee transport.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* IT Company Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">IT company cab service Jaipur</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  For IT parks and software companies in Jaipur, WTL provides <strong>specialized IT company cab services</strong>.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li>Night shift commutes</li>
                  <br />
                  <li>Bulk employee shuttles</li>
                  <br />
                  <li>GPS monitoring for safety</li>
                  <br />
                  <li>Female employee security protocols</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Corporate Taxi with Invoice Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate taxi with invoice Jaipur</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  WTL’s <strong>corporate taxi with invoice in Jaipur</strong> makes expense management simple.
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>GST compliant bills</strong></li>
                  <br />
                  <li><strong>Monthly consolidated invoices</strong></li>
                  <br />
                  <li><strong>Transparent pricing</strong></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Staff Pickup and Drop Cab Provider Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Staff pickup and drop cab provider Jaipur</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  We are a trusted <strong>staff pickup and drop cab provider in Jaipur</strong>, offering:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li>Multi route pickups</li>
                  <br />
                  <li>Shift based drops</li>
                  <br />
                  <li>Real time route optimization</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Why Choose WTL Section */}
          <section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose WTL for Corporate Cab Service in Jaipur?</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="bg-gradient-to-br from-indigo-100 to-indigo-300 rounded-xl p-6 shadow-lg">
        <div className="text-indigo-600 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h4 className="text-xl font-semibold text-gray-900 mb-2">Trusted since 2016</h4>
      </div>

      <div className="bg-gradient-to-br from-teal-100 to-teal-300 rounded-xl p-6 shadow-lg">
        <div className="text-teal-600 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h4 className="text-xl font-semibold text-gray-900 mb-2">500+ cabs across Jaipur & Mumbai</h4>
      </div>

      <div className="bg-gradient-to-br from-purple-100 to-purple-300 rounded-xl p-6 shadow-lg">
        <div className="text-purple-600 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1h3.5a2 2 0 012 2v11m-14 0h14"
            />
          </svg>
        </div>
        <h4 className="text-xl font-semibold text-gray-900 mb-2">Pan-India coverage (100+ cities)</h4>
      </div>

      <div className="bg-gradient-to-br from-pink-100 to-pink-300 rounded-xl p-6 shadow-lg">
        <div className="text-pink-600 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h4 className="text-xl font-semibold text-gray-900 mb-2">Affordable, transparent pricing</h4>
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center gap-8">
        <div className="bg-gradient-to-br from-amber-100 to-amber-300 rounded-xl p-6 shadow-lg max-w-sm">
          <div className="text-amber-600 mb-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Door to door employee commute</h4>
        </div>

        <div className="bg-gradient-to-br from-cyan-100 to-cyan-300 rounded-xl p-6 shadow-lg">
          <div className="text-cyan-600 mb-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">Shared & exclusive cabs</h4>
        </div>

        <div className="bg-gradient-to-br from-lime-100 to-lime-300 rounded-xl p-6 shadow-lg">
          <div className="text-lime-600 mb-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">24/7 availability for corporate needs</h4>
        </div>
      </div>
    </div>
  </div>
</section>

          {/* Case Study Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Case Study: How WTL Helped a Jaipur IT Firm</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  A leading Jaipur based IT firm faced daily delays as employees struggled with public transport. After partnering with WTL:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">On time employee arrival improved by <strong>47%</strong>47%</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Transport costs dropped by <strong>18%</strong></span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">Employee satisfaction scores rose by <strong>32%</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Conclusion Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Conclusion & Call to Action</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  If you’re looking for the <strong>most reliable corporate cab service in Jaipur, Worldtriplink (WTL Tourism Pvt Ltd)</strong> is your trusted partner. With <strong>500+ cabs, pan-city coverage, affordable monthly rentals, and 24/7 employee safety measures</strong>, we help businesses move forward without disruptions.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-20 w-full bg-gradient-to-br from-blue-600 to-purple-700 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                  backgroundSize: "30px 30px",
                }}
              ></div>
            </div>

            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-12">
                <h4 className="text-4xl md:text-5xl font-bold mb-6">Call to Action</h4>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                  Contact <strong>  WTL Tourism Pvt Ltd</strong> today and book your <strong>corporate cab service in Jaipur</strong> for safe, punctual, and affordable employee transportation.
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
          <InquiryPopup serviceName="Corporate Cab Service in Jaipur" serviceSlug="Corporate-Cab-Service-Jaipur" />
          <InquiryForm
            isOpen={isInquiryFormOpen}
            onClose={handleInquiryClose}
            serviceName="Corporate Cab Service in Jaipur"
            serviceSlug="Corporate-Cab-Service-Jaipur"
          />
        </main>
      </div>
    );
  } catch (error) {
    setHasError(true);
    return null;
  }
}