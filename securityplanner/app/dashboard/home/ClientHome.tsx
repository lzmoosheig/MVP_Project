/**
 * @description Récupérer les informations de l'utilisateur connecté
 * @author Léo Zmoos
 * @param cookies - Les cookies de l'utilisateur
 * @param prisma - La base de données Prisma
 * @param NextResponse - La réponse de Next.js
 * @returns Une réponse JSON contenant les informations de l'utilisateur connecté
 * @throws Une erreur si l'utilisateur n'est pas connecté ou si
 */
'use client';

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import NavLink from "@/components/NavLink";
import { format } from "date-fns";

export default function ClientHome({ user, role, events }: any) {
  const [reminder, setReminder] = useState<string | null>(null);

  useEffect(() => {
    const checkReminder = () => {
      fetch('/api/reminders')
        .then(res => res.json())
        .then(data => {
          if (data.hasReminder) setReminder(data.message);
        });
    };

    checkReminder(); // Check at mount
    const interval = setInterval(checkReminder, 15000); // Poll every 15 sec

    return () => clearInterval(interval);
  }, []);

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
        <Grid container spacing={3} sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "1fr 1fr" }
        }}>
          {events.map((event: any) => (
            <Card key={event.id} elevation={3} sx={{ m: 1 }} component={NavLink} href={`/dashboard/event/${event.id}`}>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{event.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Du {format(new Date(event.startDate), "dd/MM/yyyy")} au {format(new Date(event.endDate), "dd/MM/yyyy")}
                  </Typography>
                  {event.isCritical && <Typography color="error">⚠ Événement critique</Typography>}
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      )}

      <Snackbar 
        open={!!reminder}
        autoHideDuration={4000}
        onClose={() => setReminder(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
        >
        <Alert 
            onClose={() => setReminder(null)}
            severity="warning"
            sx={{ width: '100%' }}
            variant="filled"  
        >
            {reminder}
        </Alert>
      </Snackbar>
    </Box>
  );
}