"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play, Zap, BadgeCheck, FileText, Clock, Award, Heart, MessageCircle, Share2, Flame } from "lucide-react";
import Reveal from "./Reveal";
import type { HeroContent } from "@/lib/content";

const trustIcons = [
  <Award key="a" className="h-4 w-4 text-electric" />,
  <BadgeCheck key="b" className="h-4 w-4 text-electric" />,
  <FileText key="c" className="h-4 w-4 text-electric" />,
  <Clock key="d" className="h-4 w-4 text-electric" />,
];

function parseCount(v: string): number {
  const m = v.replace(/\s/g, "").match(/^([\d.,]+)\s*([KkMm])?/);
  if (!m) return 0;
  const n = parseFloat(m[1].replace(",", "."));
  const mult = m[2]?.toUpperCase() === "M" ? 1e6 : m[2]?.toUpperCase() === "K" ? 1e3 : 1;
  return Math.round(n * mult);
}

export default function Hero({ content: h }: { content: HeroContent }) {
  const [likes, setLikes] = useState(() => parseCount(h.reelLikes) || 128400);

  useEffect(() => {
    const id = setInterval(
      () => setLikes((v) => v + 3 + Math.floor(Math.random() * 18)),
      2000
    );
    return () => clearInterval(id);
  }, []);

  const fmtLikes =
    likes >= 1000 ? (likes / 1000).toFixed(1).replace(".", ",") + "K" : `${likes}`;

  return (
    <section id="top" className="relative overflow-hidden pb-14 pt-36 md:pt-44">
      <div className="hero-grid-bg absolute inset-0" />
      <div className="glow-orb absolute -top-20 left-1/4 h-[420px] w-[420px] rounded-full bg-violet/60" />
      <div className="glow-orb absolute right-0 top-20 h-[380px] w-[380px] rounded-full bg-electric/30" />
      <div className="glow-orb absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-tang/30" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <Reveal>
            <span className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/5 py-1.5 pl-2 pr-4 text-[12px] font-semibold">
              <span className="grad-bg rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider">
                {h.badgeTag}
              </span>
              <span className="text-white/80">{h.badgeText}</span>
              <span className="h-1.5 w-1.5 animate-pulseGlow rounded-full bg-emerald-400" />
            </span>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="font-display text-[clamp(44px,7vw,88px)] font-bold leading-[0.98] tracking-tight">
              {h.titleA}
              <br />
              {h.titleB} <span className="grad-text">{h.titleBAccent}</span>
              <br />
              <span className="relative inline-block text-white drop-shadow-[0_0_30px_rgba(124,92,255,0.35)]">
                {h.titleC}
                <span className="grad-bg absolute -bottom-1 left-0 h-[6px] w-full rounded-full md:-bottom-2" />
              </span>
            </h1>
          </Reveal>
          <Reveal delay={1}>
            <p className="mt-6 max-w-[520px] text-[16px] leading-relaxed text-muted md:text-[17px]">
              {h.descA}{" "}
              <em className="border-b border-electric/50 not-italic text-white">{h.descB}</em>
            </p>
          </Reveal>
          <Reveal delay={2}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#teklif"
                className="btn-primary grad-bg inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-[15px] font-bold"
              >
                {h.ctaPrimary} <Zap className="h-4 w-4" />
              </a>
              <a
                href="#isler"
                className="inline-flex items-center gap-2 rounded-2xl border border-line bg-white/5 px-7 py-4 text-[15px] font-bold transition hover:border-white/20 hover:bg-white/10"
              >
                <Play className="h-4 w-4 text-electric" /> {h.ctaSecondary}
              </a>
            </div>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <div className="flex -space-x-3">
                {["◈", "⬣", "⬢"].map((s, i) => (
                  <span
                    key={i}
                    className="grid h-10 w-10 place-items-center rounded-full border-2 border-base bg-gradient-to-br from-violet to-electric text-sm"
                  >
                    {s}
                  </span>
                ))}
                <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-base bg-card text-[11px] font-bold">
                  120+
                </span>
              </div>
              <div className="text-[13px] leading-snug text-muted">
                <span className="text-[11px] tracking-widest text-amber-300">{h.ratingStars}</span>{" "}
                <b className="text-white">{h.ratingScore}</b> — {h.ratingNote}
                <br />
                {h.brandsNote}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {h.trust.map((label, k) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-2 text-[12px] font-semibold text-white/75"
                >
                  {trustIcons[k % trustIcons.length]} {label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={2} className="relative mx-auto w-full max-w-[340px]">
          <div className="grad-bg glow-pulse absolute inset-x-8 bottom-0 top-10 rounded-full opacity-25 blur-3xl" />
          {/* Telefon — viral Reels önizleme */}
          <div className="phone-sway relative mx-auto w-[270px] rounded-[2.8rem] border border-white/15 bg-black p-2.5 shadow-2xl sm:w-[300px]">
            <div className="relative aspect-[9/19] overflow-hidden rounded-[2.2rem] bg-surface">
              <Image
                src={h.reelImage}
                alt="Viral Reels önizleme"
                fill
                sizes="300px"
                className="reel-zoom object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
              <div className="absolute left-1/2 top-2.5 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
              <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-bold tracking-wider backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" /> REC
              </div>
              <div className="absolute right-4 top-4 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-bold backdrop-blur">
                0:12
              </div>
              <a
                href="#teklif"
                aria-label="Reels önizlemesi için teklif al"
                className="grad-bg play-ping absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full shadow-xl transition hover:scale-105"
              >
                <Play className="ml-1 h-6 w-6 text-white" />
              </a>
              <div className="absolute bottom-24 right-3 flex flex-col items-center gap-4 text-[10px] font-bold">
                <span className="flex flex-col items-center gap-1">
                  <Heart className="heart-pop h-6 w-6 fill-red-500 text-red-500" /> {fmtLikes}
                </span>
                <span className="flex flex-col items-center gap-1">
                  <MessageCircle className="h-6 w-6" /> {h.reelComments}
                </span>
                <span className="flex flex-col items-center gap-1">
                  <Share2 className="h-6 w-6" /> {h.reelShares}
                </span>
              </div>
              <div className="absolute inset-x-4 bottom-4">
                <p className="text-[12px] font-semibold">{h.reelUser}</p>
                <p className="text-[11px] text-white/70">{h.reelCaption}</p>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/20">
                  <div className="grad-bg progress-loop h-full rounded-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="glass absolute left-0 top-10 flex animate-float items-center gap-2.5 rounded-2xl border border-line px-4 py-3 text-[12.5px] font-semibold shadow-xl md:-left-12">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-tang/15 text-tang">
              <Flame className="h-5 w-5" />
            </span>
            Keşfet&apos;te #1
          </div>
          <div
            className="glass absolute bottom-16 right-0 flex animate-float items-center gap-2.5 rounded-2xl border border-line px-4 py-3 text-[12.5px] font-semibold shadow-xl md:-right-10"
            style={{ animationDelay: "1.5s" }}
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400/15 text-emerald-300">
              <Heart className="h-5 w-5" />
            </span>
            +12K takipçi
          </div>
        </Reveal>
      </div>
    </section>
  );
}
