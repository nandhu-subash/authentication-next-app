import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req: any) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  })

  console.log("TOKEN:", token) // debug

  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"]
}