"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import { clsx } from "@/lib/clsx";

const links = [
  { id: "hizmetler", href: "#hizmetler", label: "Hizmetler" },
  { id: "isler", href: "#isler", label: "İşler" },
  { id: "surec", href: "#surec", label: "Süreç" },
  { id: "yorumlar", href: "#yorumlar", label: "Referanslar" },
  { id: "teklif", href: "#teklif", label: "Teklif" },
];

export default function Navbar({ whatsapp }: { whatsapp: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[90]">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="glass mt-4 flex items-center justify-between rounded-2xl border border-line px-4 py-3 md:px-6">
          <a href="#top" className="flex items-center gap-3">
            <span className="grad-bg grid h-10 w-10 place-items-center rounded-xl font-display text-lg font-bold">
              W
            </span>
            <span className="leading-none">
              <b className="font-display tracking-wide">WHUP MEDYA</b>
              <br />
              <small className="text-[9px] font-semibold tracking-[3px] text-muted">
                DİJİTAL AJANS
              </small>
            </span>
          </a>
          <nav className="hidden items-center gap-1 text-[13.5px] font-medium text-white/70 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                aria-current={active === l.id ? "true" : undefined}
                className={clsx(
                  "rounded-lg px-4 py-2 transition hover:bg-white/5 hover:text-white",
                  active === l.id && "bg-white/10 text-white"
                )}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              className="hidden items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-[13px] font-semibold transition hover:border-electric/60 md:inline-flex"
            >
              <MessageCircle className="h-4 w-4 text-electric" /> WhatsApp
            </a>
            <a
              href="#teklif"
              className="btn-primary grad-bg inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-bold sm:px-5"
            >
              <span className="hidden min-[400px]:inline">Teklif Alın</span>
              <span className="min-[400px]:hidden">Teklif</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menü"
              className="grid h-10 w-10 place-items-center rounded-xl border border-line lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="glass mt-2 rounded-2xl border border-line p-3 text-[15px] font-medium lg:hidden">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#teklif"
              onClick={() => setOpen(false)}
              className="grad-bg mt-1 block rounded-xl px-4 py-3 text-center font-bold"
            >
              Teklif Alın
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
