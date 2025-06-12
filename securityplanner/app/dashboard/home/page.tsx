/**
 * @description Récupérer les informations de l'utilisateur connecté
 * @author Léo Zmoos, Dylan José Oliveira Ramos
 * @param cookies - Les cookies de l'utilisateur
 * @param prisma - La base de données Prisma
 * @param NextResponse - La réponse de Next.js
 */
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import ClientHome from "./ClientHome";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export default async function Page() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) return redirect("/login");

  let email = "";
  let role = "";
  let userId: number = 0;
  let canAccessCriticalEvents = false;

  try {
    const { payload } = await jwtVerify(token, secret);
    email = payload.email as string;
    role = payload.role as string;
  } catch {
    return redirect("/login");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return redirect("/login");

  userId = user.id;
  canAccessCriticalEvents = user.canAccessCriticalEvents;

  // Redirection si ce n'est pas un agent
  if (role === "Planner") {
    redirect("/dashboard/planner");
  }

  // On récupère uniquement les events que l'agent n'a pas encore traité
  const events = await prisma.event.findMany({
    where: {
      startDate: { gte: new Date() },
      ...(canAccessCriticalEvents ? {} : { isCritical: false }),
      Schedules: {
        none: {
          userId: userId
        }
      }
    },
    orderBy: { startDate: "asc" },
  });

  return (
    <ClientHome user={user} role={role} events={events} />
  );
}