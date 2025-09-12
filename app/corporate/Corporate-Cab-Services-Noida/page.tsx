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
export default function NoidaCorporateCabServicePage() {
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
          <title>Corporate Cab Service in Noida | WTL Tourism Pvt Ltd</title>
          <meta
            name="description"
            content="WTL Tourism Pvt. Ltd. offers reliable corporate cab services in Noida, providing safe, cost-effective, and professional employee transportation solutions since 2016. Serving 50+ corporate offices with 500+ registered cabs across Sector 62, 63, 132, and beyond."
          />
          <link
            rel="canonical"
            href="https://www.worldtriplink.com/corporate/Corporate-Cab-Service-Noida"
          />
          <meta name="author" content="WTL Tourism" />
          <meta
            name="keywords"
            content="corporate cab service in Noida, employee transportation services in Noida, corporate employee transport services in Noida, staff shuttle service in Noida, best office cab service in Noida, monthly corporate cab rental Noida, corporate travel management Noida, employee cab service Noida, corporate taxi Noida, staff pickup and drop Noida"
          />
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Navbar onTabChange={handleTabChange} disableForm={true} />
        
        {/* Hero Section with Background */}
        <div className="relative h-[550px] w-full">
          <div className="absolute inset-0">
            <Image
              src="/images/noida.jpeg"
              alt="Noida Corporate Cab Service"
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
                  Corporate Cab Service in Noida
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
       <section className="py-16 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
  <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
    <div className="text-center mb-8">
      <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
        Introduction
      </h3>
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 shadow-lg">
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
          Corporate cab service in Noida has become an essential requirement for businesses that want to ensure smooth and safe employee transportation. Whether it’s an IT company working round-the-clock, a financial institution with strict timings, or a startup scaling fast, reliable commute solutions directly impact productivity and employee satisfaction.
        </p>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-4 text-left">
          This is where Worldtriplink (WTL Tourism Pvt Ltd) comes in. Established in 2016 in Pune, WTL has grown into one of India’s most trusted corporate cab service providers. With strong operations in Mumbai and Noida, WTL has built a reputation for delivering safe, punctual, and cost-effective corporate mobility solutions.
        </p>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-4 text-left">
          Backed by a fleet of 500+ registered cabs, 30+ personal vehicles, operations in 100+ cities, and trusted by 50+ corporate offices, WTL ensures businesses in Noida never have to worry about daily staff commute challenges again.
        </p>
      </div>
    </div>

    <div className="text-center mb-8">
      <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative inline-block">
        About WTL Tourism Pvt Ltd A Trusted Corporate Mobility Partner
      </h4>
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-8 shadow-lg">
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-left">
          WTL Tourism Pvt Ltd started with a vision: to simplify employee transportation management for Indian businesses. Headquartered in Pune, the company was founded in 2016 by professionals who understood the complexities of urban commutes. Over the years, WTL has:
        </p>
      </div>
    </div>

    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-gradient-to-br from-cyan-50 to-cyan-200 rounded-xl p-6 shadow-lg">
          <div className="text-center">
            <div className="text-cyan-700 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <p className="text-gray-600">Specialized in safe and reliable employee shuttle services</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-lime-50 to-lime-200 rounded-xl p-6 shadow-lg">
          <div className="text-center">
            <div className="text-lime-700 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-2" ref={registeredCabsCounter.elementRef}>
              {registeredCabsCounter.count}+
            </h4>
            <p className="text-gray-600">Deployed a fleet of 500+ cabs across different categories</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-200 rounded-xl p-6 shadow-lg">
          <div className="text-center">
            <div className="text-amber-700 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A8 8 0 0117.657 18.657z" />
              </svg>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-2" ref={citiesCounter.elementRef}>
              {citiesCounter.count}+
            </h4>
            <p className="text-gray-600">Expanded to 100+ cities across India</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-50 to-rose-200 rounded-xl p-6 shadow-lg">
          <div className="text-center">
            <div className="text-rose-700 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 mb-2" ref={officesCounter.elementRef}>
              {officesCounter.count}+
            </h4>
            <p className="text-gray-600">Earned the trust of 50+ corporate clients</p>
          </div>
        </div>
      </div>
      <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-4">
        Our growth has been driven by three promises: affordability, safety, and punctuality. Unlike unorganized cab vendors, WTL focuses on structured operations, professional drivers, sanitized vehicles, and technology-driven fleet management systems.
      </p>
    </div>
  </div>
</section>

          {/* Service Offerings Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Service Offerings What Makes WTL Different?</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p>WTL is not just a cab provider it’s a <strong>complete corporate mobility partner</strong>.</p>
                <p><strong>Key Offerings:</strong></p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Employee Pickup & Drop Solutions</strong> (multi-location coverage in Noida)</li>
                  <br />
                  <li><strong>Shared & Exclusive Cabs for staff</strong></li>
                  <br />
                  <li><strong>Monthly & Weekly Travel Packages with transparent pricing</strong></li>
                  <br />
                  <li><strong>IT & BPO Specialized Cab Services</strong> (24/7, late-night drops)</li>
                  <br />
                  <li><strong>Business Cab Bookings</strong> for client meetings & executives</li>
                  <br />
                  <li><strong>Airport Transfers</strong> for corporate travel</li>
                  <br />
                  <li><strong>Corporate Travel Management</strong> (intra-city & inter-city solutions)</li>
                  <br />
                  <li><strong>Real-Time Tracking & Safety Monitoring</strong></li>
                  <br />
                  <li><strong>Easy Monthly Invoicing & GST Billing</strong></li>
                  <br />
                  <li><strong>Eco-Friendly & Fuel-Efficient Cabs</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  With WTL, companies in Noida get the <strong>convenience of outsourcing transportation without losing control over safety or efficiency.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Best Corporate Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Best Corporate Cab Service in Noida</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  When businesses look for the <strong>best corporate cab service in Noida</strong>, they expect more than cars they want <strong>commitment, accountability, and comfort</strong>. WTL has consistently delivered all three since 2016.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Our services are designed for:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>IT hubs in Noida (Sector 62, 63, 132)</strong> where employee commutes are long and late-night drops are frequent.</li>
                  <br />
                  <li><strong>Manufacturing companies</strong> needing multi-shift staff transport.</li>
                  <br />
                  <li><strong>MNCs & Startups</strong> wanting affordable, scalable employee cab solutions.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-2">Why clients call us the “best”:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Verified Drivers:</strong> All undergo police verification & training.</li>
                  <br />
                  <li><strong>Punctuality Guarantee:</strong> GPS monitoring ensures on time arrivals.</li>
                  <br />
                  <li><strong>Affordable Packages:</strong> Shared, dedicated, or shuttle models available.</li>
                  <br />
                  <li><strong>Comfortable Fleet:</strong> AC, sanitized, well-maintained cabs.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  By reducing delays, improving employee safety, and lowering attrition linked to commute issues, WTL truly earns the title of <strong>the best corporate cab service in Noida</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Cab Service Provider Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Cab Service Provider in Noida</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  As a <strong>corporate cab service provider in Noida</strong>, WTL takes a professional, technology-first approach. Unlike small vendors, we provide <strong>scalable transport systems</strong> tailored to business needs.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">What sets WTL apart?</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Fleet Scalability:</strong> From 10 to 200 cabs depending on your requirement.</li>
                  <br />
                  <li><strong>Real-Time Tracking:</strong> HR/admin teams can monitor every ride.</li>
                  <br />
                  <li><strong>Custom Routes:</strong> Covering Noida, Greater Noida, and Delhi NCR seamlessly.</li>
                  <br />
                  <li><strong>24/7 Support:</strong> Dedicated account managers for each client.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Companies save up to <strong>30% on commute costs</strong> with our optimized routes and shared cab structures. More importantly, they get <strong>peace of mind knowing employee safety and punctuality are always prioritized.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Employee Transportation Company Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee Transportation Company Noida</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Being a leading <strong>employee transportation company in Noida</strong>, WTL ensures that every ride is <strong>safe, reliable, and stress-free</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Consider an IT company with 1,000 employees. Managing daily commutes across multiple Noida sectors without a professional transport partner would be a nightmare. WTL designs <strong>shift based shuttle schedules</strong>, provides <strong>dedicated vehicles</strong>, and offers <strong>emergency backup cabs</strong> ensuring employees never face travel hassles.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Benefits for companies:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Reduced <strong>late logins and absenteeism</strong></li>
                  <br />
                  <li>Improved <strong>employee morale and retention</strong></li>
                  <br />
                  <li>Hassle-free <strong>HR & admin operations</strong></li>
                  <br />
                  <li>Cost-effective <strong>transport budgets</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  For employees, WTL means reaching the office on time, <strong>stress free from traffic or safety concerns</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Staff Shuttle Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Staff Shuttle Service for Companies Noida</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  For large teams, WTL offers <strong>staff shuttle services in Noida</strong> with shared cabs and multi-seater vehicles.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Central Pickup Points:</strong> Convenient hubs across sectors.</li>
                  <br />
                  <li><strong>Shared Rides:</strong> Cost-effective solutions for big companies.</li>
                  <br />
                  <li><strong>Scalable Options:</strong> Sedans, SUVs, Tempo Travellers.</li>
                  <br />
                  <li><strong>Custom Timings:</strong> For night shifts, early shifts, or rotational shifts.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Our shuttle solutions are especially popular among<strong> IT parks and industrial hubs</strong> where bulk staff transportation is needed daily.
                </p>
              </div>
            </div>
          </section>

          {/* Best Office Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Best Office Cab Service Noida</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  WTL is recognized as the <strong>best office cab service in Noida</strong> because we focus on both the employee experience and the <strong>company’s operational ease.</strong>
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">For employees:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Air-conditioned, sanitized, comfortable rides.</li>
                  <br />
                  <li>Reliable pickups without long waits.</li>
                  <br />
                  <li>Safety-first travel with GPS monitoring.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-2">For employers:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Transparent invoicing, no hidden charges.</li>
                  <br />
                  <li>Fleet flexibility for changing needs.</li>
                  <br />
                  <li>Dedicated support team.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Happy employees mean higher productivity and WTL makes office commutes a reason for satisfaction, not stress.
                </p>
              </div>
            </div>
          </section>

          {/* Monthly Corporate Cab Rental Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Monthly Corporate Cab Rental Noida</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Daily booking chaos is outdated. WTL’s <strong>monthly corporate cab rental in Noida</strong> gives companies a <strong>structured, predictable commute plan.</strong>
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Fixed pricing, easy budgeting.</li>
                  <br />
                  <li>GST-compliant monthly invoices.</li>
                  <br />
                  <li>Dedicated vehicles with professional drivers.</li>
                  <br />
                  <li>Flexible fleet expansion during peak hiring.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This model ensures employees always have reliable transport, while companies avoid last-minute booking issues.
                </p>
              </div>
            </div>
          </section>

          {/* Employee Transport Solutions Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Employee Transport Solutions Noida</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  WTL specializes in <strong>employee transport solutions in Noida</strong> that integrate <strong>technology, safety, and efficiency</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Solutions include:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Route Optimization</strong> to save time & costs.</li>
                  <br />
                  <li><strong>Gender-Specific Travel Policies</strong> for women safety.</li>
                  <br />
                  <li><strong>Exclusive/Shared Cabs</strong> based on staff volume.</li>
                  <br />
                  <li><strong>Real-Time Notifications</strong> for HR & employees.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This holistic approach helps businesses <strong>lower attrition, boost satisfaction, and meet compliance needs.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Travel Management Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Travel Management Noida</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Beyond daily cabs, WTL offers <strong>corporate travel management in Noida</strong> covering <strong>airport transfers, intercity business travel, and executive mobility.</strong>
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Luxury sedans & SUVs for top executives.</li>
                  <br />
                  <li>Inter-city rides (Noida to Delhi, Gurugram, Jaipur, Agra).</li>
                  <br />
                  <li>On-demand bookings for client visits.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This makes WTL a <strong>complete travel partner</strong> for corporates not just an employee cab provider.
                </p>
              </div>
            </div>
          </section>

          {/* Dedicated Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Dedicated Cab Service for Employees Noida</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Companies that prioritize <strong>employee safety and convenience</strong> prefer WTL’s <strong>dedicated cab services</strong>.
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Same driver, same cab</strong> for familiar comfort.</li>
                  <br />
                  <li><strong>Fixed routes</strong> with flexibility for multi-location pickups.</li>
                  <br />
                  <li><strong>Enhanced accountability & safety.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Employees feel secure, companies enjoy smoother commute operations.
                </p>
              </div>
            </div>
          </section>

          {/* Outsourced Employee Transportation Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Outsourced Employee Transportation Noida</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Why manage cabs in house when you can outsource <strong>employee transportation in Noida</strong> to WTL?
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Benefits:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>No hassle of driver hiring/management.</li>
                  <br />
                  <li>No maintenance costs.</li>
                  <br />
                  <li>Professional compliance & safety protocols.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Outsourcing frees HR and admin teams, allowing them to focus on <strong>core business tasks while WTL manages commutes.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Corporate Cab Fleet Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Cab Fleet Service Noida</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  With <strong>500+ registered vehicles</strong>, WTL is a leading <strong>corporate cab fleet service provider in Noida</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Fleet Options:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Sedans for daily commutes.</li>
                  <br />
                  <li>SUVs for senior staff.</li>
                  <br />
                  <li>Tempo Travellers for bulk teams.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Each vehicle is maintained, sanitized, and GPS enabled ensuring <strong>reliability at scale.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Business Cab Booking Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Business Cab Booking Noida</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Need quick transport for client meetings or executives? WTL provides <strong>on demand business cab booking in Noida</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">Use Cases:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Urgent airport transfers.</strong></li>
                  <br />
                  <li><strong>Last-minute client visits.</strong></li>
                  <br />
                  <li><strong>Intra-city business travel.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Our fast-response model ensures companies never face <strong>last minute travel stress.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Long-term Corporate Cab Contract Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Long term Corporate Cab Contract Noida</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Stability matters. With WTL’s <strong>long term corporate cab contracts in Noida</strong>, companies get:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Locked in rates.</strong></li>
                  <br />
                  <li><strong>Priority vehicle allocation.</strong></li>
                  <br />
                  <li><strong>Dedicated relationship managers.</strong></li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This model suits <strong>large enterprises</strong> that require reliable employee commute solutions year-round.
                </p>
              </div>
            </div>
          </section>

          {/* IT Company Cab Service Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">IT Company Cab Service Noida</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                Noida’s IT sector runs 24/7. WTL specializes in <strong>IT company cab services in Noida</strong>, offering:</p>
                <p className="text-gray-700 leading-relaxed mb-2">Our IT clients value us for:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-6">
                  <li>Odd hour staff commutes.</li>
                  <br />
                  <li>Women-safe travel policies.</li>
                  <br />
                  <li>Flexible route planning across NCR.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                Our IT cab services help companies maintain <strong>employee safety and productivity.</strong></p>
              </div>
            </div>
          </section>

          {/* Corporate Taxi with Invoice Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Corporate Taxi with Invoice Noida</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Finance teams love clarity. With WTL’s <strong>corporate taxi with invoice service in Noida</strong>, companies enjoy:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>GST compliant monthly invoices.</li>
                  <li>Consolidated billing for multiple branches.</li>
                  <li>No hidden costs.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This simplifies corporate accounting and ensures <strong>complete transparency.</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Staff Pickup and Drop Cab Provider Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Staff Pickup and Drop Cab Provider Noida</h4>
              <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  As a <strong>staff pickup and drop cab provider in Noida</strong>, WTL guarantees:
                </p>
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  <li>Door-to-door convenience.</li>
                  <br />
                  <li>Timely pickups & drops.</li>
                  <br />
                  <li>Safety monitoring & 24/7 support.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Employees trust their companies more when daily commutes are handled by <strong>a professional provider like WTL</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose WTL Section */}
          <section className="py-16 bg-gray-50">
  <div className="container mx-auto px-4">
    <h4 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose WTL for Corporate Cab Service in Noida?</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="bg-gradient-to-br from-indigo-50 to-indigo-200 rounded-xl p-6 shadow-lg">
        <div className="text-indigo-700 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-gray-600">Affordable Pricing, No Hidden Charges</p>
      </div>

      <div className="bg-gradient-to-br from-emerald-50 to-emerald-200 rounded-xl p-6 shadow-lg">
        <div className="text-emerald-700 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-600">Punctual, Reliable, Safe Service</p>
      </div>

      <div className="bg-gradient-to-br from-rose-50 to-rose-200 rounded-xl p-6 shadow-lg">
        <div className="text-rose-700 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <p className="text-gray-600">Eco Friendly & Fuel Efficient Vehicles</p>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-amber-200 rounded-xl p-6 shadow-lg">
        <div className="text-amber-700 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <p className="text-gray-600">500+ Fleet, 100+ Cities Covered</p>
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center gap-8">
        <div className="bg-gradient-to-br from-cyan-50 to-cyan-200 rounded-xl p-6 shadow-lg max-w-sm">
          <div className="text-cyan-700 mb-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-600">Trusted by 50+ Corporate Offices</p>
        </div>

        <div className="bg-gradient-to-br from-lime-50 to-lime-200 rounded-xl p-6 shadow-lg max-w-sm">
          <div className="text-lime-700 mb-4">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <p className="text-gray-600">Technology Driven Fleet Management</p>
        </div>
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
                  A <strong>Noida based BPO</strong> struggled with late night staff commutes. Attrition was high because employees felt unsafe.
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">After partnering with WTL:</p>
                <ul className="list-disc pl-6 text-gray-700 mb-6">
                  <li>Employee safety improved with GPS-enabled cabs.</li>
                  <br />
                  <li>Attrition dropped by 35% in 6 months.</li>
                  <br />
                  <li>Late logins reduced by 60%.</li>
                  <br />
                  <li>Employee satisfaction scores increased significantly.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This case proves WTL is not just a vendor it’s a <strong>strategic partner for employee well being.</strong>
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
                  question="Do you provide 24/7 corporate cab service in Noida?"
                  answer="Yes, especially for IT/BPO companies with night shifts."
                />
                <FaqItem
                  question="Can we choose between shared and exclusive cabs?"
                  answer="Absolutely, both models are available."
                />
                <FaqItem
                  question="How do you ensure employee safety?"
                  answer="Verified drivers, GPS tracking, panic alerts, and real time monitoring."
                />
                <FaqItem
                  question="Do you cover Greater Noida and Delhi NCR too?"
                  answer="Yes, our fleet covers all nearby regions."
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
                  When businesses think of <strong>corporate cab service in Noida</strong>, one name stands out <strong>Worldtriplink (WTL Tourism Pvt Ltd)</strong>.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">Founded in 2016 in Pune and now trusted across India, WTL delivers <strong>safe, punctual, and affordable commute solutions</strong> for employees and executives. With <strong>500+ cabs</strong>, <strong>100+ cities covered</strong>, and <strong>50+ corporate clients served</strong>, we are proud to be the <strong>preferred transport partner in Noida</strong>.</p>
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
                  <strong>Contact WTL Tourism Pvt Ltd today</strong> to book your <strong>corporate cab service in Noida</strong> and give your employees the comfort, safety, and reliability they deserve.
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
            serviceName="Corporate Cab Service in Noida"
            serviceSlug="Corporate-Cab-Service-Noida"
          />
          <InquiryForm
            isOpen={isInquiryFormOpen}
            onClose={handleInquiryClose}
            serviceName="Corporate Cab Service in Noida"
            serviceSlug="Corporate-Cab-Service-Noida"
          />
        </main>
      </div>
    );
  } catch (error) {
    setHasError(true);
    return null;
  }
}