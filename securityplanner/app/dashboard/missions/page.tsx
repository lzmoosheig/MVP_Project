// app/dashboard/missions/page.tsx
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import prisma from '@/lib/prisma';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import NavLink from '@/components/NavLink';

const secret = new TextEncoder().encode(process.env.SESSION_SECRET);

export default async function MissionsPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return <Typography>Utilisateur non authentifié.</Typography>;
  }

  let userId: number;
  try {
    const { payload } = await jwtVerify(token, secret);
    userId = payload.id as number;
  } catch {
    return <Typography>Token invalide.</Typography>;
  }

  const missions = await prisma.schedule.findMany({
    where: {
      userId,
      status: {
        in: ['ACCEPTED', 'REFUSED'],
      },
    },
    include: {
      event: true,
    },
    orderBy: {
      startDate: 'asc',
    },
  });

  if (missions.length === 0) {
    return <Typography>Aucune mission acceptée ou refusée.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Mes missions</Typography>

      <Grid
        container
        spacing={3}
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr',
            md: '1fr 1fr',
          },
        }}
      >
        {missions.map((mission) => (
          <Card
            key={mission.id}
            elevation={3}
            sx={{ m: 1 }}
            component={NavLink}
            href={`/dashboard/event/${mission.event.id}`}
          >
            <CardActionArea>
              <CardContent>
                <Typography variant="h6">{mission.event.name}</Typography>
                <Typography variant="body2">
                  Du {format(mission.startDate, 'dd/MM/yyyy')} au {format(mission.endDate, 'dd/MM/yyyy')}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: mission.status === 'ACCEPTED' ? 'green' : 'red',
                    mt: 1,
                  }}
                >
                  {mission.status === 'ACCEPTED' ? 'Mission acceptée' : 'Mission refusée'}
                </Typography>
                {mission.status === 'REFUSED' && mission.refusalReason && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Raison : {mission.refusalReason}
                  </Typography>
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </Box>
  );
}