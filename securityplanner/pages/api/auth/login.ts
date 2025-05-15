import prisma from "@/lib/prisma";
import { SignJWT } from "jose";
import { serialize } from "cookie";
import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                role: true,
            },
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        const token = await new SignJWT({
            id: user.id,
            email: user.email,
            role: typeof user.role === "string" ? user.role : user.role?.name,
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("1h")
            .sign(secret);

        const cookie = serialize("token", token, {
            httpOnly: true,
            path: "/",
            secure: false,
            sameSite: "strict",
            maxAge: 3600,
        });

        res.setHeader("Set-Cookie", cookie);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Something went wrong." });
    }
}