// app/wa/route.ts
import { NextResponse } from "next/server";

export function GET(request: Request) {
  const phone = process.env.NEXT_PUBLIC_WA_PHONE || "5493874126730";
  const url = new URL(request.url);
  const text = url.searchParams.get("text") || "Hola! Quiero info 👋";

  return NextResponse.redirect(
    `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
    302
  );
}
