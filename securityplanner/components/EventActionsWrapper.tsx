'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

interface Props {
  eventId: number;
  scheduleId: number | null;
  status: 'PENDING' | 'ACCEPTED' | 'REFUSED' | null;
  refusalReason?: string | null;
}

export default function EventActionsWrapper({
  eventId,
  scheduleId,
  status,
  refusalReason,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    if (loading) return;
    setLoading(true);

    const endpoint = scheduleId
      ? `/api/schedule/${scheduleId}/response`
      : `/api/schedule`;

    const method = scheduleId ? 'PATCH' : 'POST';
    const body = scheduleId
      ? { status: 'ACCEPTED' }
      : { eventId, status: 'ACCEPTED' };

    await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    router.refresh();
  };

  const handleReject = async () => {
    if (loading) return;
    setLoading(true);

    const endpoint = scheduleId
      ? `/api/schedule/${scheduleId}/response`
      : `/api/schedule`;

    const method = scheduleId ? 'PATCH' : 'POST';
    const body = scheduleId
      ? { status: 'REFUSED', reason }
      : { eventId, status: 'REFUSED', reason };

    await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    setOpen(false);
    router.refresh();
  };

  if (status === 'ACCEPTED') {
    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" color="success.main">Mission acceptée ✅</Typography>
      </Box>
    );
  }

  if (status === 'REFUSED') {
    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" color="error.main">Mission refusée ❌</Typography>
        {refusalReason && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Raison : {refusalReason}
          </Typography>
        )}
      </Box>
    );
  }

  // Si aucune décision encore prise
  return (
    <Box sx={{ mt: 3 }}>
      <Button
        variant="contained"
        color="success"
        onClick={handleAccept}
        disabled={loading}
        sx={{ mr: 2 }}
      >
        J'accepte
      </Button>

      <Button
        variant="outlined"
        color="error"
        onClick={() => setOpen(true)}
        disabled={loading}
      >
        Je refuse
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Raison du refus</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            multiline
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            label="Veuillez expliquer la raison"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button onClick={handleReject} color="error" variant="contained">
            Confirmer le refus
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}