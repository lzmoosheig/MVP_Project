// app/api/planner/assign/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import prisma from '@/lib/prisma';

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { payload } = await jwtVerify(token, secret);
    const plannerId = Number(payload.id);
    const plannerRole = payload.role;

    if (plannerRole !== 'Planner') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { eventId, userId } = await req.json();

    if (!eventId || !userId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Créer une assignation PENDING
    await prisma.schedule.create({
      data: {
        userId,
        eventId,
        startDate: new Date(), 
        endDate: new Date(),   
        status: 'PENDING',
      },
    });

    return NextResponse.json({ message: 'Agent assigné avec succès' });
  } catch (err) {
    console.error('[ASSIGN POST ERROR]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}