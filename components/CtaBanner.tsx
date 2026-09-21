import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import Reveal from "./Reveal";
import type { GeneralContent } from "@/lib/content";

export default function CtaBanner({ general: g }: { general: GeneralContent }) {
  return (
    <section className="pb-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-line">
            <Image
              src="/images/cta-banner.jpg"
              alt="Whup Medya ekibi strateji toplantısında"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/85 to-[#0B0F19]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-violet/25 via-transparent to-transparent" />
            <div className="relative grid gap-8 p-8 md:grid-cols-[1.2fr_.8fr] md:items-center md:p-14">
              <div>
                <div className="mb-3 text-[11px] font-bold tracking-[3px] text-electric">
                  ÜCRETSİZ KEŞİF GÖRÜŞMESİ
                </div>
                <h2 className="font-display text-[clamp(26px,4vw,44px)] font-bold leading-tight">
                  Projenizi konuşmaya <span className="grad-text">hazır mısınız?</span>
                </h2>
                <p className="mt-3 max-w-[440px] text-[14.5px] text-white/70">
                  15 dakikada markanızın büyüme haritasını çıkaralım. Formu doldurun, aynı gün
                  dönüş yapalım.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="#teklif"
                  className="btn-primary grad-bg inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-4 text-[15px] font-bold"
                >
                  Hemen Teklif Al <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={`tel:${g.phone.replace(/\s/g, "")}`}
                  className="glass inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 px-7 py-4 text-[15px] font-bold transition hover:border-white/40"
                >
                  <Phone className="h-4 w-4 text-electric" /> {g.phone}
                </a>
                <small className="text-center text-[12px] text-white/50">
                  Hafta içi 09:00–19:00 • Ortalama dönüş 3 saat
                </small>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
