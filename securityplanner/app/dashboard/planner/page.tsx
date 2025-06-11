// app/dashboard/planner/page.tsx (SERVER)
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";
import PlannerClient from "./PlannerClient"; 

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export default async function PlannerPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return <div>Non autorisé</div>;

  let userRole = "";
  try {
    const { payload } = await jwtVerify(token, secret);
    userRole = payload.role as string;
  } catch {
    return <div>Token invalide</div>;
  }

  if (userRole !== "Planner") {
    return <div>Accès restreint aux planificateurs</div>;
  }

  const events = await prisma.event.findMany({
    where: { startDate: { gte: new Date() } },
    include: { Schedules: true },
    orderBy: { startDate: "asc" },
  });

  return <PlannerClient events={JSON.parse(JSON.stringify(events))} />;
}