import { NextResponse } from "next/server";
// import { updateSession } from "@/lib/supabase/middleware";

export async function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/", "/login"],
};
