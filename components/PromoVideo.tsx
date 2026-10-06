import { Clapperboard } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import type { PromoContent } from "@/lib/content";

export default function PromoVideo({ content: p }: { content: PromoContent }) {
  if (!p.video) return null;
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          align="center"
          eyebrow={p.eyebrow || "TANITIM FİLMİ"}
          title={
            <>
              {p.title} <span className="grad-text">{p.titleAccent}</span>
            </>
          }
          desc={p.desc}
        />
        <Reveal className="mx-auto mt-10 max-w-4xl">
          <div className="grad-bg rounded-[28px] p-[1.5px] shadow-2xl">
            <div className="relative overflow-hidden rounded-[26px] bg-black">
              <video
                className="aspect-video w-full"
                src={p.video}
                poster={p.poster || undefined}
                controls
                playsInline
                preload="metadata"
              />
            </div>
          </div>
          <p className="mt-4 flex items-center justify-center gap-2 text-center text-[12.5px] text-muted">
            <Clapperboard className="h-4 w-4 text-electric" />
            Sesi açmayı unutmayın
          </p>
        </Reveal>
      </div>
    </section>
  );
}
