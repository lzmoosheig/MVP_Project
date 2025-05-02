import React from "react";
import Layout from '../components/layout'
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Home() {
    return (
        <Grid item xs={12}>
            <Typography component="h2" variant="h6" gutterBottom>
                Home page !
            </Typography>
        </Grid>
    );
}

Home.getLayout = function getLayout(home) {
    return (
        <Layout>{home}</Layout>
    )
}