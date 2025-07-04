/**
 * @description Récupérer les informations d'un événement
 * @author Léo Zmoos, Dylan José Oliveira Ramos
 * @param id - L'identifiant de l'événement à récupérer
 * @param cookies - Les cookies de l'utilisateur
 * @param prisma - La base de données Prisma
 * @param secret - La clé secrète pour vérifier l'authentification
 * @param NextResponse - La réponse de Next.js
 * @returns Une réponse JSON contenant les informations de l'événement
 */
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import EventMapWrapper from "@/components/EventMapWrapper";
import EventActionsWrapper from "@/components/EventActionsWrapper";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

async function geocodeCity(city: string) {
  const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`, {
    headers: { "User-Agent": "securityplanner-app" },
  });

  const data = await res.json();
  if (!data || data.length === 0) return null;

  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon),
  };
}

export default async function EventDetailsPage({ params }: { params: { id: string } }) {
  const eventId = parseInt(params?.id ?? "", 10);
  if (isNaN(eventId)) return notFound();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return notFound();

  let userId: number;
  let canAccessCriticalEvents = false;

  try {
    const { payload } = await jwtVerify(token, secret);
    const user = await prisma.user.findUnique({
      where: { email: payload.email as string },
    });

    if (!user) return notFound();
    userId = user.id;
    canAccessCriticalEvents = user.canAccessCriticalEvents;
  } catch (err) {
    console.error("Erreur de vérification du token :", err);
    return notFound();
  }

  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) return notFound();

  // Restriction basée sur la criticité
  if (event.isCritical && !canAccessCriticalEvents) {
    console.warn("Accès refusé : événement critique non autorisé.");
    return notFound();
  }

  const schedule = await prisma.schedule.findFirst({
    where: {
      eventId,
      userId,
    },
  });

  const createdAtDate = event.createdAt ? new Date(event.createdAt) : null;
  const geo = await geocodeCity(event.city);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {event.name}
      </Typography>

      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Du {format(event.startDate, "dd/MM/yyyy")} au {format(event.endDate, "dd/MM/yyyy")}
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }} elevation={2}>
        <Typography variant="body1"><strong>Lieu :</strong> {event.location}, {event.city}</Typography>
        <Typography variant="body1"><strong>Description :</strong> {event.description || "—"}</Typography>
        <Typography variant="body1"><strong>Type :</strong> {event.eventType || "—"}</Typography>
        <Typography variant="body1"><strong>Contact :</strong> {event.contactName || "—"} - {event.contactPhone || "—"}</Typography>
        <Typography variant="body1"><strong>Instructions :</strong> {event.instructions || "—"}</Typography>
        <Typography variant="body1"><strong>Agents requis :</strong> {event.requiredAgents}</Typography>
        <Typography variant="body1"><strong>Critique ?</strong> {event.isCritical ? "Oui" : "Non"}</Typography>
        <Typography variant="body1">
          <strong>Créé le :</strong>{" "}
          {createdAtDate && !isNaN(createdAtDate.getTime())
            ? format(createdAtDate, "dd/MM/yyyy")
            : "Inconnu"}
        </Typography>
      </Paper>

      <EventActionsWrapper
        eventId={event.id}
        scheduleId={schedule?.id ?? null}
        status={schedule?.status ?? null}
        refusalReason={schedule?.refusalReason}
      />
      {geo && (
        <Box sx={{ mt: 4, height: 400 }}>
          <EventMapWrapper lat={geo.lat} lon={geo.lon} label={event.name} />
        </Box>
      )}
    </Box>
  );
}