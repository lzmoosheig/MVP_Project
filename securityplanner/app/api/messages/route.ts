// app/api/messages/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { payload } = await jwtVerify(token, secret);
    const plannerId = Number(payload.id);
    const role = payload.role;

    if (role !== 'Planner') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { eventId, content } = await req.json();

    if (!eventId || !content || content.trim() === '') {
      return NextResponse.json({ error: 'Missing content or eventId' }, { status: 400 });
    }

    // Créer le message principal
    const message = await prisma.message.create({
      data: {
        content,
        senderId: plannerId,
        eventId,
      },
    });

    // Trouver les agents assignés à cet événement
    const schedules = await prisma.schedule.findMany({
      where: {
        eventId,
        status: 'ACCEPTED',
      },
      select: {
        userId: true,
      },
    });

    // Créer les entrées dans la table MessageRecipient
    const recipients = schedules.map(s => ({
      messageId: message.id,
      userId: s.userId,
    }));

    if (recipients.length > 0) {
      await prisma.messageRecipient.createMany({
        data: recipients,
      });
    }

    return NextResponse.json({ message: 'Message envoyé avec succès' });
  } catch (err) {
    console.error('[MESSAGE POST ERROR]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}