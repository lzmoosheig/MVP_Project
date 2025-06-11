// app/page.tsx
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { redirect } from 'next/navigation';

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export default async function HomePage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return redirect('/login');
  }

  let payload;

  try {
    ({ payload } = await jwtVerify(token, secret));
  } catch (err) {
    return redirect('/login');
  }

  const role = payload.role as string;

  if (role === 'Planner') {
    return redirect('/dashboard/planner');
  } else if (role === 'Agent') {
    return redirect('/dashboard/home');
  } else {
    return redirect('/login');
  }
}