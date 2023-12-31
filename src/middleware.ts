import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL("/auth", req.nextUrl));
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/quiz-me",
    "/create-and-share",
    "/my-quizzes",
    "/play/:path*",
    "/statistics/:path*",
    "/quiz-info/:path*",
  ],
};
