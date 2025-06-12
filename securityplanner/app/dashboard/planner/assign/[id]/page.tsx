/**
 * @author Léo Zmoos, Dylan José Oliveira Ramos
 * @param id - L'identifiant de l'événement
 * @param prisma - La base de données Prisma
 * @param NextResponse - La réponse de Next.js
 * @returns Un composant pour afficher les informations de l'événement
 */
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

interface Agent {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isAvailable: boolean;
}

export default function AssignPage() {
  const { id } = useParams();
  const eventId = parseInt(id as string, 10);

  const [loading, setLoading] = useState(true);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [assigning, setAssigning] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const res = await fetch(`/api/planner/candidates?eventId=${eventId}`);
        if (!res.ok) throw new Error('Erreur de chargement des agents');
        const data = await res.json();
        setAgents(data);
      } catch (err) {
        console.error(err);
        setError('Impossible de charger la liste des agents.');
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(eventId)) fetchAgents();
    else setError('ID d’événement invalide.');
  }, [eventId]);

  const handleAssign = async (agentId: number) => {
    setAssigning(agentId);
    try {
      const res = await fetch('/api/planner/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, userId: agentId })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.error || 'Échec de l’assignation');
      }

      alert('Agent assigné avec succès');
      window.location.href = '/dashboard/planner';

    } catch (err) {
      console.error('[ASSIGN ERROR]', err);
      alert('Erreur lors de l’assignation de l’agent.');
    } finally {
      setAssigning(null);
    }
  };

  if (loading) return <Box sx={{ mt: 5 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Assigner un agent</Typography>

      {agents.length === 0 && (
        <Typography>Aucun agent disponible pour cet événement.</Typography>
      )}

      <Grid container spacing={3}>
        {agents.map((agent) => (
          <Grid item xs={12} md={6} key={agent.id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">{agent.firstName} {agent.lastName}</Typography>
              <Typography>{agent.email}</Typography>
              <Typography>{agent.phoneNumber}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAssign(agent.id)}
                disabled={!agent.isAvailable || assigning === agent.id}
                sx={{ mt: 1 }}
              >
                {assigning === agent.id ? 'Assignation...' : 'Assigner'}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}