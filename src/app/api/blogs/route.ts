import { NextRequest, NextResponse } from "next/server";
import { getServerClients, BLOGS_DB_ID, BLOGS_COLLECTION_ID } from "@/lib/appwrite";

export async function GET() {
  try {
    const { databases } = getServerClients();
    const list = await databases.listDocuments(BLOGS_DB_ID, BLOGS_COLLECTION_ID);
    return NextResponse.json(list);
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { databases } = getServerClients();
    const created = await databases.createDocument(BLOGS_DB_ID, BLOGS_COLLECTION_ID, "unique()" as any, body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error('Failed to create blog:', error);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}


