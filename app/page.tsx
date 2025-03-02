import type { Metadata } from "next"
import Link from "next/link"
import App from "./app"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Free QR Code Generator | Create Custom QR Codes with Logo & Colors",
  description: "Create custom QR codes for URL, vCard, WiFi, text, email, and more. Add your logo, choose colors, frames, and download in high quality. No sign-up required.",
  keywords: "QR code generator, free QR code maker, custom QR codes, QR code with logo, QR code creator, QR code design, QR code for business, QR code for website, QR code for WiFi, QR code for vCard",
  authors: [{ name: "Ryan Vogel" }],
  creator: "Ryan Vogel",
  publisher: "exon.dev",
  openGraph: {
    title: "Free QR Code Generator | Create Custom QR Codes with Logo & Colors",
    description: "Create custom QR codes for URL, vCard, WiFi, text, email, and more. Add your logo, choose colors, frames, and download in high quality. No sign-up required.",
    url: "https://qr.exon.dev",
    siteName: "qr.exon.dev",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Generator | Create Custom QR Codes with Logo & Colors",
    description: "Create custom QR codes for URL, vCard, WiFi, text, email, and more. Add your logo, choose colors, frames, and download in high quality. No sign-up required.",
    creator: "@ryandavogel",
  },
  alternates: {
    canonical: "https://qr.exon.dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: "technology",
  verification: {
    google: "verification_token", // Replace with your actual Google verification token
  },
}

export default function Home() {
  return <App />
}

function PreLaunchLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4 text-slate-900">
      <main className="flex w-full max-w-3xl flex-col items-center justify-center space-y-8 text-center">
        <div className="animate-fade-in flex flex-col items-center space-y-6">
          <div className="rounded-full bg-slate-900 p-5">
            <Image src="/exon.png" alt="qr.exon.dev" width={32} height={32} />
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">qr.exon.dev</h1>

          <p className="max-w-md text-xl text-slate-600 sm:text-2xl">
            This will be the future home of qr.exon.dev, the last QR code creator you&apos;ll ever need.
          </p>
        </div>

        <div className="mt-8 animate-pulse">
          <div className="h-1 w-16 rounded bg-slate-300"></div>
        </div>

        <p className="text-sm text-slate-500">Coming soon</p>

        <a
          href="https://x.com/ryandavogel"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center gap-3 text-sm text-slate-600 hover:text-slate-900 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 509.64" className="h-5 w-5" fill="currentColor">
            <rect width="512" height="509.64" rx="115.61" ry="115.61" />
            <path
              fill="#fff"
              fillRule="nonzero"
              d="M323.74 148.35h36.12l-78.91 90.2 92.83 122.73h-72.69l-56.93-74.43-65.15 74.43h-36.14l84.4-96.47-89.05-116.46h74.53l51.46 68.04 59.53-68.04zm-12.68 191.31h20.02l-129.2-170.82H180.4l130.66 170.82z"
            />
          </svg>
          <span>Watch Ryan's journey as he builds it</span>
        </a>
        <Link href="/test" className="mt-8 text-sm text-slate-500 hover:text-slate-700 transition-colors">
          View QR Code Generator Test Page
        </Link>
      </main>
    </div>
  )
}

