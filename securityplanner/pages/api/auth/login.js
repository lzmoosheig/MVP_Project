import prisma from "@/lib/prisma"
import {SignJWT} from "jose";
import {serialize} from "cookie";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export default async function handler(req, res) {
    try {
        const {email, password} = req.body
        // Get user from the database
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })

        if (!user) {
            return res.status(401).json({error: 'Invalid credentials.'})
        }

        // Check if the password is correct
        if (user.password !== password) {
            return res.status(401).json({error: 'Invalid credentials.'})
        }

        // Sign a JWT
        const token = await new SignJWT({
            id: user.id,
            email: user.email,
        })
            .setProtectedHeader({alg: "HS256"})
            .setIssuedAt()
            .setExpirationTime("1h")
            .sign(secret);

        // Store token in a cookie
        const cookie = serialize("token", token, {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600,
        });

        res.setHeader("Set-Cookie", cookie);

        res.status(200).json({success: true})
    } catch (error) {
        if (error.type === 'CredentialsSignin') {
            res.status(401).json({error: 'Invalid credentials.'})
        } else {
            res.status(500).json({error: 'Something went wrong.'})
        }
    }
}