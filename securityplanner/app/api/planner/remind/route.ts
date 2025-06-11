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

    if (!eventId || isNaN(eventId)) {
      return NextResponse.json({ error: 'Invalid eventId' }, { status: 400 });
    }

    const schedules = await prisma.schedule.findMany({
      where: { eventId, status: 'PENDING' },
      include: { user: true }
    });

    if (schedules.length === 0) {
      return NextResponse.json({ message: 'Aucun agent à rappeler' });
    }

    await prisma.schedule.updateMany({
      where: { eventId, status: 'PENDING', reminderSent: false },
      data: { reminderSent: true },
    });

    schedules.forEach(schedule => {
      console.log(`🔔 Rappel envoyé à ${schedule.user.firstName} ${schedule.user.lastName} (${schedule.user.email})`);
    });

    return NextResponse.json({ message: 'Rappel envoyé à tous les agents en attente' });

  } catch (err) {
    console.error('[REMIND ERROR]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}