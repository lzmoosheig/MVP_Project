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

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return <Typography>Utilisateur introuvable.</Typography>;
  }

  userId = user.id;

  const schedules = await prisma.schedule.findMany({
    where: {
      userId,
      endDate: {
        gte: new Date(),
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
        <Typography>Aucun événement prévu.</Typography>
      ) : (
        <Grid
          container
          spacing={3}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr", // mobile
              sm: "1fr", // tablette portrait
              md: "1fr 1fr", // tablette paysage et +
            },
          }}
        >
          {schedules.map((schedule) => (
            <Card
              key={schedule.id}
              elevation={3}
              sx={{ m: 1 }}
              component={NavLink}
              href={`/dashboard/event/${schedule.event.id}`}
            >
              <CardActionArea>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {schedule.event.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Du {format(schedule.startDate, "dd/MM/yyyy")} au{" "}
                    {format(schedule.endDate, "dd/MM/yyyy")}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      )}
    </Box>
  );
}