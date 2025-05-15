import React from "react";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import prisma from "@/lib/prisma";


const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export default async function Page() {
    // Lecture du cookie
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    let email = "";
    let role = "";

    try {
        if (token) {
            const { payload } = await jwtVerify(token, secret);
            email = payload.email as string;
            role = payload.role as string;
        }
    } catch (err) {
        console.error("Erreur de vérification JWT :", err);
    }

    const events = await prisma.event.findMany();

    return (
        <Grid item xs={12}>
            <Typography component="h2" variant="h6" gutterBottom>
                Bonjour {email}, votre rôle : {role}
            </Typography>
            {events.map((event) => (
                <div key={event.id}>
                    {event.name}
                </div>
            ))}
        </Grid>
    );
}