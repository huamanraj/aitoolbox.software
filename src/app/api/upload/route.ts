import { NextRequest, NextResponse } from "next/server";
import { BLOG_COVERS_BUCKET_ID, getServerClients } from "@/lib/appwrite";

export async function POST(req: NextRequest) {
  const { storage } = getServerClients();
  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "file required" }, { status: 400 });
  const created = await storage.createFile(BLOG_COVERS_BUCKET_ID, "unique()" as any, file as any);
  return NextResponse.json(created, { status: 201 });
}


