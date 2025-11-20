// app/contact/page.tsx
import { Metadata } from "next"
import ContactClient from "././contactClient"

export const metadata: Metadata = {
  title: "Contact Us | World Trip Link",
  description: "Get in touch with the World Trip Link team for travel bookings, inquiries, and support.",
  metadataBase: new URL("http://localhost:8085"),
  alternates: {
    canonical: "http://localhost:8085/contact",
  },
  openGraph: {
    title: "Contact - World Trip Link",
    description: "Have questions or need help? Reach out to World Trip Link's support team.",
    url: "http://localhost:8085/contact",
    siteName: "World Trip Link",
    type: "website",
    images: [
      {
        url: "http://localhost:8085/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact World Trip Link",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact - World Trip Link",
    description: "Reach out to us for support and travel inquiries.",
    site: "@worldtriplink",
    creator: "@worldtriplink",
    images: ["http://localhost:8085/images/og-image.jpg"],
  },
  robots: "index, follow",
}

export default function Page() {
  return <ContactClient />
}
