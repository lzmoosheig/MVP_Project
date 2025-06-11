import React from "react";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import NavLink from "@/components/NavLink";
import { redirect } from "next/navigation";
import MailIcon from '@mui/icons-material/Mail'; // Ajout de l'icône

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export default async function Page() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  let email = "";
  let role = "";
  let canAccessCriticalEvents = false;

  try {
    if (token) {
      const { payload } = await jwtVerify(token, secret);
      email = payload.email as string;
      role = payload.role as string;
    }
  } catch (err) {
    console.error("Erreur de vérification JWT :", err);
    return <Typography>Erreur d'authentification</Typography>;
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return <Typography>Utilisateur introuvable.</Typography>;

  canAccessCriticalEvents = user.canAccessCriticalEvents;

  // Redirection selon le rôle
  if (role === "Planner") {
    redirect("/dashboard/planner");
  }

  // Sinon (rôle agent), on affiche les événements disponibles
  const events = await prisma.event.findMany({
    where: {
      startDate: { gte: new Date() },
      ...(canAccessCriticalEvents ? {} : { isCritical: false }),
    },
    orderBy: { startDate: "asc" },
  });

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Bonjour {user.firstName}, votre rôle : {role}
      </Typography>
      
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Événements disponibles
      </Typography>

      {events.length === 0 ? (
        <Typography>Aucun événement disponible.</Typography>
      ) : (
        <Grid
          container
          spacing={3}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr",
              md: "1fr 1fr",
            },
          }}
        >
          {events.map((event) => (
            <Card
              key={event.id}
              elevation={3}
              sx={{ m: 1 }}
              component={NavLink}
              href={`/dashboard/event/${event.id}`}
            >
              <CardActionArea>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {event.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Du {format(event.startDate, "dd/MM/yyyy")} au{" "}
                    {format(event.endDate, "dd/MM/yyyy")}
                  </Typography>
                  {event.isCritical && (
                    <Typography color="error">⚠ Événement critique</Typography>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      )}
    </Box>
  );
}