// middleware.ts
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function middleware(req) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    try {
        await jwtVerify(token, secret);
    } catch {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/home"],
};
