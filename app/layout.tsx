import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ConfettiProvider } from "@/components/custom/confetti-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TechTrail",
  description:
    "A web base lms platform for learning and teaching tech related topics and courses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        layout: {
          logoImageUrl: "/techtrail-logo.svg",
          socialButtonsVariant: "iconButton",
        },
        variables: {
          colorText: "#EBD3F8",
          colorPrimary: "#ffffff",
          colorBackground: "#231f26",
          colorInputBackground: "#17141c",
          colorInputText: "#EBD3F8",
        },
      }}
    >
      <html lang="en">
        <head>
          <link rel="icon" type="image/svg+xml" href="/techtrail-logo.svg" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ConfettiProvider />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
