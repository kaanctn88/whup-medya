import { BadgeCheck, ShieldCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Counter from "./Counter";
import { clsx } from "@/lib/clsx";

const steps = [
  {
    n: "01",
    t: "Keşif",
    time: "48 saat",
    d: "Hedef, rakip, marj ve kreatif envanter. Ücretsiz ön analiz + yol haritası.",
    badge: "from-electric to-sky-600 shadow-[0_8px_28px_rgba(0,229,255,0.35)]",
    pill: "border-electric/30 bg-electric/10 text-electric",
  },
  {
    n: "02",
    t: "Strateji",
    time: "1. hafta",
    d: "Kanal + bütçe + mesaj mimarisi. Net KPI: ROAS, CAC, izlenme.",
    badge: "from-violet to-fuchsia-600 shadow-[0_8px_28px_rgba(124,92,255,0.4)]",
    pill: "border-violet/40 bg-violet/15 text-violet-200",
  },
  {
    n: "03",
    t: "Üretim",
    time: "2. hafta",
    d: "Şirket içi ekip: çekim, kurgu, tasarım. 2 tur revizyon, çok formatlı teslim.",
    badge: "from-tang to-amber-500 shadow-[0_8px_28px_rgba(255,107,44,0.35)]",
    pill: "border-tang/40 bg-tang/10 text-[#FFA25E]",
  },
  {
    n: "04",
    t: "Ölçekleme",
    time: "sürekli",
    d: "Kazananı büyüt, kaybedeni kapat. Haftalık sprint + canlı rapor.",
    badge: "from-emerald-400 to-teal-600 shadow-[0_8px_28px_rgba(52,211,153,0.35)]",
    pill: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  },
];

const stats = [
  { v: 48, suffix: "sa", label: "İlk geri dönüş" },
  { v: 14, suffix: " gün", label: "İlk yayına çıkış" },
  { v: 350, suffix: "+", label: "Tamamlanan proje" },
  { v: 96, suffix: "%", label: "Müşteri memnuniyeti", prefix: "%" },
];

export default function Process() {
  return (
    <section id="surec" className="relative overflow-hidden py-20 md:py-28">
      <div className="glow-orb absolute -left-24 top-1/3 h-[380px] w-[380px] rounded-full bg-violet/40" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="BİZİ FARKLI KILANLAR"
            title={
              <>
                Hız + veri + <span className="grad-text">kreatif cesaret.</span>
              </>
            }
            desc="Klasik ajanslar gibi aylarca bekletmiyoruz. 4 adımlı Whup Sprint ile 14 günde ilk sonuç, 90 günde ölçekleme."
          />
          <div className="mt-8 space-y-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <div className="group flex items-start gap-5 rounded-2xl border border-line bg-card/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-card md:p-6">
                  <span
                    className={clsx(
                      "shrink-0 rounded-[1.3rem] bg-gradient-to-br p-[2px] transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110",
                      s.badge
                    )}
                  >
                    <span className="grid h-[68px] w-[68px] place-items-center rounded-[1.2rem] bg-[#0D1322] leading-none">
                      <span className="text-center">
                        <b className="block font-display text-[20px] font-bold text-white">
                          {s.n}
                        </b>
                        <small className="mt-0.5 block text-[8.5px] font-bold tracking-[2px] text-muted">
                          ADIM
                        </small>
                      </span>
                    </span>
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <b className="font-display text-[18px]">{s.t}</b>
                      <span
                        className={clsx(
                          "rounded-full border px-3 py-1 text-[11px] font-bold",
                          s.pill
                        )}
                      >
                        {s.time}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/70">{s.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Reveal delay={1}>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-card p-7 md:p-8">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-electric/20 blur-3xl" />
              <div className="mb-5 text-[11px] font-bold tracking-[2px] text-muted">
                WHUP HIZ GÖSTERGESİ
              </div>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-line bg-base p-5">
                    <b className="grad-text font-display text-3xl">
                      <Counter to={s.v} />
                      {s.suffix}
                    </b>
                    <p className="mt-1 text-[12.5px] text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-4 rounded-2xl border border-line bg-base p-5">
                <span className="grad-bg grid h-11 w-11 shrink-0 place-items-center rounded-xl">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <p className="text-[13px] text-white/80">
                  <b className="text-white">Sonuç garantili sprint:</b> ilk 30 günde KPI tutmazsa
                  strateji revizyonu ücretsiz.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <div className="grad-bg rounded-3xl p-[1.5px]">
              <div className="relative overflow-hidden rounded-3xl bg-[#100F24] p-7 md:p-8">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet/30 blur-3xl" />
                <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-electric/15 blur-3xl" />
                <span className="grad-text pointer-events-none absolute -top-4 right-5 select-none font-display text-[110px] font-bold leading-none opacity-25">
                  &rdquo;
                </span>
                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-full border border-violet/40 bg-violet/15 px-3.5 py-1.5 text-[10.5px] font-bold tracking-[2px] text-violet-200">
                    KURUCU MANİFESTO
                  </span>
                  <p className="mt-4 font-display text-[clamp(19px,2.4vw,24px)] font-medium italic leading-relaxed">
                    &ldquo;Biz süs değil,{" "}
                    <span className="grad-text font-bold not-italic">sonuç</span> üretiyoruz. Her
                    kare ve her kampanya satışa çalışır.&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-3.5 border-t border-line pt-5">
                    <span className="grad-bg grid h-12 w-12 shrink-0 place-items-center rounded-full font-display text-lg font-bold ring-2 ring-white/20">
                      W
                    </span>
                    <span className="leading-tight">
                      <b className="flex items-center gap-1.5 text-[14px]">
                        Whup Medya Kurucu Ekibi <BadgeCheck className="h-4 w-4 text-electric" />
                      </b>
                      <small className="text-[12px] text-muted">Est. 2016 • İstanbul</small>
                    </span>
                    <span className="ml-auto hidden font-display text-5xl font-bold text-white/5 sm:block">
                      &rsquo;16
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
