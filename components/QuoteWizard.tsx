"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  CalendarCheck,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { clsx } from "@/lib/clsx";
import type { GeneralContent } from "@/lib/content";

const svcOptions = [
  { v: "Performans Reklamları", d: "Meta / Google / TikTok" },
  { v: "Viral Video Prodüksiyon", d: "Reels / Shorts / Kurgu" },
  { v: "Marka + Web", d: "Kimlik / Site / SEO" },
  { v: "Sosyal Medya Yönetimi", d: "İçerik + Topluluk" },
];
const budgets = [
  { v: "25-55K", d: "Başlangıç" },
  { v: "55-120K", d: "Büyüme ★" },
  { v: "120K+", d: "Ölçekleme" },
];
const times = [{ v: "Hemen" }, { v: "1 ay içinde" }, { v: "Araştırıyorum" }];
const slots = [
  { d: "Bugün", t: "16:30" },
  { d: "Yarın", t: "11:00" },
  { d: "Yarın", t: "15:00" },
];

export default function QuoteWizard({ general: g }: { general: GeneralContent }) {
  const [step, setStep] = useState(1);
  const [svc, setSvc] = useState<string[]>(["Viral Video Prodüksiyon"]);
  const [budget, setBudget] = useState("55-120K");
  const [time, setTime] = useState("Hemen");
  const [slot, setSlot] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", mail: "", msg: "" });
  const [errors, setErrors] = useState<{ name?: string; phone?: string; msg?: string }>({});

  const showToast = (m: string) => {
    setToast(m);
    window.clearTimeout((showToast as unknown as { _t?: number })._t);
    (showToast as unknown as { _t?: number })._t = window.setTimeout(() => setToast(null), 2800);
  };

  const toggleSvc = (v: string) =>
    setSvc((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: { name?: string; phone?: string; msg?: string } = {};
    if (form.name.trim().length < 3) er.name = "Lütfen adınızı yazın.";
    if (form.phone.replace(/\D/g, "").length < 10)
      er.phone = "Geçerli bir telefon yazın (05__ ___ __ __).";
    if (form.msg.trim().length < 5) er.msg = "Projenizden kısaca bahsedin.";
    setErrors(er);
    const first = er.name || er.phone || er.msg;
    if (first) return showToast(first);
    showToast(
      `Teşekkürler ${form.name.split(" ")[0]}! ${svc.join(", ") || "Talebin"} için 24 saat içinde arıyoruz.`
    );
    setForm({ name: "", phone: "", mail: "", msg: "" });
  };

  const clearError = (k: "name" | "phone" | "msg") =>
    setErrors((prev) => (prev[k] ? { ...prev, [k]: undefined } : prev));

  return (
    <section id="teklif" className="relative overflow-hidden py-20 md:py-28">
      <div className="glow-orb absolute bottom-0 right-1/4 h-[420px] w-[420px] rounded-full bg-violet/40" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mx-auto mb-12 max-w-[620px] text-center">
          <SectionHeading
            align="center"
            eyebrow="YÜKSEK DÖNÜŞÜM MODÜLÜ"
            title={
              <>
                60 saniyede <span className="grad-text">teklifini oluştur.</span>
              </>
            }
            desc="Sıkıcı form yok. 3 adımda bütçeni seç, takvimini ayırt, aynı gün dönüş al."
          />
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[1.15fr_.85fr]">
          {/* Wizard */}
          <Reveal>
            <div className="relative overflow-hidden rounded-[28px] border border-line bg-card p-6 md:p-10">
              <div className="mb-8 flex items-center gap-2">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className={clsx(
                      "h-1.5 flex-1 rounded-full",
                      n <= step ? "grad-bg" : "bg-white/10"
                    )}
                  />
                ))}
              </div>

              {step === 1 && (
                <div>
                  <b className="font-display text-[20px]">1/3 — Hangi hizmete ihtiyacın var?</b>
                  <p className="mb-5 mt-1 text-[13.5px] text-muted">
                    Birden fazla seçebilirsin.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {svcOptions.map((o) => (
                      <button
                        key={o.v}
                        type="button"
                        onClick={() => toggleSvc(o.v)}
                        className={clsx("chip text-left", svc.includes(o.v) && "selected")}
                      >
                        <b>◉ {o.v}</b>
                        <br />
                        <small className="text-muted">{o.d}</small>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="btn-primary grad-bg mt-6 w-full rounded-2xl py-4 text-[15px] font-bold"
                  >
                    Devam Et →
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <b className="font-display text-[20px]">2/3 — Bütçe & zamanlama</b>
                  <p className="mb-5 mt-1 text-[13.5px] text-muted">
                    Şeffaf ol, sana en verimli planı kuralım.
                  </p>
                  <label className="text-[11px] font-bold tracking-widest text-muted">
                    AYLIK BÜTÇE
                  </label>
                  <div className="mb-5 mt-2 grid gap-3 sm:grid-cols-3">
                    {budgets.map((b) => (
                      <button
                        key={b.v}
                        type="button"
                        onClick={() => setBudget(b.v)}
                        className={clsx("chip text-center", budget === b.v && "selected")}
                      >
                        {b.v}
                        <br />
                        <small className="text-muted">{b.d}</small>
                      </button>
                    ))}
                  </div>
                  <label className="text-[11px] font-bold tracking-widest text-muted">
                    NE ZAMAN BAŞLAYALIM?
                  </label>
                  <div className="mt-2 grid gap-3 sm:grid-cols-3">
                    {times.map((t) => (
                      <button
                        key={t.v}
                        type="button"
                        onClick={() => setTime(t.v)}
                        className={clsx("chip text-center", time === t.v && "selected")}
                      >
                        {t.v}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 rounded-2xl border border-line py-4 text-[14px] font-bold transition hover:bg-white/5"
                    >
                      ← Geri
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="btn-primary grad-bg flex-[2] rounded-2xl py-4 text-[15px] font-bold"
                    >
                      Devam Et →
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <b className="font-display text-[20px]">3/3 — Sana nasıl ulaşalım?</b>
                  <p className="mb-5 mt-1 text-[13.5px] text-muted">
                    Ortalama dönüş süremiz mesai saatlerinde <b className="text-white">3 saat.</b>
                  </p>
                  <form onSubmit={submit} noValidate className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <input
                        className={clsx("field", errors.name && "field-error")}
                        placeholder="Ad Soyad *"
                        value={form.name}
                        aria-invalid={!!errors.name}
                        onChange={(e) => {
                          setForm({ ...form, name: e.target.value });
                          clearError("name");
                        }}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-[12px] text-red-400">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <input
                        className={clsx("field", errors.phone && "field-error")}
                        placeholder="Telefon * 05__ ___ __ __"
                        value={form.phone}
                        aria-invalid={!!errors.phone}
                        onChange={(e) => {
                          setForm({ ...form, phone: e.target.value });
                          clearError("phone");
                        }}
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-[12px] text-red-400">{errors.phone}</p>
                      )}
                    </div>
                    <input
                      type="email"
                      className="field sm:col-span-2"
                      placeholder="E-posta (opsiyonel)"
                      value={form.mail}
                      onChange={(e) => setForm({ ...form, mail: e.target.value })}
                    />
                    <div className="sm:col-span-2">
                      <textarea
                        rows={3}
                        className={clsx("field", errors.msg && "field-error")}
                        placeholder="Projenizden kısaca bahsedin *"
                        value={form.msg}
                        aria-invalid={!!errors.msg}
                        onChange={(e) => {
                          setForm({ ...form, msg: e.target.value });
                          clearError("msg");
                        }}
                      />
                      {errors.msg && (
                        <p className="mt-1.5 text-[12px] text-red-400">{errors.msg}</p>
                      )}
                    </div>
                    <button className="btn-primary grad-bg rounded-2xl py-4 text-[15px] font-bold sm:col-span-2">
                      Teklifimi Gönder — Ücretsiz Keşif İste ✦
                    </button>
                  </form>
                  <button
                    onClick={() => setStep(2)}
                    className="mt-3 w-full text-center text-[13px] text-muted transition hover:text-white"
                  >
                    ← Bilgileri düzenle
                  </button>
                  <p className="mt-4 rounded-xl border border-line bg-base px-4 py-3 text-[12.5px] text-muted">
                    Seçimin: <b className="text-white">{svc.join(", ") || "—"}</b> • Bütçe:{" "}
                    <b className="text-white">{budget}</b> • Başlangıç:{" "}
                    <b className="text-white">{time}</b>
                    {slot ? (
                      <>
                        {" "}
                        • Slot: <b className="text-white">{slot}</b>
                      </>
                    ) : null}
                  </p>
                </div>
              )}
            </div>
          </Reveal>

          {/* Side */}
          <div className="space-y-4">
            <Reveal delay={1}>
              <div className="rounded-[28px] border border-line bg-gradient-to-br from-[#152238] to-card p-7">
                <b className="flex items-center gap-2 font-display text-[18px]">
                  <CalendarCheck className="h-5 w-5 text-electric" /> Takvimden randevu kap
                </b>
                <p className="mb-4 mt-1 text-[13px] text-muted">
                  15 dk&apos;lık ücretsiz keşif görüşmesi. Müsaitlik: hafta içi 09:00–19:00.
                </p>
                <div className="grid grid-cols-3 gap-2 text-center text-[12.5px] font-semibold">
                  {slots.map((s) => {
                    const key = `${s.d} ${s.t}`;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setSlot(key);
                          showToast(`Slot ön-rezerve edildi: ${key}`);
                        }}
                        className={clsx("chip", slot === key && "selected")}
                      >
                        {s.d}
                        <br />
                        <small className="text-electric">{s.t}</small>
                      </button>
                    );
                  })}
                </div>
                {slot && (
                  <p className="mt-3 text-[12.5px] text-emerald-300">
                    ✓ Slot ön-rezerve edildi — formda adını bırakman yeterli.
                  </p>
                )}
              </div>
            </Reveal>
            <Reveal delay={2}>
              <a
                href={`https://wa.me/${g.whatsapp}?text=Merhaba%20Whup%20Medya%2C%20teklif%20almak%20istiyorum.`}
                target="_blank"
                className="group flex items-center gap-4 rounded-[24px] border border-emerald-400/30 bg-[#0E2A1A] p-6 transition hover:border-emerald-400/60"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#22b45e] transition group-hover:scale-105">
                  <MessageCircle className="h-6 w-6 text-white" />
                </span>
                <span>
                  <b className="text-[15px]">WhatsApp&apos;tan hızlı yaz</b>
                  <br />
                  <small className="text-[12.5px] text-emerald-200/70">
                    Çevrimiçi • ~5 dk içinde yanıt
                  </small>
                </span>
                <ArrowUpRight className="ml-auto h-5 w-5 text-emerald-300" />
              </a>
            </Reveal>
            <Reveal delay={3}>
              <div className="space-y-3 rounded-[24px] border border-line bg-card p-6 text-[13.5px]">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-electric" />
                  <a href={`tel:${g.phone.replace(/\s/g, "")}`} className="font-semibold">
                    {g.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-electric" />
                  <a href={`mailto:${g.email}`}>{g.email}</a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-electric" />
                  <span className="text-white/70">{g.address}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {toast && (
        <div className="glass fixed bottom-24 left-1/2 z-[120] max-w-[92vw] -translate-x-1/2 rounded-2xl border border-violet/40 px-6 py-3.5 text-center text-[13.5px] font-semibold">
          {toast}
        </div>
      )}
    </section>
  );
}
