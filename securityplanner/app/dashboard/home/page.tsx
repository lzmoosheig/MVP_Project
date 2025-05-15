import React from "react";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import prisma from "@/lib/prisma";
import { format } from "date-fns";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export default async function Page() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  let email = "";
  let role = "";
  let userId = "";

  try {
    if (token) {
      const { payload } = await jwtVerify(token, secret);
      email = payload.email as string;
      role = payload.role as string;
    }
  } catch (err) {
    console.error("Erreur de vérification JWT :", err);
  }

  // Récupérer l'utilisateur
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return <Typography>Utilisateur introuvable.</Typography>;
  }

  userId = user.id;

  // Récupérer les événements liés à cet utilisateur (via Schedule)
  const schedules = await prisma.schedule.findMany({
    where: {
      userId,
      endDate: {
        gte: new Date(), // seulement les événements à venir
      },
    },
    include: {
      event: true,
    },
    orderBy: {
      startDate: "asc",
    },
  });

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Bonjour {user.firstName}, votre rôle : {role}
      </Typography>

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Vos événements à venir
      </Typography>

      {schedules.length === 0 ? (
        <Typography variant="body1">Aucun événement prévu.</Typography>
      ) : (
        <Grid container spacing={2}>
          {schedules.map((schedule) => (
            <Grid item xs={12} md={6} lg={4} key={schedule.id}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  {schedule.event.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Du {format(schedule.startDate, "dd/MM/yyyy")} au{" "}
                  {format(schedule.endDate, "dd/MM/yyyy")}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}