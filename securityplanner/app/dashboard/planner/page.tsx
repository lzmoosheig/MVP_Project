import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Link from "next/link";
import CircularAgentProgress from '@/components/CircularAgentProgress';

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export default async function PlannerPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return <Typography>Non autorisé</Typography>;

  let userRole = "";
  try {
    const { payload } = await jwtVerify(token, secret);
    userRole = payload.role as string;
  } catch {
    return <Typography>Token invalide</Typography>;
  }

  if (userRole !== "Planner") {
    return <Typography>Accès restreint aux planificateurs</Typography>;
  }

  const events = await prisma.event.findMany({
    where: { startDate: { gte: new Date() } },
    include: { Schedules: true },
    orderBy: { startDate: "asc" },
  });

  return (
    <Box>
    <Typography variant="h4" gutterBottom>
        📅 Événements à venir
    </Typography>

    <Box
        sx={{
        mt: 4,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "1fr 1fr" },
        gap: 3,
        }}
    >
        {events.map((event) => {
        const total = event.requiredAgents ?? 0;
        const accepted = event.Schedules.filter(s => s.status === "ACCEPTED").length;
        const pending = event.Schedules.filter(s => s.status === "PENDING").length;
        const percentage = total === 0 ? 0 : (accepted / total) * 100;

        const progressColor =
            percentage >= 100 ? "success.main" :
            percentage >= 50 ? "warning.main" :
            "error.main";

        return (
            <Paper
            key={event.id}
            elevation={3}
            sx={{
                p: 3,
                borderLeft: `8px solid ${progressColor}`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
            >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <CircularAgentProgress accepted={accepted} total={total} />

                <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>{event.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                    📍 {event.city} — {format(event.startDate, "dd/MM/yyyy")} ➝ {format(event.endDate, "dd/MM/yyyy")}
                </Typography>
                <Typography sx={{ mt: 1 }}>
                    🧍 Requis : <strong>{total}</strong> &nbsp;|&nbsp;
                    ✅ Acceptés : <strong>{accepted}</strong> &nbsp;|&nbsp;
                    ⏳ En attente : <strong>{pending}</strong>
                </Typography>
                </Box>
            </Box>

            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                <Link href={`/dashboard/planner/assign/${event.id}`}>
                <Button variant="outlined" color="primary" size="small">
                    Assigner un agent
                </Button>
                </Link>

                <form action={`/api/planner/remind`} method="POST">
                <input type="hidden" name="eventId" value={event.id} />
                <Button type="submit" variant="contained" color="warning" size="small">
                    🔔 Rappeler les agents
                </Button>
                </form>
                <Link href={`/dashboard/planner/message/${event.id}`}>
                <Button variant="contained" color="info" size="small">
                    ✉️ Message aux agents
                </Button>
                </Link>
            </Box>
            </Paper>
        );
        })}
    </Box>
    </Box>
  );
}