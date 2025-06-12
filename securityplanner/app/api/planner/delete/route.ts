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
    if (role !== 'Planner') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { eventId } = await req.json();

    if (!eventId || isNaN(eventId)) {
      return NextResponse.json({ error: 'Invalid eventId' }, { status: 400 });
    }

    // Delete event (cascading deletes will be handled by Prisma relations if defined)
    await prisma.event.delete({
      where: { id: eventId }
    });

    return NextResponse.json({ message: 'Événement supprimé avec succès' });
  } catch (err) {
    console.error('[DELETE EVENT ERROR]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}