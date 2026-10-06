import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

export async function POST(req: Request): Promise<NextResponse> {
  const body = (await req.json()) as HandleUploadBody;
  try {
    const res = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        let key = "";
        try {
          key = JSON.parse(clientPayload || "{}").key || "";
        } catch {
          key = "";
        }
        const expected = process.env.ADMIN_PASSWORD || "whup2026";
        if (key !== expected) throw new Error("Yetkisiz");
        return {
          allowedContentTypes: ["video/mp4", "video/webm"],
          maximumSizeInBytes: 100 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
    });
    return NextResponse.json(res);
  } catch (e) {
    return NextResponse.json(
      { error: "Yükleme bileti alınamadı: " + (e as Error).message },
      { status: 401 }
    );
  }
}
