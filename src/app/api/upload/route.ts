import { NextRequest, NextResponse } from "next/server";

// Optional: keep this route dynamic if uploads are expected to be dynamic
// export const dynamic = "force-dynamic";

export async function POST(_req: NextRequest) {
  // ...implement upload logic later...
  return NextResponse.json({ error: "Not implemented" }, { status: 501 });
}

export async function GET() {
  // Basic health check
  return NextResponse.json({ status: "ok" });
}
