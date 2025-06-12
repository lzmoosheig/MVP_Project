/**
 * POST /api/create-event/route
 */
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== 'Planner') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await req.json();

    const event = await prisma.event.create({
      data: {
        name: data.name,
        description: data.description || null,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        location: data.location || null,
        city: data.city || null,
        contactName: data.contactName || null,
        contactPhone: data.contactPhone || null,
        instructions: data.instructions || null,
        requiredAgents: data.requiredAgents ? parseInt(data.requiredAgents) : null,
        eventType: data.eventType || null,
        duration: data.duration ? parseInt(data.duration) : null,
        meetHour: data.meetHour ? new Date(data.meetHour) : null,
        isCritical: !!data.isCritical,
      },
    });

    return NextResponse.json({ message: 'Event created', event });

  } catch (err) {
    console.error('[CREATE EVENT ERROR]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}