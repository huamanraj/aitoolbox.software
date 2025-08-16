import { NextRequest, NextResponse } from "next/server";
import { getServerClients, BLOGS_DB_ID, BLOGS_COLLECTION_ID } from "@/lib/appwrite";
import { Query } from "appwrite";
import { rateLimiter } from "@/lib/rate-limiter";

export const runtime = "nodejs";

function getIp(req: NextRequest) {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  const xr = req.headers.get("x-real-ip");
  if (xr) return xr;
  return "unknown";
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  try {
    const ip = getIp(req);
    if (!rateLimiter(ip, 120, 60_000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
      }
    const { slug } = await ctx.params;
    const { databases } = getServerClients();
    const result = await databases.listDocuments(
      BLOGS_DB_ID,
      BLOGS_COLLECTION_ID,
      [Query.equal("slug", slug), Query.limit(1)]
    );
    const doc = (result as any).documents?.[0];
    if (!doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(doc);
  } catch (error) {
    console.error("Failed to get blog by slug:", error);
    return NextResponse.json({ error: "Failed to get blog" }, { status: 500 });
  }
}


