import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import prisma from "@/lib/prisma";

export default async function Home() {
    const users = await prisma.user.findMany()
    return (
        <Grid item xs={12}>
            <Typography component="h2" variant="h6" gutterBottom>
                {users.map((user) => (
                    <div key={user.id}>
                        {user.firstName} - {user.email}
                    </div>
                ))}
            </Typography>
        </Grid>
    );
}