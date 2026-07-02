import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Timeline />
        <Skills />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
