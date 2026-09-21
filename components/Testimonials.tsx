"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, TrendingUp } from "lucide-react";
import type { TestimonialContent } from "@/lib/content";
import Reveal from "./Reveal";
import { clsx } from "@/lib/clsx";

export default function Testimonials({ items }: { items: TestimonialContent[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = items[i];

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % items.length), 7000);
    return () => clearInterval(id);
  }, [paused, i]);

  return (
    <section id="yorumlar" className="border-y border-line bg-surface/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto mb-10 max-w-[600px] text-center">
          <div className="mb-3 text-[11px] font-bold tracking-[3px] text-electric">SOSYAL KANIT</div>
          <h2 className="font-display text-[clamp(30px,4.5vw,52px)] font-bold">
            Müşteriler ne <span className="grad-text">diyor?</span>
          </h2>
        </Reveal>
        <Reveal className="mb-8 flex flex-wrap items-center justify-center gap-2.5">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-[12.5px] font-bold">
            <span className="tracking-widest text-amber-300">★★★★★</span> 4.9/5
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-[12.5px] font-semibold text-white/75">
            <BadgeCheck className="h-4 w-4 text-emerald-300" /> 200+ değerlendirme
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-[12.5px] font-semibold text-white/75">
            120+ marka ile çalışma
          </span>
        </Reveal>
        <Reveal>
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative mx-auto max-w-[760px] overflow-hidden rounded-[28px] border border-line bg-card p-8 text-center md:p-12">
            <div className="absolute left-1/2 top-0 h-[120px] w-[400px] -translate-x-1/2 bg-violet/25 blur-3xl" />
            <div className="relative">
              <div className="flex items-center justify-center gap-3">
                <span
                  className={clsx(
                    "grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full bg-gradient-to-br font-display text-[18px] font-bold text-white ring-2 ring-white/20",
                    t.color
                  )}
                >
                  {t.initials}
                </span>
                <span className="text-left leading-tight">
                  <b className="text-[14.5px]">{t.name}</b>
                  <br />
                  <small className="text-[12.5px] text-muted">{t.role}</small>
                </span>
                <span className="ml-1 hidden items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-bold text-emerald-300 sm:inline-flex">
                  <BadgeCheck className="h-3.5 w-3.5" /> Doğrulanmış
                </span>
              </div>
              <div className="mt-5 text-[14px] tracking-[4px] text-amber-300">★★★★★</div>
              <p
                key={i}
                className="mx-auto mt-4 min-h-[96px] font-display text-[clamp(18px,2.4vw,24px)] italic leading-relaxed"
              >
                {t.text}
              </p>
              <div className="mt-2 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-[12.5px] font-bold text-emerald-300">
                  <TrendingUp className="h-4 w-4" /> {t.metric}
                </span>
              </div>
              <div className="mt-7 flex justify-center gap-2.5">
                <button
                  onClick={() => setI((i - 1 + items.length) % items.length)}
                  aria-label="Önceki"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line transition hover:bg-white hover:text-base"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setI((i + 1) % items.length)}
                  aria-label="Sonraki"
                  className="grad-bg grid h-11 w-11 place-items-center rounded-full transition hover:scale-105"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-5 flex justify-center gap-1.5">
                {items.map((_, d) => (
                  <span
                    key={d}
                    className={clsx(
                      "h-1.5 rounded-full transition-all",
                      d === i ? "grad-bg w-8" : "w-3 bg-white/15"
                    )}
                  />
                ))}
              </div>
              <div className="mt-7 flex flex-wrap justify-center gap-2.5">
                {items.map((p, d) => (
                  <button
                    key={p.name}
                    onClick={() => setI(d)}
                    aria-label={`${p.name} yorumunu göster`}
                    className={clsx(
                      "review-pill flex items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-4 transition",
                      d === i
                        ? "border-white/30 bg-white/10"
                        : "border-line bg-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <span
                      className={clsx(
                        "grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br font-display text-[12px] font-bold text-white",
                        p.color
                      )}
                    >
                      {p.initials}
                    </span>
                    <span className="text-left leading-tight">
                      <b className="block text-[12px]">{p.name.split(" — ")[0]}</b>
                      <small className="text-[10.5px] text-muted">{p.name.split(" — ")[1]}</small>
                    </span>
                  </button>
                ))}
              </div>
              <div className="mx-auto mt-5 h-1 max-w-[220px] overflow-hidden rounded-full bg-white/10">
                <span
                  key={i}
                  className="slide-progress grad-bg block h-full rounded-full"
                  style={{ animationPlayState: paused ? "paused" : "running" }}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
