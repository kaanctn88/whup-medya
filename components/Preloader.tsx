"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [hide, setHide] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const id = setInterval(
      () => setPct((p) => Math.min(100, Math.round(p + 8 + Math.random() * 20))),
      140
    );
    const t2 = setTimeout(() => setHide(true), 1650);
    const t3 = setTimeout(() => setGone(true), 2350);
    return () => {
      clearInterval(id);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-base transition-opacity duration-700 ${
        hide ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="hero-grid-bg absolute inset-0 opacity-70" />
      <div className="glow-orb absolute left-1/2 top-1/3 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-violet/50" />
      <div className="relative text-center">
        <div
          className="intro-fade mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl font-display text-2xl font-bold text-white shadow-[0_10px_40px_rgba(124,92,255,0.5)]"
          style={{
            background: "linear-gradient(135deg,#00E5FF,#7C5CFF 55%,#FF6B2C)",
            animationDelay: "0.05s",
          }}
        >
          W
        </div>
        <div className="font-display text-6xl font-bold tracking-tight md:text-7xl">
          {"WHUP".split("").map((ch, k) => (
            <span
              key={k}
              className="intro-letter"
              style={{ animationDelay: `${0.15 + k * 0.09}s` }}
            >
              {ch}
            </span>
          ))}
          <span className="intro-letter grad-text" style={{ animationDelay: "0.51s" }}>
            .
          </span>
        </div>
        <p
          className="intro-fade mt-3 text-[11px] font-bold tracking-[5px] text-muted"
          style={{ animationDelay: "0.7s" }}
        >
          DİJİTAL MEDYA AJANSI
        </p>
        <div className="intro-fade mx-auto mt-7 w-56" style={{ animationDelay: "0.85s" }}>
          <div className="h-[3px] overflow-hidden rounded-full bg-white/10">
            <div
              className="grad-bg h-full rounded-full transition-all duration-150 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[11px] font-semibold text-muted">
            <span>Yükleniyor</span>
            <span className="text-white">%{pct}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
