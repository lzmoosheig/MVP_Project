import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookie = serialize("token", "", {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: true,
        maxAge: 0,
    });

    res.setHeader("Set-Cookie", cookie);
    res.status(200).json({ success: true });
}