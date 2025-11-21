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
    <title>Corporate Cab Service in Nagpur | WTL Tourism Pvt Ltd</title>
    <meta
      name="description"
      content="WTL Tourism Pvt. Ltd. offers reliable corporate cab services in Nagpur, providing safe, cost-effective, and professional employee transportation solutions since 2016. Serving 50+ corporate offices with 500+ registered cabs across Mumbai, Nagpur, and 100+ Indian cities."
    />
    <link
      rel="canonical"
      href="https://www.worldtriplink.com/corporate/Corporate-Cab-Service-Nagpur"
    />
    <meta name="author" content="WTL Tourism" />
    <meta
      name="keywords"
      content="corporate cab service in Nagpur, employee transportation services in Nagpur, corporate employee transport services in Nagpur, staff shuttle service in Nagpur, best office cab service in Nagpur, monthly corporate cab rental Nagpur, corporate travel management Nagpur, employee cab service Nagpur, corporate taxi Nagpur, staff pickup and drop Nagpur"
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
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <svg
          className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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
export default function NagpurCorporateCabServicePage() {
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
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
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
        <HeadSection />
        <Navbar onTabChange={handleTabChange} disableForm={true} />

        {/* Hero Section with Background */}
        <div className="relative min-h-[550px] w-full flex items-stretch">
          <div className="absolute inset-0">
            <Image
              src="/images/Nagpur.jpeg"
              alt="Nagpur Corporate Cab Service"
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
                  Corporate Cab Service in Nagpur
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
                  <strong>Corporate cab service in Nagpur</strong> is no longer just a convenience it has become a necessity for modern businesses that prioritize employee well being, punctuality, and operational efficiency. At <strong>Worldtriplink (WTL Tourism Pvt Ltd)</strong>, established in 2016 in Pune, we have grown into one of India’s most trusted corporate cab service providers. With strong operations in Mumbai and Nagpur, WTL is the preferred choice for organizations that need reliable, safe, and cost-effective employee transportation.    
                  </p>
                  <br />
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                  We bring over <strong>500+  </strong> registered cabs, <strong>30+</strong> personal cabs, coverage in <strong>100+</strong> Indian cities, and the trust of <strong>50+</strong> corporate offices to Nagpur businesses. From shared and exclusive rides to <strong>door to door pick up/drop services</strong>, WTL ensures every ride is seamless, hygienic, and punctual.
                  </p>
                  <br />
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
                  Whether your company needs <strong>daily staff commutes, monthly corporate cab rentals, or long term travel contracts</strong>, WTL is your one stop solution for corporate travel management in Nagpur.         
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
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
        About WTL Tourism Pvt Ltd A Trusted Corporate Travel Partner
      </h2>
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 shadow-lg">
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
          Founded in <strong>2016 in Pune</strong>, WTL Tourism Pvt Ltd
          started with a clear vision: to transform the way corporate
          employees commute in India. Over the years, we have expanded
          our network and today operate successfully in <strong>Mumbai, Nagpur,
          and 100+ other cities.</strong>
        </p>
      </div>
    </div>

    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
          Our Expertise lies in:
        </h4>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8">
        <ul className="space-y-4 text-gray-600">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <strong>Corporate Cab Services:</strong> Shared and exclusive rides with multi location pick up/drop options.
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <strong>Employee Transport Solutions:</strong> Tailored for IT companies, manufacturing hubs, and SMEs.
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <strong>Fleet Management:</strong> A reliable network of 500+ cabs with real time tracking systems.
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <strong>Affordable Travel Packages:</strong> Weekly and monthly rental plans with easy invoicing.
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <strong>Safety First Approach:</strong> Sanitized cabs, verified drivers, and eco friendly vehicles.
          </li>
        </ul>
      </div>
      <p className="mt-12 text-gray-600">
        We understand the challenges faced by HR and admin teams while
        arranging employee commutes. WTL bridges this gap by delivering
        <strong>punctual, hygienic, and cost-effective solutions</strong>, ensuring
        companies can focus on business while we take care of mobility.
      </p>
    </div>
  </div>
</section>

          {/* Service Offerings Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Our Corporate Cab Service Offerings in Nagpur
              </h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  At WTL, we don’t just provide cars we provide <strong>solutions tailored
                  to business mobility needs.</strong>Our service range includes:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">
                     <strong>Daily Employee Commute</strong> (pickup & drop at multiple locations)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">
                      <strong>Monthly Corporate Cab Rentals</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">
                      <strong>Business Travel Management</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">
                    <strong>Outstation Travel for Teams</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">
                    <strong>Long Term Cab Contracts</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">
                    <strong>Staff Shuttle Services</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">
                    <strong>IT Company Cab Solutions</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">
                    <strong>Invoice based Corporate Taxi Services</strong>
                    </span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-6">
                  Every ride is supported by <strong>real time tracking, professional
                  drivers, air-conditioned cabs</strong>, and <strong>easy monthly billing systems</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Best Corporate Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Best Corporate Cab Service in Nagpur
              </h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  When businesses search for the <strong>best corporate cab service in
                  Nagpur</strong>, reliability and consistency become the top priorities.
                  WTL stands out because of its ability to balance <strong>affordability,
                  comfort, and punctuality</strong> without compromising on safety.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Why we are considered the best:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li>
                    <strong>30+ Personal cabs and 500+ registered vehicles</strong> dedicated to
                    Nagpur operations.
                  </li>
                  <br />
                  <li>
                    <strong>Door to door pick up and drop</strong>, saving employees from last mile
                    struggles.
                  </li>
                  <br />
                  <li>
                    <strong>Multi location coverage across Nagpur</strong>, including IT parks,
                    manufacturing zones, and corporate hubs.
                  </li>
                  <br />
                  <li>
                    <strong>Exclusive and shared travel options</strong>, letting companies
                    customize according to team size.
                  </li>
                  <br />
                  <li>
                    <strong>Proven trust of 50+ corporate clients in India</strong>.
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  In today’s competitive environment, companies in Nagpur choose
                  WTL because we provide not just a cab service but a <strong>strategic
                  advantage in workforce mobility</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Cab Service Provider Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Corporate Cab Service Provider in Nagpur
              </h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Being a <strong>leading corporate cab service provider in Nagpur</strong>, WTL
                  focuses on simplifying business commutes. Companies that depend
                  on us enjoy:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Fleet diversity:</strong> Hatchbacks, sedans, SUVs, and premium vehicles.</li>
                  <br />
                  <li><strong>Eco friendly cabs</strong> for organizations committed to sustainability.</li>
                  <br />
                  <li><strong>Pan-Nagpur coverage</strong>, ensuring no employee is left behind.</li>
                  <br />
                  <li><strong>Emergency backup fleet</strong> to avoid disruptions.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  We go beyond being just a vendor we partner with organizations to
                  build <strong>employee friendly transportation systems</strong> that reduce
                  stress, increase punctuality, and boost productivity.
                </p>
              </div>
            </div>
          </section>

          {/* Employee Transportation Company Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Employee Transportation Company Nagpur
              </h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  As a trusted <strong>employee transportation company</strong> in Nagpur, WTL
                  specializes in <strong>large scale workforce mobility</strong>. For IT parks,
                  manufacturing plants, and service offices, we manage <strong>staff commutes across shifts and routes</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Benefits of choosing WTL for employee transport:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li>
                    <strong>On time attendance rates</strong> improve due to punctual cab arrivals.
                  </li>
                  <br />
                  <li>
                    <strong>Reduced HR workload</strong>, since WTL manages scheduling, tracking, and billing.
                  </li>
                  <br />
                  <li>
                    <strong>Employee satisfaction and retention</strong> go up as commutes become comfortable.
                  </li>
                  <br />
                  <li><strong>Flexible solutions</strong> for night shifts, weekend work, and offsite meetings.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                 Case Example: An IT company in Nagpur partnered with WTL for a <strong>250 employee night shift commute</strong>. Within 2 months, they reported <strong>30% higher punctuality</strong> and significant improvement in employee morale.
                </p>
              </div>
            </div>
          </section>

          {/* Staff Shuttle Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Staff Shuttle Service for Companies Nagpur
              </h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  The <strong>staff shuttle service for companies in Nagpur</strong> is designed for
                  businesses with large teams that need <strong>group transportation</strong>. WTL
                  provides:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li>
                    <strong>Mini buses, tempo travellers, and SUVs</strong> for corporate staff.
                  </li>
                  <br />
                  <li><strong>Multiple route management</strong> for employees across the city.</li>
                  <br />
                  <li><strong>Real-time GPS tracking</strong> for safety and monitoring.</li>
                  <br />
                  <li><strong>Cost-efficient packages</strong> compared to individual cabs.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  By reducing traffic congestion, fuel consumption, and stress, our
                  staff shuttle services offer <strong>sustainability and efficiency</strong>
                  together.
                </p>
              </div>
            </div>
          </section>

          {/* Best Office Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Best Office Cab Service Nagpur
              </h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  When it comes to the <strong>best office cab service in Nagpur</strong>, WTL
                  ensures:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Zero hidden charges</strong>—clear and affordable billing.</li>
                  <br />
                  <li><strong>Professional drivers</strong> trained for corporate culture.</li>
                  <br />
                  <li><strong>Air-conditioned, sanitized cabs</strong> with hygiene protocols.</li>
                  <br />
                  <li><strong>Punctual pick-ups/drop-offs</strong>, minimizing late arrivals.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This makes WTL the preferred choice for HR teams aiming to give
                  their employees a <strong>hassle-free office commute experience</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Monthly Corporate Cab Rental Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Monthly Corporate Cab Rental Nagpur
              </h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  For organizations seeking <strong>monthly corporate cab rental in Nagpur</strong>,
                  WTL offers flexible plans:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Flat monthly packages</strong> for cost predictability.</li>
                  <br />
                  <li><strong>Custom route designs</strong> for employee clusters.</li>
                  <br />
                  <li><strong>Easy monthly invoicing</strong> with GST compliant billing.</li>
                  <br />
                  <li><strong>Backup cabs included</strong> in case of emergencies.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This model is particularly popular with <strong>startups, SMEs, and IT firms</strong>
                  that require regular, reliable commutes without the burden
                  of managing fleets.
                </p>
              </div>
            </div>
          </section>

          {/* Employee Transport Solutions Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Employee Transport Solutions Nagpur
              </h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Our <strong>employee transport solutions in Nagpur</strong> are customized for
                  businesses of all sizes. With WTL, you get:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Multi shift transport scheduling</strong> (day/night).</li>
                  <br />
                  <li><strong>App based booking and tracking</strong> for employees.</li>
                  <br />
                  <li><strong>Fuel efficient vehicles</strong> aligned with green policies.</li>
                  <br />
                  <li><strong>Seamless coordination</strong> between HR/admin and our operations team.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This ensures that employees enjoy <strong>stress free travel</strong>, improving
                  both <strong>attendance and productivity</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Travel Management Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Corporate Travel Management Nagpur
              </h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  WTL is more than just a cab provider we are a <strong>corporate travel management company in Nagpur</strong>. This means we handle:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Daily staff commute management</strong>.</li>
                  <br />
                  <li><strong>Business meetings and client transfers</strong>.</li>
                  <br />
                  <li><strong>Airport pick-up/drop for executives</strong>.</li>
                  <br />
                  <li><strong>Outstation corporate travel</strong>.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Our <strong>end to end solutions</strong> reduce admin overhead and ensure companies save both <strong>time and money</strong> while enhancing employee satisfaction.
                </p>
              </div>
            </div>
          </section>

          {/* Dedicated Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Dedicated Cab Service for Employees Nagpur
              </h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  A <strong>dedicated cab service for employees in Nagpur</strong> ensures exclusive
                  vehicles for your workforce. Companies choose this when they
                  need:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Full day dedicated cabs</strong> for senior executives.</li>
                  <br />
                  <li><strong>Exclusive staff cars</strong> for team leaders or project managers.</li>
                  <br />
                  <li><strong>Employee-friendly travel plans</strong> ensuring privacy and comfort.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Such services build <strong>employee trust</strong> and reflect positively on company culture.
                </p>
              </div>
            </div>
          </section>

          {/* Outsourced Employee Transportation Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Outsourced Employee Transportation Nagpur
              </h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  For businesses that don’t want the hassle of managing fleets, WTL
                  offers <strong>outsourced employee transportation in Nagpur</strong>. We manage
                  everything:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Fleet procurement & management</strong>.</li>
                  <br />
                  <li><strong>Driver recruitment & training</strong>.</li>
                  <br />
                  <li><strong>Route optimization & monitoring</strong>.</li>
                  <br />
                  <li><strong>Billing & compliance</strong>.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This allows companies to <strong>outsource transportation headaches</strong> while
                  focusing on core operations.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Cab Fleet Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Corporate Cab Fleet Service Nagpur
              </h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  With <strong>500+ registered cabs</strong>, WTL operates one of the most reliable
                  <strong>corporate cab fleet services in Nagpur</strong>. Our fleet includes:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li>Hatchbacks for small groups.</li>
                  <br />
                  <li>Sedans for executives.</li>
                  <br />
                  <li>SUVs for team travel.</li>
                  <br />
                  <li>Luxury vehicles for VIP clients.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  All vehicles are regularly maintained, sanitized, and tracked in
                  real time.
                </p>
              </div>
            </div>
          </section>

          {/* Business Cab Booking Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Business Cab Booking Nagpur
              </h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Need a quick <strong>business cab booking in Nagpur</strong>? WTL provides:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>On demand bookings</strong> for meetings and events.</li>
                  <br />
                  <li><strong>Priority service</strong> for corporate accounts.</li>
                  <br />
                  <li><strong>Airport transfer packages</strong> for executives.</li>
                  <br />
                  <li><strong>Easy app/phone booking</strong> with 24/7 support.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Long-term Corporate Cab Contract Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Long term Corporate Cab Contract Nagpur
              </h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Companies looking for stability choose our <strong>long term corporate cab contracts in Nagpur</strong>. Benefits include:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Fixed monthly budgets</strong> for transport.</li>
                  <br />
                  <li><strong>Guaranteed availability of cabs</strong> at all times.</li>
                  <br />
                  <li><strong>Priority service</strong> for contract clients.</li>
                  <br />
                  <li><strong>Special discounts</strong> on multi year commitments.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* IT Company Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">
                IT Company Cab Service Nagpur
              </h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Nagpur’s IT sector is booming, and WTL supports it with
                  specialized <strong>IT company cab services</strong>. Features:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Night shift employee commutes</strong>.</li>
                  <br />
                  <li><strong>Punctual pickups for 24/7 operations</strong>.</li>
                  <br />
                  <li><strong>Safe, secure, GPS enabled rides</strong></li>
                  <br />
                  <li><strong>Dedicated support team for IT clients</strong></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Corporate Taxi with Invoice Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Corporate Taxi with Invoice Nagpur
              </h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Transparency matters. With WTL’s <strong>corporate taxi with invoice in Nagpur</strong>, companies get:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>GST-compliant invoices</strong></li>
                  <br />
                  <li><strong>Monthly consolidated bills</strong></li>
                  <br />
                  <li><strong>No hidden charges</strong></li>
                  <br />
                  <li><strong>Expense tracking reports</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This makes accounting and reimbursements effortless.
                </p>
              </div>
            </div>
          </section>

          {/* Staff Pickup and Drop Cab Provider Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Staff Pickup and Drop Cab Provider Nagpur
              </h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  As a reliable <strong>staff pickup and drop cab provider in Nagpur</strong>, WTL
                  ensures:
                </p>
                <ul className="text-gray-700 leading-relaxed mb-6 list-disc list-inside">
                  <li><strong>Seamless door-to-door commutes</strong></li>
                  <br />
                  <li><strong>Flexible pick-up/drop scheduling</strong></li>
                  <br />
                  <li><strong>Shared cab solutions</strong> for cost efficiency</li>
                  <br />
                  <li><strong>Exclusive cab options</strong> for premium staff</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Why Choose WTL Section */}
          <section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">
      Why Choose WTL for Corporate Cab Service in Nagpur?
    </h4>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="bg-gradient-to-br from-blue-50 to-blue-200 rounded-xl p-6 shadow-lg">
        <div className="text-blue-600 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h4 className="text-xl font-semibold text-gray-900 mb-2">
          Established Excellence
        </h4>
        <p className="text-gray-600">
          Founded in 2016 in Pune with over 9 years of expertise in corporate travel.
        </p>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-green-200 rounded-xl p-6 shadow-lg">
        <div className="text-green-600 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v6m0 0v6m0-6h6m6 0h-6m-6 0H3m18 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h4 className="text-xl font-semibold text-gray-900 mb-2">
          Extensive Fleet
        </h4>
        <p className="text-gray-600">
          Over 500 registered cabs, including 30+ personal cabs for tailored services.
        </p>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-purple-200 rounded-xl p-6 shadow-lg">
        <div className="text-purple-600 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h4 className="text-xl font-semibold text-gray-900 mb-2">
          Nationwide Coverage
        </h4>
        <p className="text-gray-600">
          Operating in 100+ cities with strong hubs in Mumbai and Nagpur.
        </p>
      </div>

      <div className="bg-gradient-to-br from-red-50 to-red-200 rounded-xl p-6 shadow-lg">
        <div className="text-red-600 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h4 className="text-xl font-semibold text-gray-900 mb-2">
          Affordable Packages
        </h4>
        <p className="text-gray-600">
          Transparent pricing with no hidden charges for cost-effective travel.
        </p>
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-wrap justify-center gap-8">
        <div className="bg-gradient-to-br from-orange-50 to-orange-200 rounded-xl p-6 shadow-lg max-w-sm">
          <div className="text-orange-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            Safety & Reliability
          </h4>
          <p className="text-gray-600">
            Real-time tracking, sanitized cabs, and professional drivers.
          </p>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-teal-200 rounded-xl p-6 shadow-lg max-w-sm">
          <div className="text-teal-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            Eco-Friendly Travel
          </h4>
          <p className="text-gray-600">
            Sustainable vehicles for environmentally conscious commuting.
          </p>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-pink-200 rounded-xl p-6 shadow-lg max-w-sm">
          <div className="text-pink-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 1.714a5.002 5.002 0 005.288 0M12 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            Trusted by Corporates
          </h4>
          <p className="text-gray-600">
            Serving over 50 corporate clients with reliable transport solutions.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

          {/* Client Success Story Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Client Success Story How WTL Transformed Commutes
              </h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  A leading <strong>manufacturing company in Nagpur</strong> partnered with WTL to
                  solve its <strong>employee commute issues</strong>. With 400 employees across 3
                  shifts, the company faced <strong>delays and low morale</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  After switching to WTL:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">
                     <strong>On-time arrival rate improved by 40%</strong>.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">
                      <strong>Employee satisfaction survey showed 85% positive feedback.</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">
                      <strong>Company saved 20% on transport costs</strong> via optimized shared routes.
                    </span>
                  </li>
                </ul>
                <br />
                <p className="text-gray-700 leading-relaxed mb-6">
                  This real example shows how <strong>corporate cab service in Nagpur by WTL</strong> adds measurable value.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Conclusion Partner with WTL for Corporate Cab Service in Nagpur
              </h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  When it comes to <strong>corporate cab service in Nagpur</strong>, WTL Tourism Pvt
                  Ltd is more than just a cab provider we are a <strong>trusted mobility partner</strong>. Since 2016, we have served hundreds of businesses with
                  <strong>affordable, reliable, and safe corporate travel solutions</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Whether you need <strong>daily staff commutes, monthly rentals, or long-term contracts</strong>, WTL ensures your workforce travels
                  comfortably, safely, and on time.
                </p>
              </div>
            </div>+
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
                <h4 className="text-4xl md:text-5xl font-bold mb-6">
                  Call to Action
                </h4>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                <strong>Contact WTL Tourism Pvt Ltd today and experience the most reliable corporate cab service in Nagpur.</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <a href="tel:+919130030053" className="group">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      📞
                    </div>
                    <h4 className="text-2xl font-semibold mb-2">Phone</h4>
                    <p className="text-lg text-white/90">+91 9130030053</p>
                    <div className="mt-4 text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                      Click to call us directly
                    </div>
                  </div>
                </a>

                <a href="mailto:contact@worldtriplink.com" className="group">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      📧
                    </div>
                    <h4 className="text-2xl font-semibold mb-2">Email</h4>
                    <p className="text-lg text-white/90">
                      contact@worldtriplink.com
                    </p>
                    <div className="mt-4 text-sm text-white/70 group-hover:text-white transition-colors duration-300">
                      Click to send us an email
                    </div>
                  </div>
                </a>

                <div className="group">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      📍
                    </div>
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
            serviceName="Corporate Cab Service in Nagpur"
            serviceSlug="Corporate-Cab-Service-Nagpur"
          />
          <InquiryForm
            isOpen={isInquiryFormOpen}
            onClose={handleInquiryClose}
            serviceName="Corporate Cab Service in Nagpur"
            serviceSlug="Corporate-Cab-Service-Nagpur"
          />
        </main>
      </div>
    );
  } catch (error) {
    setHasError(true);
    return null;
  }
}