/**
 * Route handler for the POST request to create a new reminder.
 */
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import prisma from '@/lib/prisma';

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { payload } = await jwtVerify(token, secret);
    const role = payload.role;
    const plannerId = Number(payload.id);

    if (role !== 'Planner') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { eventId } = await req.json();

    if (!eventId || typeof eventId !== 'number' || isNaN(eventId)) {
      return NextResponse.json({ error: 'Invalid eventId' }, { status: 400 });
    }

    // Cherche tous les schedules en attente qui n'ont pas encore reçu de rappel
    const schedules = await prisma.schedule.findMany({
      where: { eventId, status: 'PENDING', reminderSent: false },
      include: { user: true }
    });

    if (schedules.length === 0) {
      return NextResponse.json({ message: 'Aucun agent à rappeler' });
    }

    // Marquer les schedules comme rappelés
    await prisma.schedule.updateMany({
      where: { eventId, status: 'PENDING', reminderSent: false },
      data: { reminderSent: true },
    });

    // Log simple pour debug (non bloquant)
    schedules.forEach(schedule => {
      console.log(`Rappel envoyé à ${schedule.user.firstName} ${schedule.user.lastName} (${schedule.user.email})`);
    });

    return NextResponse.json({ message: `Rappel envoyé à ${schedules.length} agents.` });

  } catch (err) {
    console.error('[REMIND ERROR]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}