// app/service/page.tsx
import { Metadata } from "next"
import ServiceClient from "././serviceClient"

export const metadata: Metadata = {
  title: "Our Services | World Trip Link",
  description: "Explore all the travel services offered by World Trip Link including cabs, flights, hotels, and more.",
  metadataBase: new URL("http://localhost:8085"),
  alternates: {
    canonical: "http://localhost:8085/service",
  },
  openGraph: {
    title: "Services - World Trip Link",
    description: "Check out our full range of travel services to plan your perfect trip.",
    url: "http://localhost:8085/service",
    siteName: "World Trip Link",
    type: "website",
    images: [
      {
        url: "http://localhost:8085/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Services offered by World Trip Link",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services - World Trip Link",
    description: "Travel smarter with World Trip Link’s full-service booking options.",
    site: "@worldtriplink",
    creator: "@worldtriplink",
    images: ["http://localhost:8085/images/og-image.jpg"],
  },
  robots: "index, follow",
}

export default function Page() {
  return <ServiceClient />
}
