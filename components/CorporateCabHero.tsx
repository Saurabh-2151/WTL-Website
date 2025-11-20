"use client";

import Image from "next/image";
import CabBookingForm from "@/components/CabBookingForm";

interface CorporateCabHeroProps {
  imageSrc: string;
  alt: string;
  title: string;
  subtitle?: string;
  description?: string;
}

export default function CorporateCabHero({
  imageSrc,
  alt,
  title,
  subtitle,
  description,
}: CorporateCabHeroProps) {
  return (
    <section className="relative w-full">
      {/* Background image behind the transparent cab form */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="text-center mb-8 md:mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="mt-3 text-base md:text-lg text-white/80 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Shared transparent liquid-glass cab booking form */}
        <CabBookingForm />
      </div>
    </section>
  );
}
