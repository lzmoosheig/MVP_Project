// app/api/schedule/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import prisma from '@/lib/prisma';

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function POST(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let userId: number;
  try {
    const { payload } = await jwtVerify(token, secret);
    userId = Number(payload.id);
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }

  const body = await req.json();
  const { eventId } = body;

  if (!eventId || typeof eventId !== 'number') {
    return NextResponse.json({ error: 'Invalid or missing eventId' }, { status: 400 });
  }

  // vérifier que l'événement existe
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }

  // vérifier qu'il n'y a pas déjà une entrée Schedule pour cet utilisateur et cet événement
  const existing = await prisma.schedule.findFirst({
    where: { userId, eventId },
  });

  if (existing) {
    return NextResponse.json({ error: 'Schedule already exists' }, { status: 400 });
  }

  // créer une nouvelle entrée Schedule en statut ACCEPTED
  const newSchedule = await prisma.schedule.create({
    data: {
      userId,
      eventId,
      startDate: event.startDate,
      endDate: event.endDate,
      status: 'ACCEPTED',
      refusalReason: null,
    },
  });

  return NextResponse.json({ message: 'Schedule created', scheduleId: newSchedule.id }, { status: 201 });
}