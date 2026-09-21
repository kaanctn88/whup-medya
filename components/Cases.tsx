"use client";

import { useState } from "react";
import Image from "next/image";
import { Building2, Car, Flame, Gem, ShoppingBag, Utensils } from "lucide-react";
import type { CaseContent } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { clsx } from "@/lib/clsx";

const icons: Record<string, React.ReactNode> = {
  "shopping-bag": <ShoppingBag className="h-5 w-5 text-white" />,
  flame: <Flame className="h-5 w-5 text-white" />,
  "building-2": <Building2 className="h-5 w-5 text-white" />,
  car: <Car className="h-5 w-5 text-white" />,
  utensils: <Utensils className="h-5 w-5 text-white" />,
  gem: <Gem className="h-5 w-5 text-white" />,
  target: <ShoppingBag className="h-5 w-5 text-white" />,
};

const gradients: Record<string, string> = {
  performans: "from-[#1B2B5E] to-[#0B0F19]",
  prodüksiyon: "from-[#5E1B3A] to-[#0B0F19]",
  marka: "from-[#0E4A44] to-[#0B0F19]",
};

type Filter = "all" | string;
const filters: Array<{ v: Filter; label: string }> = [
  { v: "all", label: "Tümü" },
  { v: "performans", label: "Performans" },
  { v: "prodüksiyon", label: "Prodüksiyon" },
  { v: "marka", label: "Marka & Web" },
];

export default function Cases({ items }: { items: CaseContent[] }) {
  const [f, setF] = useState<Filter>("all");
  const list = items.filter((c) => f === "all" || c.cat === f);

  return (
    <section id="isler" className="border-y border-line bg-surface/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="BAŞARI HİKAYELERİ"
          title={
            <>
              Görsel değil, <span className="grad-text">vaka analizi</span> sunuyoruz.
            </>
          }
          desc="Her projede aynı format: Problem → Çözüm → Metrik. Filtrele, incele, karar ver."
        />
        <Reveal className="mb-8 mt-8 flex flex-wrap gap-2">
          {filters.map((b) => (
            <button
              key={b.v}
              onClick={() => setF(b.v)}
              className={clsx(
                "rounded-full border border-line px-5 py-2.5 text-[13px] font-semibold transition hover:border-white/30",
                f === b.v && "border-white bg-white text-base"
              )}
            >
              {b.label}
            </button>
          ))}
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((c) => (
            <article
              key={c.title}
              className="group overflow-hidden rounded-3xl border border-line bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-violet/50"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/20 to-transparent" />
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[c.cat] || gradients.performans} opacity-50`} />
                <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold tracking-widest text-base">
                  {c.label}
                </span>
                <span className="glass absolute bottom-4 left-4 z-10 grid h-10 w-10 place-items-center rounded-xl border border-white/15">
                  {icons[c.icon]}
                </span>
                <span className="grad-bg absolute bottom-4 right-4 z-10 rounded-full px-3 py-1.5 text-[12px] font-bold">
                  {c.metrics[0]}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-[17px] font-bold">{c.title}</h3>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-wider text-muted">
                  {c.sector} • {c.year}
                </p>
                <div className="mt-4 space-y-3 text-[13px]">
                  <p>
                    <b className="text-electric">Problem: </b>
                    <span className="text-white/70">{c.problem}</span>
                  </p>
                  <p>
                    <b className="text-violet-300">Çözüm: </b>
                    <span className="text-white/70">{c.solution}</span>
                  </p>
                  <p className="flex flex-wrap gap-2 pt-1">
                    {c.metrics.map((m, i) => (
                      <span
                        key={m}
                        className={
                          i === 0
                            ? "rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11.5px] font-bold text-emerald-300"
                            : "rounded-full border border-line bg-white/5 px-3 py-1 text-[11.5px] text-white/70"
                        }
                      >
                        {m}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
