"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/content";

const ICONS = [
  "target",
  "clapperboard",
  "palette",
  "users",
  "shopping-bag",
  "flame",
  "building-2",
  "car",
  "utensils",
  "gem",
  "trending-up",
  "zap",
];
const COLORS = [
  "from-electric to-sky-600",
  "from-violet to-fuchsia-600",
  "from-tang to-amber-500",
  "from-emerald-400 to-teal-600",
];
const CATS = ["performans", "prodüksiyon", "marka"];
const TABS = ["İletişim Bilgileri", "Ana Sayfa İlk Bölüm", "Referanslarımız", "Hizmetler", "Başarı Hikayeleri", "Müşteri Yorumları"] as const;

const inputCls =
  "w-full rounded-xl border border-line bg-base px-3.5 py-2.5 text-[13.5px] text-white outline-none transition focus:border-violet";
const labelCls =
  "mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-muted";

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      {textarea ? (
        <textarea
          className={inputCls}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={inputCls}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <select
        className={inputCls}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-base">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function ImageField({
  label,
  value,
  adminKey,
  onChange,
  onMsg,
}: {
  label: string;
  value: string;
  adminKey: string;
  onChange: (v: string) => void;
  onMsg: (m: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  async function pick(f: File | undefined) {
    if (!f) return;
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", f);
      const r = await fetch("/api/upload", {
        method: "POST",
        headers: { "x-admin-key": adminKey },
        body: fd,
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Yüklenemedi");
      onChange(j.url);
      onMsg("Görsel yüklendi: " + j.url);
    } catch (e) {
      onMsg("Hata: " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div>
      <span className={labelCls}>{label}</span>
      <div className="flex items-start gap-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt="önizleme"
            className="h-16 w-24 shrink-0 rounded-xl border border-line object-cover"
          />
        ) : (
          <span className="grid h-16 w-24 shrink-0 place-items-center rounded-xl border border-dashed border-line text-[11px] text-muted">
            yok
          </span>
        )}
        <div className="flex-1 space-y-2">
          <input
            className={inputCls}
            value={value}
            placeholder="/images/... veya https://..."
            onChange={(e) => onChange(e.target.value)}
          />
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line px-4 py-2 text-[12.5px] font-bold transition hover:border-electric/60">
            {busy ? "Yükleniyor..." : "Bilgisayardan yükle (max 5MB)"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              disabled={busy}
              onChange={(e) => pick(e.target.files?.[0])}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

function ListEditor({
  items,
  onChange,
  placeholder,
}: {
  items: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      {items.map((t, k) => (
        <div key={k} className="flex gap-2">
          <input
            className={inputCls}
            value={t}
            placeholder={placeholder}
            onChange={(e) => {
              const n = [...items];
              n[k] = e.target.value;
              onChange(n);
            }}
          />
          <button
            onClick={() => onChange(items.filter((_, x) => x !== k))}
            className="shrink-0 rounded-xl border border-red-400/30 px-3 text-red-300 transition hover:bg-red-400/10"
            aria-label="Sil"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...items, ""])}
        className="rounded-xl border border-dashed border-line px-4 py-2 text-[12.5px] font-bold text-muted transition hover:border-electric/60 hover:text-white"
      >
        + Ekle
      </button>
    </div>
  );
}

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [data, setData] = useState<SiteContent | null>(null);
  const [tab, setTab] = useState<(typeof TABS)[number]>("İletişim Bilgileri");
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const k = sessionStorage.getItem("whup-admin-key") || "";
    if (k) {
      setKey(k);
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (!authed) return;
    fetch("/api/content")
      .then((r) => r.json())
      .then((j) => setData(j))
      .catch(() => setMsg("İçerik yüklenemedi."));
  }, [authed]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginErr("");
    const r = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-key": pw },
      body: "{}",
    });
    if (r.status === 401) {
      setLoginErr("Şifre yanlış.");
      return;
    }
    sessionStorage.setItem("whup-admin-key", pw);
    setKey(pw);
    setAuthed(true);
  }

  async function save() {
    if (!data) return;
    setSaving(true);
    setMsg("");
    try {
      const r = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": key },
        body: JSON.stringify(data),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Kaydedilemedi");
      setMsg("Kaydedildi. Site anında güncellendi.");
    } catch (e) {
      setMsg("Hata: " + (e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  function logout() {
    sessionStorage.removeItem("whup-admin-key");
    setKey("");
    setAuthed(false);
    setData(null);
  }

  if (!authed) {
    return (
      <main className="grid min-h-screen place-items-center bg-base px-5">
        <form
          onSubmit={login}
          className="w-full max-w-[360px] rounded-3xl border border-line bg-card p-8"
        >
          <div className="grad-bg mx-auto grid h-12 w-12 place-items-center rounded-2xl font-display text-xl font-bold">
            W
          </div>
          <h1 className="mt-4 text-center font-display text-xl font-bold">
            Whup Admin Paneli
          </h1>
          <p className="mt-1 text-center text-[13px] text-muted">
            Devam etmek için panel şifreni gir.
          </p>
          <input
            type="password"
            className={`${inputCls} mt-5`}
            placeholder="Şifre"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          {loginErr && <p className="mt-2 text-[12.5px] text-red-400">{loginErr}</p>}
          <button className="btn-primary grad-bg mt-4 w-full rounded-2xl py-3.5 text-[14px] font-bold">
            Giriş Yap
          </button>
        </form>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="grid min-h-screen place-items-center bg-base text-muted">
        Yükleniyor...
      </main>
    );
  }

  const set = <K extends keyof SiteContent>(k: K, v: SiteContent[K]) =>
    setData({ ...data, [k]: v });

  return (
    <main className="min-h-screen bg-base pb-24">
      <header className="sticky top-0 z-50 border-b border-line bg-base/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-5 py-3.5">
          <span className="grad-bg grid h-9 w-9 place-items-center rounded-xl font-display font-bold">
            W
          </span>
          <b className="font-display">WHUP ADMİN</b>
          <nav className="ml-2 flex flex-wrap gap-1.5">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-xl px-4 py-2 text-[13px] font-bold transition ${
                  tab === t ? "grad-bg" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </nav>
          <div className="ml-auto flex gap-2">
            <a
              href="/"
              target="_blank"
              className="rounded-xl border border-line px-4 py-2 text-[13px] font-bold transition hover:border-white/30"
            >
              Siteyi Gör
            </a>
            <button
              onClick={save}
              disabled={saving}
              className="btn-primary grad-bg rounded-xl px-5 py-2 text-[13px] font-bold disabled:opacity-50"
            >
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
            <button
              onClick={logout}
              className="rounded-xl border border-line px-4 py-2 text-[13px] font-bold text-muted transition hover:text-white"
            >
              Çıkış
            </button>
          </div>
        </div>
        {msg && (
          <div className="border-t border-line bg-card px-5 py-2 text-center text-[13px] font-semibold text-emerald-300">
            {msg}
          </div>
        )}
      </header>

      <div className="mx-auto max-w-6xl space-y-5 px-5 pt-8">
        {tab === "İletişim Bilgileri" && (
          <section className="grid gap-4 rounded-3xl border border-line bg-card p-6 md:grid-cols-2">
            <Field label="WhatsApp numarası (90...)" value={data.general.whatsapp} onChange={(v) => set("general", { ...data.general, whatsapp: v })} />
            <Field label="Telefon" value={data.general.phone} onChange={(v) => set("general", { ...data.general, phone: v })} />
            <Field label="E-posta" value={data.general.email} onChange={(v) => set("general", { ...data.general, email: v })} />
            <Field label="Adres" value={data.general.address} onChange={(v) => set("general", { ...data.general, address: v })} />
            <div className="md:col-span-2">
              <Field label="Footer açıklaması" textarea value={data.general.footerNote} onChange={(v) => set("general", { ...data.general, footerNote: v })} />
            </div>
          </section>
        )}

        {tab === "Ana Sayfa İlk Bölüm" && (
          <section className="grid gap-4 rounded-3xl border border-line bg-card p-6 md:grid-cols-2">
            <Field label="Rozet etiketi" value={data.hero.badgeTag} onChange={(v) => set("hero", { ...data.hero, badgeTag: v })} />
            <Field label="Rozet metni" value={data.hero.badgeText} onChange={(v) => set("hero", { ...data.hero, badgeText: v })} />
            <Field label="Başlık 1. satır" value={data.hero.titleA} onChange={(v) => set("hero", { ...data.hero, titleA: v })} />
            <Field label="Başlık 2. satır" value={data.hero.titleB} onChange={(v) => set("hero", { ...data.hero, titleB: v })} />
            <Field label="Başlık 2. satır vurgu (renkli)" value={data.hero.titleBAccent} onChange={(v) => set("hero", { ...data.hero, titleBAccent: v })} />
            <Field label="Başlık 3. satır" value={data.hero.titleC} onChange={(v) => set("hero", { ...data.hero, titleC: v })} />
            <div className="md:col-span-2">
              <Field label="Açıklama" textarea value={data.hero.descA} onChange={(v) => set("hero", { ...data.hero, descA: v })} />
            </div>
            <div className="md:col-span-2">
              <Field label="Vurgulu cümle" value={data.hero.descB} onChange={(v) => set("hero", { ...data.hero, descB: v })} />
            </div>
            <Field label="Birincil buton" value={data.hero.ctaPrimary} onChange={(v) => set("hero", { ...data.hero, ctaPrimary: v })} />
            <Field label="İkincil buton" value={data.hero.ctaSecondary} onChange={(v) => set("hero", { ...data.hero, ctaSecondary: v })} />
            <Field label="Puan (örn. 4.9/5)" value={data.hero.ratingScore} onChange={(v) => set("hero", { ...data.hero, ratingScore: v })} />
            <Field label="Puan notu" value={data.hero.ratingNote} onChange={(v) => set("hero", { ...data.hero, ratingNote: v })} />
            <div className="md:col-span-2">
              <Field label="Marka notu" value={data.hero.brandsNote} onChange={(v) => set("hero", { ...data.hero, brandsNote: v })} />
            </div>
            <div className="md:col-span-2">
              <span className={labelCls}>Güven rozetleri</span>
              <ListEditor items={data.hero.trust} onChange={(v) => set("hero", { ...data.hero, trust: v })} />
            </div>
            <div className="md:col-span-2">
              <ImageField label="Telefon ekran görseli" value={data.hero.reelImage} adminKey={key} onMsg={setMsg} onChange={(v) => set("hero", { ...data.hero, reelImage: v })} />
            </div>
            <Field label="Reels kullanıcı satırı" value={data.hero.reelUser} onChange={(v) => set("hero", { ...data.hero, reelUser: v })} />
            <Field label="Reels açıklama satırı" value={data.hero.reelCaption} onChange={(v) => set("hero", { ...data.hero, reelCaption: v })} />
            <Field label="Beğeni (örn. 128K)" value={data.hero.reelLikes} onChange={(v) => set("hero", { ...data.hero, reelLikes: v })} />
            <Field label="Yorum (örn. 4.2K)" value={data.hero.reelComments} onChange={(v) => set("hero", { ...data.hero, reelComments: v })} />
            <Field label="Paylaşım (örn. 9.8K)" value={data.hero.reelShares} onChange={(v) => set("hero", { ...data.hero, reelShares: v })} />
          </section>
        )}

        {tab === "Referanslarımız" && (
          <section className="rounded-3xl border border-line bg-card p-6">
            <span className={labelCls}>Marka logoları (sırayla kayar)</span>
            <ListEditor items={data.logos} onChange={(v) => set("logos", v)} placeholder="MARKA ADI" />
          </section>
        )}

        {tab === "Hizmetler" && (
          <section className="space-y-4">
            {data.services.map((s, k) => (
              <div key={k} className="grid gap-4 rounded-3xl border border-line bg-card p-6 md:grid-cols-2">
                <div className="md:col-span-2 flex items-center justify-between">
                  <b className="font-display">Hizmet {k + 1}</b>
                  <button
                    onClick={() => set("services", data.services.filter((_, x) => x !== k))}
                    className="rounded-xl border border-red-400/30 px-3 py-1.5 text-[12px] font-bold text-red-300"
                  >
                    Sil
                  </button>
                </div>
                <Select label="Simge" value={s.icon} options={ICONS} onChange={(v) => { const n = [...data.services]; n[k] = { ...n[k], icon: v }; set("services", n); }} />
                <Field label="Başlık" value={s.title} onChange={(v) => { const n = [...data.services]; n[k] = { ...n[k], title: v }; set("services", n); }} />
                <div className="md:col-span-2">
                  <Field label="Açıklama" textarea value={s.desc} onChange={(v) => { const n = [...data.services]; n[k] = { ...n[k], desc: v }; set("services", n); }} />
                </div>
                <Field label="Metrik kutusu" value={s.metric} onChange={(v) => { const n = [...data.services]; n[k] = { ...n[k], metric: v }; set("services", n); }} />
                <Field label="Görsel alt metni" value={s.imageAlt} onChange={(v) => { const n = [...data.services]; n[k] = { ...n[k], imageAlt: v }; set("services", n); }} />
                <div className="md:col-span-2">
                  <ImageField label="Kart görseli" value={s.image} adminKey={key} onMsg={setMsg} onChange={(v) => { const n = [...data.services]; n[k] = { ...n[k], image: v }; set("services", n); }} />
                </div>
              </div>
            ))}
            <button
              onClick={() => set("services", [...data.services, { icon: "target", title: "Yeni Hizmet", desc: "", metric: "", image: "", imageAlt: "" }])}
              className="w-full rounded-2xl border border-dashed border-line py-4 text-[13.5px] font-bold text-muted transition hover:border-electric/60 hover:text-white"
            >
              + Hizmet Ekle
            </button>
          </section>
        )}

        {tab === "Başarı Hikayeleri" && (
          <section className="space-y-4">
            {data.cases.map((c, k) => (
              <div key={k} className="grid gap-4 rounded-3xl border border-line bg-card p-6 md:grid-cols-2">
                <div className="md:col-span-2 flex items-center justify-between">
                  <b className="font-display">Vaka {k + 1}</b>
                  <button
                    onClick={() => set("cases", data.cases.filter((_, x) => x !== k))}
                    className="rounded-xl border border-red-400/30 px-3 py-1.5 text-[12px] font-bold text-red-300"
                  >
                    Sil
                  </button>
                </div>
                <Select label="Kategori" value={c.cat} options={CATS} onChange={(v) => { const n = [...data.cases]; n[k] = { ...n[k], cat: v }; set("cases", n); }} />
                <Select label="Simge" value={c.icon} options={ICONS} onChange={(v) => { const n = [...data.cases]; n[k] = { ...n[k], icon: v }; set("cases", n); }} />
                <Field label="Rozet (örn. PERFORMANS)" value={c.label} onChange={(v) => { const n = [...data.cases]; n[k] = { ...n[k], label: v }; set("cases", n); }} />
                <Field label="Başlık" value={c.title} onChange={(v) => { const n = [...data.cases]; n[k] = { ...n[k], title: v }; set("cases", n); }} />
                <Field label="Sektör" value={c.sector} onChange={(v) => { const n = [...data.cases]; n[k] = { ...n[k], sector: v }; set("cases", n); }} />
                <Field label="Yıl" value={c.year} onChange={(v) => { const n = [...data.cases]; n[k] = { ...n[k], year: v }; set("cases", n); }} />
                <div className="md:col-span-2">
                  <Field label="Problem" textarea value={c.problem} onChange={(v) => { const n = [...data.cases]; n[k] = { ...n[k], problem: v }; set("cases", n); }} />
                </div>
                <div className="md:col-span-2">
                  <Field label="Çözüm" textarea value={c.solution} onChange={(v) => { const n = [...data.cases]; n[k] = { ...n[k], solution: v }; set("cases", n); }} />
                </div>
                <Field label="Metrik 1" value={c.metrics[0] || ""} onChange={(v) => { const n = [...data.cases]; n[k] = { ...n[k], metrics: [v, n[k].metrics[1] || ""] }; set("cases", n); }} />
                <Field label="Metrik 2" value={c.metrics[1] || ""} onChange={(v) => { const n = [...data.cases]; n[k] = { ...n[k], metrics: [n[k].metrics[0] || "", v] }; set("cases", n); }} />
                <Field label="Görsel alt metni" value={c.imageAlt} onChange={(v) => { const n = [...data.cases]; n[k] = { ...n[k], imageAlt: v }; set("cases", n); }} />
                <div>
                  <ImageField label="Kapak görseli" value={c.image} adminKey={key} onMsg={setMsg} onChange={(v) => { const n = [...data.cases]; n[k] = { ...n[k], image: v }; set("cases", n); }} />
                </div>
              </div>
            ))}
            <button
              onClick={() => set("cases", [...data.cases, { cat: "performans", label: "PERFORMANS", title: "Yeni Vaka", sector: "", year: "2026", problem: "", solution: "", metrics: ["", ""], icon: "target", image: "", imageAlt: "" }])}
              className="w-full rounded-2xl border border-dashed border-line py-4 text-[13.5px] font-bold text-muted transition hover:border-electric/60 hover:text-white"
            >
              + Vaka Ekle
            </button>
          </section>
        )}

        {tab === "Müşteri Yorumları" && (
          <section className="space-y-4">
            {data.testimonials.map((t, k) => (
              <div key={k} className="grid gap-4 rounded-3xl border border-line bg-card p-6 md:grid-cols-2">
                <div className="md:col-span-2 flex items-center justify-between">
                  <b className="font-display">Yorum {k + 1}</b>
                  <button
                    onClick={() => set("testimonials", data.testimonials.filter((_, x) => x !== k))}
                    className="rounded-xl border border-red-400/30 px-3 py-1.5 text-[12px] font-bold text-red-300"
                  >
                    Sil
                  </button>
                </div>
                <div className="md:col-span-2">
                  <Field label="Yorum metni" textarea value={t.text} onChange={(v) => { const n = [...data.testimonials]; n[k] = { ...n[k], text: v }; set("testimonials", n); }} />
                </div>
                <Field label="İsim — Firma" value={t.name} onChange={(v) => { const n = [...data.testimonials]; n[k] = { ...n[k], name: v }; set("testimonials", n); }} />
                <Field label="Proje" value={t.role} onChange={(v) => { const n = [...data.testimonials]; n[k] = { ...n[k], role: v }; set("testimonials", n); }} />
                <Field label="Baş harfler" value={t.initials} onChange={(v) => { const n = [...data.testimonials]; n[k] = { ...n[k], initials: v }; set("testimonials", n); }} />
                <Field label="Metrik çipi" value={t.metric} onChange={(v) => { const n = [...data.testimonials]; n[k] = { ...n[k], metric: v }; set("testimonials", n); }} />
                <div className="md:col-span-2">
                  <Select label="Avatar rengi" value={t.color} options={COLORS} onChange={(v) => { const n = [...data.testimonials]; n[k] = { ...n[k], color: v }; set("testimonials", n); }} />
                </div>
              </div>
            ))}
            <button
              onClick={() => set("testimonials", [...data.testimonials, { text: "", name: "", role: "", initials: "?", metric: "", color: COLORS[0] }])}
              className="w-full rounded-2xl border border-dashed border-line py-4 text-[13.5px] font-bold text-muted transition hover:border-electric/60 hover:text-white"
            >
              + Yorum Ekle
            </button>
          </section>
        )}
      </div>
    </main>
  );
}
