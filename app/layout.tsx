import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ToolVerse - Free Online Tools",
    template: "%s | ToolVerse",
  },
  description:
    "Free online tools for images, PDFs, developers, text, AI, and everyday tasks. Fast, secure, and privacy-friendly. No sign-up required.",
  keywords: [
    "free online tools",
    "online tools",
    "free tools",
    "image compressor",
    "image resizer",
    "image cropper",
    "image rotator",
    "image flipper",
    "image to base64",
    "jpg to png",
    "png to jpg",
    "png to webp",
    "jpg to webp",
    "webp to png",
    "webp to jpg",
    "qr code generator",
    "password generator",
    "json formatter",
    "base64 encoder",
    "color converter",
    "character counter",
    "uuid generator",
    "text to speech",
    "unit converter",
    "markdown editor",
    "hash generator",
    "date calculator",
    "case converter",
    "html encoder",
    "slug generator",
    "lorem ipsum",
    "bmi calculator",
    "percentage calculator",
    "vat calculator",
    "pdf tools",
    "calculator",
    "online calculator",
  ],
  authors: [{ name: "ToolVerse", url: SITE_URL }],
  creator: "ToolVerse",
  publisher: "ToolVerse",
  applicationName: "ToolVerse",
  category: "Web Tools",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    title: "ToolVerse",
    statusBarStyle: "default",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "ToolVerse - Free Online Tools",
    description:
      "Free online tools for images, PDFs, developers, text, AI, and everyday tasks. Fast, secure, and privacy-friendly.",
    type: "website",
    url: SITE_URL,
    siteName: "ToolVerse",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ToolVerse - Free Online Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolVerse - Free Online Tools",
    description:
      "Free online tools for images, PDFs, developers, text, AI, and everyday tasks.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google Site Verification */}
        <meta
          name="google-site-verification"
          content="4yGTyFSvFiMqYJz6BpZ-v4olh82Msz6ITaM6e9qKPac"
        />

        {/* Google Analytics (GA4) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Z3D2TSGYJ7" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Z3D2TSGYJ7');
            `,
          }}
        />

        {/* Microsoft Clarity — session recording & heatmaps */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xvu8nfhcfq");
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ToolVerse",
              url: SITE_URL,
              logo: `${SITE_URL}/favicon.svg`,
              description:
                "Free online tools for images, PDFs, developers, text, AI, and everyday tasks.",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                url: `${SITE_URL}/contact`,
              },
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

