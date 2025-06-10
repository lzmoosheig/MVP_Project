// app/api/planner/candidates/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import prisma from '@/lib/prisma';

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = parseInt(searchParams.get('eventId') || '', 10);
    if (isNaN(eventId)) {
      return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 });
    }

    const token = cookies().get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, secret);
    const plannerId = payload.id as number;

    // Tous les utilisateurs sauf le planificateur actuel et ceux déjà assignés
    const assignedIds = await prisma.schedule.findMany({
      where: { eventId },
      select: { userId: true },
    });

    const excludedIds = assignedIds.map(s => s.userId);

    const agents = await prisma.user.findMany({
      where: {
        id: { notIn: [...excludedIds, plannerId] },
        role: { name: 'Agent' },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
      },
    });

    const enriched = agents.map(agent => ({ ...agent, isAvailable: true }));

    return NextResponse.json(enriched);
  } catch (err) {
    console.error('Failed to fetch agent candidates:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}