import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { payload } = await jwtVerify(token, secret);
    const userId = Number(payload.id);
    const role = payload.role;

    if (role !== 'Agent') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Mettre à jour tous les messages non lus de cet utilisateur
    await prisma.messageRecipient.updateMany({
      where: {
        userId,
        isRead: false
      },
      data: {
        isRead: true
      }
    });

    return NextResponse.json({ message: 'Tous les messages marqués comme lus.' });
  } catch (err) {
    console.error('[MARK-READ ERROR]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}