import Nav from "@/components/Nav";
import BottomNav from "@/components/BottomNav";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="pb-24">
      <Nav />
      <div className="pt-24">
        <Contact />
      </div>
      <Footer />
      <BottomNav />
    </main>
  );
}
