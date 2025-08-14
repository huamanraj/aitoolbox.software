import { NextRequest, NextResponse } from "next/server";
import { getServerClients, BLOGS_DB_ID, BLOGS_COLLECTION_ID } from "@/lib/appwrite";

export const runtime = "nodejs";

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


