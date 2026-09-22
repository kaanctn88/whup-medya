import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoMarquee from "@/components/LogoMarquee";
import Services from "@/components/Services";
import Cases from "@/components/Cases";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import QuoteWizard from "@/components/QuoteWizard";
import CtaBanner from "@/components/CtaBanner";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import Preloader from "@/components/Preloader";
import { MessageCircle } from "lucide-react";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const c = await getContent();
  return (
    <main>
      <Preloader />
      <Navbar whatsapp={c.general.whatsapp} />
      <Hero content={c.hero} />
      <LogoMarquee logos={c.logos} />
      <Services items={c.services} />
      <Cases items={c.cases} />
      <Process />
      <Testimonials items={c.testimonials} />
      <QuoteWizard general={c.general} />
      <CtaBanner general={c.general} />
      <Faq />
      <Footer general={c.general} />
      <a
        href={`https://wa.me/${c.general.whatsapp}`}
        target="_blank"
        aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-[95] grid h-14 w-14 place-items-center rounded-full bg-[#22b45e] shadow-[0_12px_30px_rgba(34,180,94,.45)] transition hover:scale-105"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </a>
      <BackToTop />
    </main>
  );
}
