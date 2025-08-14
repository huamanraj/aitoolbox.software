import { NextRequest, NextResponse } from "next/server";
import { getServerClients, BLOGS_DB_ID, BLOGS_COLLECTION_ID } from "@/lib/appwrite";
import { Query } from "appwrite";
import { rateLimiter } from "@/lib/rate-limiter";

function getIp(req: NextRequest) {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  const xr = req.headers.get("x-real-ip");
  if (xr) return xr;
  return "unknown";
}

export async function GET(req: NextRequest) {
  try {
    const ip = getIp(req);
    if (!rateLimiter(ip, 120, 60_000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
    const limitParam = req.nextUrl.searchParams.get("limit");
    const offsetParam = req.nextUrl.searchParams.get("offset");
    const limit = Math.min(Math.max(parseInt(limitParam || "50", 10) || 50, 1), 100);
    const offset = Math.max(parseInt(offsetParam || "0", 10) || 0, 0);
    const { databases } = getServerClients();
    const list = await databases.listDocuments(
      BLOGS_DB_ID,
      BLOGS_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.limit(limit), Query.offset(offset)]
    );
    return NextResponse.json(list);
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}




