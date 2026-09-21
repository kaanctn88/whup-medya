import fs from "fs";
import path from "path";

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

export type SiteContent = {
  general: GeneralContent;
  hero: HeroContent;
  logos: string[];
  services: ServiceContent[];
  cases: CaseContent[];
  testimonials: TestimonialContent[];
};

const contentFile = path.join(process.cwd(), "content", "site.json");

export function getContent(): SiteContent {
  const raw = fs.readFileSync(contentFile, "utf-8");
  return JSON.parse(raw) as SiteContent;
}

export function saveContent(data: SiteContent): void {
  fs.writeFileSync(contentFile, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

export function checkAdmin(req: Request): boolean {
  const expected = process.env.ADMIN_PASSWORD || "whup2026";
  return req.headers.get("x-admin-key") === expected;
}
