import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Reels from "@/components/Reels";
import Directions from "@/components/Directions";
import Why from "@/components/Why";
import Process from "@/components/Process";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Reels />
        <Directions />
        <Why />
        <Process />
        <About />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
