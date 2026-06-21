import Nav from "@/components/Nav";
import BottomNav from "@/components/BottomNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import WorkTeaser from "@/components/WorkTeaser";
import ContactTeaser from "@/components/ContactTeaser";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="pb-24">
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <WorkTeaser />
      <ContactTeaser />
      <Footer />
      <BottomNav />
    </main>
  );
}
