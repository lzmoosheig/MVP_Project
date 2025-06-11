import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ count: 0 });

    const { payload } = await jwtVerify(token, secret);
    const userId = Number(payload.id);
    const role = payload.role;

    if (role !== 'Agent') return NextResponse.json({ count: 0 });

    const unreadCount = await prisma.messageRecipient.count({
      where: { userId, isRead: false }
    });

    return NextResponse.json({ count: unreadCount });
  } catch (err) {
    console.error('[UNREAD MESSAGES ERROR]', err);
    return NextResponse.json({ count: 0 });
  }
}