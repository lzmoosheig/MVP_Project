import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import prisma from '@/lib/prisma';

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, secret);
    const userId = payload.id as number;

    const { eventId, status, reason } = await req.json();

    if (!['ACCEPTED', 'REFUSED'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const newSchedule = await prisma.schedule.create({
      data: {
        eventId,
        userId,
        status,
        refusalReason: status === 'REFUSED' ? reason : null,
        startDate: event.startDate,
        endDate: event.endDate,
      },
    });

    return NextResponse.json({ message: 'Schedule created', id: newSchedule.id }, { status: 201 });

  } catch (err) {
    console.error('[POST /api/schedule] ❌ ERREUR :', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}