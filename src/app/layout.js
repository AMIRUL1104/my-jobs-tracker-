import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// আপনার প্রজেক্টের রিয়েল মেটাডাটা এবং এসইও (SEO) অপ্টিমাইজড টাইটেল
export const metadata = {
  title: "JobTrackr – Personal Job Application Tracker",
  description:
    "Track, manage, and optimize your personal job application lifecycle efficiently in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 text-slate-900 font-sans">
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
