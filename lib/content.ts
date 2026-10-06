import fs from "fs";
import path from "path";
import { list, put } from "@vercel/blob";

export type GeneralContent = {
  whatsapp: string;
  phone: string;
  email: string;
  address: string;
  footerNote: string;
};

export type HeroContent = {
  badgeTag: string;
  badgeText: string;
  titleA: string;
  titleB: string;
  titleBAccent: string;
  titleC: string;
  descA: string;
  descB: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ratingStars: string;
  ratingScore: string;
  ratingNote: string;
  brandsNote: string;
  trust: string[];
  reelImage: string;
  reelUser: string;
  reelCaption: string;
  reelLikes: string;
  reelComments: string;
  reelShares: string;
};

export type ServiceContent = {
  icon: string;
  title: string;
  desc: string;
  metric: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

export type CaseContent = {
  cat: string;
  label: string;
  title: string;
  sector: string;
  year: string;
  problem: string;
  solution: string;
  metrics: string[];
  icon: string;
  image: string;
  imageAlt: string;
};

export type TestimonialContent = {
  text: string;
  name: string;
  role: string;
  initials: string;
  metric: string;
  color: string;
};

export type PromoContent = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  desc: string;
  video: string;
  poster: string;
};

export type SiteContent = {
  general: GeneralContent;
  hero: HeroContent;
  logos: string[];
  services: ServiceContent[];
  cases: CaseContent[];
  testimonials: TestimonialContent[];
  promo: PromoContent;
};

const BLOB_KEY = "content/site.json";
const contentFile = path.join(process.cwd(), "content", "site.json");
// Yeni Blob modelinde token yok: BLOB_STORE_ID + otomatik OIDC yeterli
export const useBlobStorage = () =>
  !!(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
const useBlob = useBlobStorage;

async function getBlobJson(): Promise<SiteContent | null> {
  try {
    const { blobs } = await list({ prefix: BLOB_KEY, limit: 1 });
    if (!blobs.length) return null;
    const r = await fetch(blobs[0].url, { cache: "no-store" });
    if (!r.ok) return null;
    return (await r.json()) as SiteContent;
  } catch {
    return null;
  }
}

export async function getContent(): Promise<SiteContent> {
  const local = JSON.parse(fs.readFileSync(contentFile, "utf-8")) as SiteContent;
  if (useBlobStorage()) {
    const b = await getBlobJson();
    if (b) {
      // Boş bırakılan alanlarda yerel varsayılan geçerli olur
      const saved = b as Partial<SiteContent>;
      const withFallback = <T extends object>(d: T, s?: Partial<T>): T => {
        const out = { ...d, ...s };
        (Object.keys(d) as (keyof T)[]).forEach((k) => {
          if (out[k] === "") out[k] = d[k];
        });
        return out;
      };
      return {
        ...b,
        general: withFallback(local.general, saved.general),
        hero: withFallback(local.hero, saved.hero),
        promo: withFallback(local.promo, saved.promo),
      };
    }
  }
  return local;
}

export async function saveContent(data: SiteContent): Promise<void> {
  const body = JSON.stringify(data, null, 2);
  if (useBlob()) {
    await put(BLOB_KEY, body, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return;
  }
  fs.writeFileSync(contentFile, body + "\n", "utf-8");
}

export function checkAdmin(req: Request): boolean {
  const expected = process.env.ADMIN_PASSWORD || "whup2026";
  return req.headers.get("x-admin-key") === expected;
}
