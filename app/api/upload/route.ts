import fs from "fs";
import path from "path";
import sharp from "sharp";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { checkAdmin } from "@/lib/content";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
// Sitedeki en büyük kullanım (CTA bandı) 1600px — üstü otomatik küçültülür
const MAX_DIM = 1600;

export async function POST(req: Request) {
  if (!checkAdmin(req)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Dosya yok" }, { status: 400 });
    }
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json({ error: "Sadece JPG/PNG/WebP/GIF" }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "En fazla 5MB" }, { status: 400 });
    }
    const base = file.name
      .toLowerCase()
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-z0-9çğıöşü]+/gi, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "gorsel";
    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : file.type === "image/gif" ? "gif" : "jpg";
    const name = `${Date.now()}-${base}.${ext}`;
    const input = Buffer.from(await file.arrayBuffer());
    let output: Buffer;
    if (file.type === "image/gif") {
      // Animasyon bozulmasın diye GIF aynen saklanır
      output = input;
    } else {
      const pipeline = sharp(input, { animated: false }).rotate();
      const meta = await pipeline.metadata();
      const needResize =
        (meta.width || 0) > MAX_DIM || (meta.height || 0) > MAX_DIM;
      const resized = needResize
        ? pipeline.resize({
            width: MAX_DIM,
            height: MAX_DIM,
            fit: "inside",
            withoutEnlargement: true,
          })
        : pipeline;
      output =
        ext === "png"
          ? await resized.png({ compressionLevel: 9 }).toBuffer()
          : ext === "webp"
            ? await resized.webp({ quality: 82 }).toBuffer()
            : await resized.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    }
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      // Vercel'de dosya sistemi kalıcı değil — direkt Blob'a yaz
      const blob = await put(`uploads/${name}`, output, {
        access: "public",
        contentType: file.type,
      });
      return NextResponse.json({ url: blob.url });
    }
    fs.writeFileSync(path.join(process.cwd(), "public", "uploads", name), output);
    return NextResponse.json({ url: `/uploads/${name}` });
  } catch {
    return NextResponse.json({ error: "Yüklenemedi" }, { status: 500 });
  }
}
