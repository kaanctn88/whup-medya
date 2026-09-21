import { NextResponse } from "next/server";
import { checkAdmin, getContent, saveContent } from "@/lib/content";

export async function GET() {
  return NextResponse.json(getContent());
}

export async function POST(req: Request) {
  if (!checkAdmin(req)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }
  try {
    const data = await req.json();
    const ok =
      data &&
      typeof data === "object" &&
      data.general && typeof data.general === "object" &&
      data.hero && typeof data.hero === "object" &&
      Array.isArray(data.logos) &&
      Array.isArray(data.services) &&
      Array.isArray(data.cases) &&
      Array.isArray(data.testimonials);
    if (!ok) {
      return NextResponse.json({ error: "Eksik bölüm var, kaydedilmedi" }, { status: 400 });
    }
    saveContent(data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Kaydedilemedi" }, { status: 500 });
  }
}
