/**
 * Route handler for the PATCH request to update a reminder
 */
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import prisma from '@/lib/prisma';

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const scheduleId = parseInt(params.id, 10);
  if (isNaN(scheduleId)) {
    return NextResponse.json({ error: 'Invalid schedule ID' }, { status: 400 });
  }

  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let userId: number;
  try {
    const { payload } = await jwtVerify(token, secret);
    userId = Number(payload.id);
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }

  const body = await req.json();
  const { status, reason } = body;

  if (!['ACCEPTED', 'REFUSED'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  try {
    const schedule = await prisma.schedule.findUnique({
      where: { id: scheduleId },
    });

    if (!schedule || schedule.userId !== userId) {
      return NextResponse.json({ error: 'Not authorized for this schedule' }, { status: 403 });
    }

    await prisma.schedule.update({
      where: { id: scheduleId },
      data: {
        status, // ACCEPTED ou REFUSED
        refusalReason: status === 'REFUSED' ? reason : null,
        reminderSent: false 
      },
    });

    return NextResponse.json({ message: 'Status updated' }, { status: 200 });

  } catch (err) {
    console.error('Schedule update failed:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}