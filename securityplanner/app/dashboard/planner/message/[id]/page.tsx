/**
 * @author Léo Zmoos, Dylan José Oliveira Ramos
 * @param id - L'identifiant du message à récupérer
 * @param prisma - La base de données Prisma
 * @param NextResponse - La réponse de Next.js
 */
'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

export default function MessageComposePage() {
  const params = useParams();
  const router = useRouter();

  const { id } = useParams();
  const eventId = Number(id);

  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    if (!content.trim()) {
      setError("Le message ne peut pas être vide.");
      return;
    }

    if (!eventId || isNaN(eventId)) {
      setError("ID de l'événement invalide.");
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, content })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Erreur inconnue');
      }

      setSuccess(true);
      setContent('');
      setTimeout(() => router.push('/dashboard/planner'), 1500);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Impossible d'envoyer le message. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 6 }}>
      <Typography variant="h5" gutterBottom>
        ✉️ Envoyer un message aux agents de l'événement #{isNaN(eventId) ? '...' : eventId}
      </Typography>

      <TextField
        label="Message"
        placeholder="Saisissez votre message ici..."
        fullWidth
        multiline
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mt: 2 }}
      />

      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      {success && <Typography color="success.main" sx={{ mt: 2 }}>Message envoyé avec succès.</Typography>}

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={handleSend} disabled={loading}>
          {loading ? 'Envoi...' : 'Envoyer le message'}
        </Button>
      </Box>
    </Paper>
  );
}