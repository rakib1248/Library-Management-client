/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // ১. যদি টোকেন থাকে, তবে ব্যাকএন্ড থেকে সেশন চেক করা
  if (token) {
    try {
      const decoded: any = jwtDecode(token);
    //   const sessionId = decoded.sessionId; // আপনার টোকেন স্ট্রাকচার অনুযায়ী
    //     console.log(decoded)
    //   // ব্যাকএন্ডে সেশন ভ্যালিডেশন রিকোয়েস্ট
    //   const data = await fetch(
    //     `${process.env.NEXT_PUBLIC_API_URL}/auth/my-session/${sessionId}`,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Cookie: `accessToken=${token}`,
    //       },
    //     },
    //   );
    //     const response = data.json
       

    //   // ২. যদি ব্যাকএন্ড বলে সেশন ইনভ্যালিড (Unauthorized)
    //   if (!response.ok) {
    //     const nextResponse = NextResponse.redirect(
    //       new URL("/login", request.url),
    //     );
    //     nextResponse.cookies.delete("accessToken"); // টোকেন ডিলিট করে দাও
    //     return nextResponse;
    //   }

      // ৩. সেশন ভ্যালিড হলে এবং ইউজার লগইন/রেজিস্টার পেজে যেতে চাইলে ড্যাশবোর্ডে পাঠান
      const authRoutes = ["/login", "/register"];
      if (authRoutes.some((route) => pathname.startsWith(route))) {
        const role = decoded.role;
        const redirectUrl = role === "SELLER" ? "/dashboard/seller" : "/";
        return NextResponse.redirect(new URL(redirectUrl, request.url));
      }
    } catch (error) {
      // টোকেন ডিকোড বা নেটওয়ার্ক এরর হলে টোকেন মুছে দিয়ে লগইনে পাঠান
      const nextResponse = NextResponse.redirect(
        new URL("/login", request.url),
      );
      nextResponse.cookies.delete("accessToken");
      return nextResponse;
    }
  }

  // ৪. যদি টোকেন না থাকে এবং ইউজার প্রাইভেট রুটে যেতে চায়
  const privateRoutes = ["/dashboard"];
  if (!token && privateRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};
