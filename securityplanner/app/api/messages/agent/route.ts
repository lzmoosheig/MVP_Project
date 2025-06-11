import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { payload } = await jwtVerify(token, secret);
    const userId = Number(payload.id);
    const role = payload.role;

    if (role !== 'Agent') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const messageRecipients = await prisma.messageRecipient.findMany({
      where: { userId },
      include: {
        message: {
          include: {
            event: true,
            sender: true
          }
        }
      },
      orderBy: {
        message: { createdAt: 'desc' }
      }
    });

    // Regrouper les messages par événement
    const grouped: Record<number, {
      event: {
        id: number;
        name: string;
        city: string;
        startDate: Date;
        endDate: Date;
      };
      messages: {
        id: number;
        content: string;
        sender: string;
        createdAt: Date;
      }[];
    }> = {};

    for (const item of messageRecipients) {
      const event = item.message.event;
      const eventId = event.id;

      if (!grouped[eventId]) {
        grouped[eventId] = {
          event: {
            id: event.id,
            name: event.name,
            city: event.city ?? '',
            startDate: event.startDate,
            endDate: event.endDate
          },
          messages: []
        };
      }

      grouped[eventId].messages.push({
        id: item.message.id,
        content: item.message.content,
        sender: `${item.message.sender.firstName} ${item.message.sender.lastName}`,
        createdAt: item.message.createdAt
      });
    }

    return NextResponse.json(Object.values(grouped));
  } catch (err) {
    console.error('[MESSAGES FETCH ERROR]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}