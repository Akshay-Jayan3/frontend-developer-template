import Nav from "@/components/Nav";
import BottomNav from "@/components/BottomNav";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function WorkPage() {
  return (
    <main className="pb-24">
      <Nav />
      <div className="pt-24">
        <Projects />
      </div>
      <Footer />
      <BottomNav />
    </main>
  );
}
