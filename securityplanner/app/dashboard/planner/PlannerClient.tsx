/** 
 * @author Léo Zmoos, Dylan José Oliveira Ramos
 * @param id - L'identifiant de l'événement à récupérer
 * @param prisma - La base de données Prisma
 * @param NextResponse - La réponse de Next.js
 */
'use client';

import React, { useState } from "react";
import { format } from "date-fns";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Link from "next/link";
import CircularAgentProgress from '@/components/CircularAgentProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export default function PlannerClient({ events }: { events: any[] }) {
  const [loadingRemind, setLoadingRemind] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean, message: string, severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean, eventId: number | null }>({ open: false, eventId: null });

  const handleRemind = async (eventId: number) => {
    setLoadingRemind(eventId);
    try {
      const res = await fetch('/api/planner/remind', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId })
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Erreur inconnue');
      }

      setSnackbar({ open: true, message: 'Rappel envoyé avec succès !', severity: 'success' });
    } catch (err: any) {
      console.error(err);
      setSnackbar({ open: true, message: "Erreur lors de l’envoi du rappel", severity: 'error' });
    } finally {
      setLoadingRemind(null);
    }
  };

  const confirmDelete = (eventId: number) => {
    setDeleteConfirm({ open: true, eventId });
  };

  const handleDelete = async () => {
    if (!deleteConfirm.eventId) return;
    try {
      const res = await fetch('/api/planner/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: deleteConfirm.eventId })
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Erreur inconnue');
      }

      setSnackbar({ open: true, message: 'Événement supprimé avec succès', severity: 'success' });
      window.location.reload();
    } catch (err: any) {
      console.error(err);
      setSnackbar({ open: true, message: "Erreur lors de la suppression", severity: 'error' });
    } finally {
      setDeleteConfirm({ open: false, eventId: null });
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4">📅 Événements à venir</Typography>
        <Link href="/dashboard/planner/create-event">
          <Button variant="contained" color="primary">
            ➕ Nouvel événement
          </Button>
        </Link>
      </Box>

      <Box sx={{
        mt: 4,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "1fr 1fr" },
        gap: 3,
      }}>
        {events.map((event) => {
          const total = event.requiredAgents ?? 0;
          const accepted = event.Schedules.filter((s: any) => s.status === "ACCEPTED").length;
          const pending = event.Schedules.filter((s: any) => s.status === "PENDING").length;
          const percentage = total === 0 ? 0 : (accepted / total) * 100;
          const progressColor = percentage >= 100 ? "success.main" : percentage >= 50 ? "warning.main" : "error.main";

          return (
            <Paper key={event.id} elevation={3} sx={{ p: 3, borderLeft: `8px solid ${progressColor}` }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <CircularAgentProgress accepted={accepted} total={total} />
                <Box>
                  <Typography variant="h6">{event.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    📍 {event.city} — {format(new Date(event.startDate), "dd/MM/yyyy")} ➝ {format(new Date(event.endDate), "dd/MM/yyyy")}
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    🧍 Requis : <strong>{total}</strong> | ✅ Acceptés : <strong>{accepted}</strong> | ⏳ En attente : <strong>{pending}</strong>
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                <Link href={`/dashboard/planner/assign/${event.id}`}>
                  <Button variant="outlined" size="small">Assigner</Button>
                </Link>

                <Button onClick={() => handleRemind(event.id)} variant="contained" color="warning" size="small" disabled={loadingRemind === event.id}>
                  🔔 {loadingRemind === event.id ? "Envoi..." : "Rappeler"}
                </Button>

                <Link href={`/dashboard/planner/message/${event.id}`}>
                  <Button variant="contained" color="info" size="small">✉️ Message</Button>
                </Link>

                <Button onClick={() => confirmDelete(event.id)} variant="outlined" color="error" size="small">
                  🗑 Supprimer
                </Button>
              </Box>
            </Paper>
          );
        })}
      </Box>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog open={deleteConfirm.open} onClose={() => setDeleteConfirm({ open: false, eventId: null })}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Voulez-vous vraiment supprimer cet événement ?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm({ open: false, eventId: null })}>Annuler</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Supprimer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}