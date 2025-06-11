import { PrismaClient } from './generated/prisma';
const prisma = new PrismaClient()

async function main() {

  await prisma.schedule.deleteMany()
  await prisma.event.deleteMany()
  await prisma.user.deleteMany()
  await prisma.role.deleteMany()

  const planner = await prisma.role.create({ data: { name: 'Planner' } });
  const agent = await prisma.role.create({ data: { name: 'Agent' } });

  const alice = await prisma.user.create({
    data: {
      firstName: 'Alice',
      lastName: 'Smith',
      birthDate: new Date('1990-05-10'),
      address: '123 Main St',
      postalCode: 1234,
      city: 'Sion',
      phoneNumber: '0780000001',
      canAccessCriticalEvents: true,
      email: 'alice@example.com',
      password: '$2a$12$bOwKuHbkkdbAcLbVmX0EYOwY7SziBm4ONcz3q/KdIRS2kIxKMNE/K',
      roleId: planner.id,
    },
  });

  const bob = await prisma.user.create({
    data: {
      firstName: 'Bob',
      lastName: 'Johnson',
      birthDate: new Date('1985-08-20'),
      address: '456 Oak St',
      postalCode: 2345,
      city: 'Lausanne',
      phoneNumber: '0780000002',
      canAccessCriticalEvents: true,
      email: 'bob@example.com',
      password: '$2a$12$bOwKuHbkkdbAcLbVmX0EYOwY7SziBm4ONcz3q/KdIRS2kIxKMNE/K',
      roleId: agent.id,
    },
  });

  const carol = await prisma.user.create({
    data: {
      firstName: 'Carol',
      lastName: 'Lami',
      birthDate: new Date('1990-01-10'),
      address: '16 Mel St',
      postalCode: 1000,
      city: 'Lausanne',
      phoneNumber: '0760000001',
      canAccessCriticalEvents: false,
      email: 'carol@example.com',
      password: '$2a$12$bOwKuHbkkdbAcLbVmX0EYOwY7SziBm4ONcz3q/KdIRS2kIxKMNE/K',
      roleId: agent.id,
    },
  });

  const eventList = [
  {
    name: 'Match de football : FC Sion vs Lausanne Basket',
    startDate: new Date('2025-06-11'),
    endDate: new Date('2025-06-13'),
    location: 'Hallim Stadium',
    city: 'Sion',
    description: 'Eligendi adipisci laborum error porro aliquid saepe voluptatum. Fugit laboriosam fugiat inventore illum magnam.',
    contactName: 'Laura Curdy-Rossellat',
    contactPhone: '+41 (0)96 356 77 40',
    instructions: 'Error aspernatur beatae ullam laudantium placeat totam officiis ullam.',
    requiredAgents: 5,
    eventType: 'Salon professionnel',
    isCritical: false,
    meetHour: new Date('2025-06-11T09:00:00'),
    duration: 3
  },
  {
    name: "Exposition d'art moderne à Genève",
    startDate: new Date('2025-06-15'),
    endDate: new Date('2025-06-16'),
    location: 'Stade de Genève',
    city: 'Genève',
    description: 'Labore odit blanditiis veniam mollitia soluta. Alias cumque non totam maxime.',
    contactName: 'Corinne Droz',
    contactPhone: '+41 56 767 58 00',
    instructions: 'Et harum rerum nobis odit asperiores nam praesentium.',
    requiredAgents: 3,
    eventType: 'Salon professionnel',
    isCritical: false,
    meetHour: new Date('2025-06-15T09:00:00'),
    duration: 2
  },
  {
    name: 'Tournoi de basket : Lausanne Basket vs BSC Young Boys',
    startDate: new Date('2025-06-19'),
    endDate: new Date('2025-06-21'),
    location: 'Centre des Congrès de Lausanne',
    city: 'Lausanne',
    description: 'Excepturi laborum perferendis eligendi ea quos.',
    contactName: 'Michael Comment',
    contactPhone: '+41 (0)26 443 81 95',
    instructions: 'Nostrum tempore ea architecto sit fuga sit quo reprehenderit.',
    requiredAgents: 7,
    eventType: 'Cérémonie officielle',
    isCritical: false,
    meetHour: new Date('2025-06-19T10:00:00'),
    duration: 3
  },
  {
    name: "Salon de l'emploi à Lucerne",
    startDate: new Date('2025-06-28'),
    endDate: new Date('2025-06-30'),
    location: 'Hall Stadium Lucerne',
    city: 'Lucerne',
    description: 'Vitae laudantium facere. Voluptates quo aperiam officia.',
    contactName: 'Simone Uldry-Boichat',
    contactPhone: '+41 53 121 35 46',
    instructions: 'Doloribus sapiente placeat at incidunt aspernatur pariatur esse fugiat autem.',
    requiredAgents: 8,
    eventType: 'Cérémonie officielle',
    isCritical: true,
    meetHour: new Date('2025-06-28T09:00:00'),
    duration: 3
  },
  {
    name: 'Conférence sur la cybersécurité à Lausanne',
    startDate: new Date('2025-07-04'),
    endDate: new Date('2025-07-05'),
    location: 'Beaulieu Lausanne',
    city: 'Lausanne',
    description: 'Voluptates nulla temporibus error alias.',
    contactName: 'Chantal Vermeil',
    contactPhone: '0906 108 582',
    instructions: 'Recusandae rerum omnis laborum sed fugit tenetur voluptate reiciendis cum.',
    requiredAgents: 5,
    eventType: 'Conférence',
    isCritical: false,
    meetHour: new Date('2025-07-04T11:30:00'),
    duration: 2
  },
  {
    name: 'Festival de musique de Fribourg',
    startDate: new Date('2025-06-24'),
    endDate: new Date('2025-06-26'),
    location: 'Expo Center Fribourg',
    city: 'Fribourg',
    description: 'Magnam perspiciatis tenetur labore pariatur consequatur.',
    contactName: 'Kevin Bavaud',
    contactPhone: '0901 561 260',
    instructions: 'Sunt illum quidem alias facere mollitia ratione.',
    requiredAgents: 5,
    eventType: 'Marathon',
    isCritical: true,
    meetHour: new Date('2025-06-24T22:00:00'),
    duration: 3
  },
  {
    name: 'Match de hockey : ZSC Lions vs Servette',
    startDate: new Date('2025-08-02'),
    endDate: new Date('2025-08-04'),
    location: 'Expo Center Zurich',
    city: 'Zurich',
    description: 'Cumque quam at facilis quos reprehenderit.',
    contactName: 'Patrick Bujard',
    contactPhone: '050 438 95 80',
    instructions: 'Fugiat enim dolores fuga at rerum nam nostrum earum.',
    requiredAgents: 10,
    eventType: 'Exposition',
    isCritical: false,
    meetHour: new Date('2025-08-02T21:30:00'),
    duration: 3
  },
  {
    name: 'Match de hockey : FC Zurich vs HC Fribourg',
    startDate: new Date('2025-07-29'),
    endDate: new Date('2025-07-30'),
    location: 'Stade de Fribourg',
    city: 'Fribourg',
    description: 'Ducimus alias rerum hic nisi minus similique in.',
    contactName: 'Laetitia Masseron',
    contactPhone: '026 727 68 52',
    instructions: 'Occaecati natus dignissimos corrupti unde ab dolorum hic ipsam maxime harum.',
    requiredAgents: 4,
    eventType: 'Concert',
    isCritical: false,
    meetHour: new Date('2025-07-29T19:15:00'),
    duration: 2
  },
  {
    name: 'Match de hockey : BSC Young Boys vs Lausanne HC',
    startDate: new Date('2025-07-09'),
    endDate: new Date('2025-07-11'),
    location: 'Centre des Congrès de Berne',
    city: 'Berne',
    description: 'Cumque dolorum magnam eligendi suscipit aliquid quo.',
    contactName: 'Julie Beurret-Brandt',
    contactPhone: '+41 22 669 41 92',
    instructions: 'Voluptatum veniam aliquid eaque hic excepturi fugiat.',
    requiredAgents: 8,
    eventType: 'Manifestation',
    isCritical: true,
    meetHour: new Date('2025-07-09T09:20:00'),
    duration: 3
  },
]


  for (const event of eventList) {
    await prisma.event.create({
      data: {
        name: event.name,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
        city: event.city,
        location: event.location,
        description: event.description,
        contactName: event.contactName,
        contactPhone: event.contactPhone,
        instructions: event.instructions,
        requiredAgents: event.requiredAgents,
        eventType: event.eventType,
        isCritical: event.isCritical
      }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });