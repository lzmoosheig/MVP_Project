import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import prisma from '@/lib/prisma';

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { payload } = await jwtVerify(token, secret);
    const userId = Number(payload.id);

    const pendingReminder = await prisma.schedule.findFirst({
      where: {
        userId,
        status: 'PENDING',
        reminderSent: true
      },
      include: { event: true },
      orderBy: { createdAt: 'asc' } // toujours le plus ancien d'abord (évite d'en afficher plusieurs d'affilée)
    });

    // ✅ si plus aucun schedule matching, on désactive la notif
    if (!pendingReminder) {
      return NextResponse.json({ hasReminder: false });
    }

    return NextResponse.json({
      hasReminder: true,
      message: `🔔 Vous êtes rappelé pour l’événement : ${pendingReminder.event.name}`
    });

  } catch (err) {
    console.error('[REMINDER CHECK ERROR]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}