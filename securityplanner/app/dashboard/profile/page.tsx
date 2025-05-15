import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export default async function ProfilePage() {
    const token = (await cookies()).get("token")?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, secret);
    const userId = payload.id as string;

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            firstName: true,
            lastName: true,
            birthDate: true,
            address: true,
            postalCode: true,
            city: true,
            phoneNumber: true,
            email: true,
        },
    });

    if (!user) {
        return <Typography>Utilisateur non trouvé.</Typography>;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Mon profil
            </Typography>

            <Paper elevation={3} sx={{ p: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Prénom"
                            value={user.firstName || ""}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Nom"
                            value={user.lastName || ""}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Date de naissance"
                            value={user.birthDate?.toLocaleDateString("fr-FR") || ""}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Téléphone"
                            value={user.phoneNumber || ""}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Adresse"
                            value={user.address || ""}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Code postal"
                            value={user.postalCode || ""}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <TextField
                            label="Ville"
                            value={user.city || ""}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            value={user.email || ""}
                            fullWidth
                            disabled
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}