import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar"; // Import Navbar Anda

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar /> {/* Navbar akan muncul di atas semua halaman */}
      <Component {...pageProps} />
    </>
  );
}