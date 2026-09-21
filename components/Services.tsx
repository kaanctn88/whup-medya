"use client";

import { ArrowRight, Clapperboard, Palette, Target, Users } from "lucide-react";
import type { ServiceContent } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { clsx } from "@/lib/clsx";

const icons: Record<string, React.ReactNode> = {
  target: <Target className="h-6 w-6" />,
  clapperboard: <Clapperboard className="h-6 w-6" />,
  palette: <Palette className="h-6 w-6" />,
  users: <Users className="h-6 w-6" />,
};

const accents: Record<string, { badge: string; metric: string }> = {
  target: {
    badge: "from-electric to-sky-600 shadow-[0_10px_36px_rgba(0,229,255,0.4)]",
    metric: "border-electric/30 bg-electric/10 text-electric",
  },
  clapperboard: {
    badge: "from-violet to-fuchsia-600 shadow-[0_10px_36px_rgba(124,92,255,0.45)]",
    metric: "border-violet/40 bg-violet/15 text-violet-200",
  },
  palette: {
    badge: "from-tang to-amber-500 shadow-[0_10px_36px_rgba(255,107,44,0.4)]",
    metric: "border-tang/40 bg-tang/10 text-[#FFA25E]",
  },
  users: {
    badge: "from-emerald-400 to-teal-600 shadow-[0_10px_36px_rgba(52,211,153,0.4)]",
    metric: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  },
};

export default function Services({ items }: { items: ServiceContent[] }) {
  return (
    <section id="hizmetler" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="HİZMETLERİMİZ"
            title={
              <>
                Liste değil, <span className="grad-text">büyüme sistemi.</span>
              </>
            }
            desc="Hover ile keşfedin: her kart bir sonuç makinesi. Statik listelerin tam tersi — interaktif, metrikli, dürüst."
          />
          <Reveal>
            <a
              href="#teklif"
              className="inline-flex items-center gap-2 self-start rounded-xl border border-line px-5 py-3 text-[13.5px] font-bold transition hover:border-electric/60"
            >
              Ücretsiz ön analiz <ArrowRight className="h-4 w-4 text-electric" />
            </a>
          </Reveal>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <article
                className={`group relative flex min-h-[380px] flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 ${
                  s.featured
                    ? "border-violet/40 bg-gradient-to-b from-[#1C1533] to-card"
                    : "border-line bg-card hover:border-violet/50"
                }`}
              >
                <div className="flex flex-1 flex-col items-center p-7 pt-8 text-center">
                  <span className="relative mb-6 block h-16 w-16">
                    <span
                      className={clsx(
                        "absolute inset-0 rounded-[1.4rem] bg-gradient-to-br opacity-60 blur-md transition-opacity duration-300 group-hover:opacity-100",
                        accents[s.icon].badge
                      )}
                    />
                    <span
                      className={clsx(
                        "relative grid h-16 w-16 place-items-center rounded-[1.4rem] bg-gradient-to-br text-white ring-1 ring-white/25 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110",
                        accents[s.icon].badge
                      )}
                    >
                      {icons[s.icon]}
                    </span>
                  </span>
                <h3 className="font-display text-[19px] font-bold leading-snug">{s.title}</h3>
                <span
                  className={clsx(
                    "mx-auto mb-3 mt-3 block h-[3px] w-10 rounded-full bg-gradient-to-r",
                    accents[s.icon].badge
                  )}
                />
                <p className="mb-5 font-display text-[15px] font-medium leading-relaxed text-white/90">
                  {s.desc}
                </p>
                <div className="mt-auto">
                  <div
                    className={clsx(
                      "rounded-2xl border px-4 py-3 text-[13px] font-bold",
                      accents[s.icon].metric
                    )}
                  >
                    {s.metric}
                  </div>
                </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
