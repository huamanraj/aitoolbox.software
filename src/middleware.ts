import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Protect /admin by requiring the Appwrite auth cookie session.
  // In this simple example, we only redirect to /admin/login client-side.
  // Optionally, you can implement server cookie validation here if exposing JWT.
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin"],
};


