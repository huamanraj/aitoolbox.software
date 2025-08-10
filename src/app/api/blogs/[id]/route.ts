import { NextRequest, NextResponse } from "next/server";
import { getServerClients, BLOGS_DB_ID, BLOGS_COLLECTION_ID } from "@/lib/appwrite";
import { rateLimiter } from "@/lib/rate-limiter";

export const runtime = "nodejs";

function getIp(req: NextRequest) {
  // Prefer proxy headers; NextRequest.ip is not available in Next 15 types
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  const xr = req.headers.get("x-real-ip");
  if (xr) return xr;
  return "unknown";
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const { databases } = getServerClients();
    const doc = await databases.getDocument(BLOGS_DB_ID, BLOGS_COLLECTION_ID, id);
    return NextResponse.json(doc);
  } catch (error) {
    console.error("Failed to get blog:", error);
    return NextResponse.json({ error: "Failed to get blog" }, { status: 404 });
  }
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const ip = getIp(req);
    if (!rateLimiter(ip, 30, 60_000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    const { id } = await ctx.params;
    const body = await req.json();
    const { databases } = getServerClients();
    const updated = await databases.updateDocument(BLOGS_DB_ID, BLOGS_COLLECTION_ID, id, body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update blog:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const ip = getIp(req);
    if (!rateLimiter(ip, 10, 60_000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    const { id } = await ctx.params;
    const { databases } = getServerClients();
    await databases.deleteDocument(BLOGS_DB_ID, BLOGS_COLLECTION_ID, id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
