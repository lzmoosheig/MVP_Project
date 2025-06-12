/**
 * @description Récupérer les messages d'un utilisateur
 * @author Léo Zmoos
 * @param userId - L'identifiant de l'utilisateur
 * @param prisma - La base de données Prisma
 * @param NextResponse - La réponse de Next.js
 */
'use client';

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { format } from 'date-fns';

interface Message {
  id: number;
  content: string;
  sender: string;
  createdAt: string;
}

interface Event {
  id: number;
  name: string;
  city: string;
  startDate: string;
  endDate: string;
}

interface EventGroup {
  event: Event;
  messages: Message[];
}

export default function AgentMessagesPage() {
  const [data, setData] = useState<EventGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch('/api/messages/agent')
    .then(res => res.json())
    .then(setData)
    .finally(() => setLoading(false));

    // Marquer comme lu à la visite de la page
    fetch('/api/messages/mark-read', { method: 'POST' }).catch(console.error);
  }, []);

  if (loading) return <CircularProgress />;

  if (!data || data.length === 0) {
    return <Typography>Aucun message reçu.</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>📨 Mes messages</Typography>

      <Grid container spacing={3}>
        {data.map((group) => (
          <Grid item xs={12} md={6} key={group.event.id}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                {group.event.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                📍 {group.event.city} — du {format(new Date(group.event.startDate), "dd/MM/yyyy")} au {format(new Date(group.event.endDate), "dd/MM/yyyy")}
              </Typography>

              <Divider sx={{ my: 2 }} />

              {group.messages.map((msg) => (
                <Box key={msg.id} sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {msg.sender} — {format(new Date(msg.createdAt), "dd/MM/yyyy HH:mm")}
                  </Typography>
                  <Typography variant="body1">{msg.content}</Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}