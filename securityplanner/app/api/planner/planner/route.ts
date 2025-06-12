/**
 * GET /api/planner/candidates/route
 */
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { payload } = await jwtVerify(token, secret);
    const plannerRole = payload.role;

    if (plannerRole !== 'Planner') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { eventId } = await req.json();

    if (!eventId) {
      return NextResponse.json({ error: 'Missing eventId' }, { status: 400 });
    }

    // Récupérer les agents encore en PENDING pour cet événement
    const pendingAgents = await prisma.schedule.findMany({
      where: {
        eventId,
        status: 'PENDING'
      },
      include: {
        user: true
      }
    });

    pendingAgents.forEach(agent => {
      console.log(`Envoi d'un rappel à ${agent.user.firstName} (${agent.user.email})`);
    });

    return NextResponse.json({ message: `${pendingAgents.length} rappels envoyés.` });
  } catch (err) {
    console.error('[REMIND ERROR]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}