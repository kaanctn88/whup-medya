import { Instagram, Linkedin, Music2, Youtube } from "lucide-react";
import type { GeneralContent } from "@/lib/content";

export default function Footer({ general: g }: { general: GeneralContent }) {
  return (
    <footer className="border-t border-line bg-[#080C14]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grad-bg grid h-10 w-10 place-items-center rounded-xl font-display font-bold">
              W
            </span>
            <b className="font-display tracking-wide">WHUP MEDYA</b>
          </div>
          <p className="mt-4 max-w-[300px] text-[13px] text-muted">{g.footerNote}</p>
          <div className="mt-5 flex gap-2">
            {[Instagram, Youtube, Linkedin, Music2].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Sosyal medya"
                className="grid h-10 w-10 place-items-center rounded-full border border-line transition hover:bg-white hover:text-base"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-[11px] font-bold tracking-[2px] text-electric">HİZMETLER</h4>
          <div className="space-y-2.5 text-[13.5px] text-white/70">
            <a href="#hizmetler" className="block hover:text-white">Performans Reklamları</a>
            <a href="#hizmetler" className="block hover:text-white">Viral Video</a>
            <a href="#hizmetler" className="block hover:text-white">Marka & Web</a>
            <a href="#hizmetler" className="block hover:text-white">Sosyal Medya</a>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-[11px] font-bold tracking-[2px] text-electric">AJANS</h4>
          <div className="space-y-2.5 text-[13.5px] text-white/70">
            <a href="#isler" className="block hover:text-white">İşlerimiz</a>
            <a href="#surec" className="block hover:text-white">Süreç</a>
            <a href="#yorumlar" className="block hover:text-white">Referanslar</a>
            <a href="#teklif" className="block hover:text-white">Teklif Al</a>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-[11px] font-bold tracking-[2px] text-electric">İLETİŞİM</h4>
          <div className="space-y-2.5 text-[13.5px] text-white/70">
            <a href={`tel:${g.phone.replace(/\s/g, "")}`} className="block hover:text-white">
              {g.phone}
            </a>
            <a href={`mailto:${g.email}`} className="block hover:text-white">
              {g.email}
            </a>
            <span className="block">{g.address}</span>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 px-5 py-5 text-[12px] text-muted md:px-8">
          <span>© 2026 Whup Medya. Tüm hakları saklıdır.</span>
          <span>KVKK • Gizlilik • Çerezler</span>
        </div>
      </div>
    </footer>
  );
}
