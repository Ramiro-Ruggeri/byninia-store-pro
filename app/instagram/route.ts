// app/instagram/route.ts
import { NextResponse } from "next/server";

export function GET() {
  const handle = process.env.NEXT_PUBLIC_IG_HANDLE || "byninia";
  return NextResponse.redirect(`https://instagram.com/${handle}`, 302);
}
