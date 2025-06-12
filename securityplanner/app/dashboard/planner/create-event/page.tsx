'use client';

import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Checkbox, FormControlLabel, Stack
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function CreateEventPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    city: '',
    contactName: '',
    contactPhone: '',
    instructions: '',
    requiredAgents: '',
    eventType: '',
    duration: '',
    meetHour: '',
    isCritical: false,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch('/api/planner/create-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/dashboard/planner');
    } else {
      alert('Erreur lors de la création');
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Créer un nouvel événement</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="Nom" name="name" value={form.name} onChange={handleChange} required />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} multiline rows={3} />
          <TextField type="date" label="Début" name="startDate" value={form.startDate} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
          <TextField type="date" label="Fin" name="endDate" value={form.endDate} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
          <TextField label="Lieu" name="location" value={form.location} onChange={handleChange} />
          <TextField label="Ville" name="city" value={form.city} onChange={handleChange} />
          <TextField label="Contact" name="contactName" value={form.contactName} onChange={handleChange} />
          <TextField label="Téléphone" name="contactPhone" value={form.contactPhone} onChange={handleChange} />
          <TextField label="Instructions" name="instructions" value={form.instructions} onChange={handleChange} />
          <TextField type="number" label="Agents requis" name="requiredAgents" value={form.requiredAgents} onChange={handleChange} />
          <TextField label="Type d'événement" name="eventType" value={form.eventType} onChange={handleChange} />
          <TextField type="number" label="Durée (en heures)" name="duration" value={form.duration} onChange={handleChange} />
          <TextField type="datetime-local" label="Heure de rencontre" name="meetHour" value={form.meetHour} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <FormControlLabel control={
            <Checkbox name="isCritical" checked={form.isCritical} onChange={handleChange} />
          } label="Événement critique" />
          <Button type="submit" variant="contained">Créer l'événement</Button>
        </Stack>
      </form>
    </Box>
  );
}