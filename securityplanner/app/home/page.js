import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default async function Page() {
    const events = await prisma.event.findMany()
    return (
        <Grid item xs={12}>
            <Typography component="h2" variant="h6" gutterBottom>
                {events.map((event) => (
                    <div key={event.id}>
                        {event.name}
                    </div>
                ))}
            </Typography>
        </Grid>
    );
}