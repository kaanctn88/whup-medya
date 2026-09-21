import { Plus } from "lucide-react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "Fiyatlandırma nasıl belirleniyor?",
    a: "Keşif sonrası yazılı teklif. Sosyal medya & reklam aylık paket, film & web proje bazlıdır.",
  },
  {
    q: "Ne kadar hızlı başlıyoruz?",
    a: "48 saatte strateji, 14 günde ilk yayın. Çekimli projelerde takvim sözleşmede yazılır.",
  },
  {
    q: "Şehir dışına çalışıyor musunuz?",
    a: "Evet. Çekim ekibi Türkiye geneline gider; yönetim işleri uzaktan yürütülür.",
  },
];

export default function Faq() {
  return (
    <section className="pb-20">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal>
          <h3 className="mb-6 text-center font-display text-2xl font-bold">Sık sorulanlar</h3>
        </Reveal>
        <div className="space-y-2.5">
          {faqs.map((f) => (
            <Reveal key={f.q}>
              <details className="group rounded-2xl border border-line bg-card px-5 py-4 open:border-violet/50">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[14.5px] font-semibold">
                  {f.q}
                  <Plus className="h-4 w-4 text-electric transition group-open:rotate-45" />
                </summary>
                <p className="mt-2 text-[13.5px] text-muted">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
