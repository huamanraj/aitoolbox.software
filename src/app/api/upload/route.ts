import { NextRequest, NextResponse } from "next/server";
import { getServerClients, BLOG_COVERS_BUCKET_ID } from "@/lib/appwrite";
import { ID } from "appwrite";
import { rateLimiter } from "@/lib/rate-limiter";

export const runtime = "nodejs";

function getIp(req: NextRequest) {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  const xr = req.headers.get("x-real-ip");
  if (xr) return xr;
  return "unknown";
}

export async function POST(req: NextRequest) {
  try {
    const ip = getIp(req);
    if (!rateLimiter(ip, 10, 60_000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }
    const { storage } = getServerClients();
    const created = await storage.createFile(BLOG_COVERS_BUCKET_ID, ID.unique(), file as unknown as File);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}


