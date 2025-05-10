import {PrismaClient, Prisma} from './generated/prisma'
import {withAccelerate} from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

async function main() {
    // Seed Roles
    const planner = await prisma.role.create({data: {name: 'Planner'}});
    const agent = await prisma.role.create({data: {name: 'Agent'}});

    // Seed Users
    const alice = await prisma.user.create({
        data: {
            firstName: 'Alice',
            lastName: 'Smith',
            birthDate: new Date('1990-05-10'),
            address: '123 Main St',
            postalCode: 1234,
            city: 'Springfield',
            phoneNumber: '1234567890',
            email: 'alice@example.com',
            password: 'password123',
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
            city: 'Shelbyville',
            phoneNumber: '0987654321',
            email: 'bob@example.com',
            password: 'securepass',
            roleId: agent.id,
        },
    });

    const carol = await prisma.user.create({
        data: {
            firstName: 'Carol',
            lastName: 'Davis',
            birthDate: new Date('1992-03-15'),
            address: '789 Pine St',
            postalCode: 3456,
            city: 'Ogdenville',
            phoneNumber: '1122334455',
            email: 'carol@example.com',
            password: 'letmein',
            roleId: agent.id,
        },
    });

    // Seed Events
    const techConference = await prisma.event.create({
        data: {
            name: 'Tech Conference',
            startDate: new Date('2025-06-01'),
            endDate: new Date('2025-06-03'),
        },
    });

    const artExpo = await prisma.event.create({
        data: {
            name: 'Art Expo',
            startDate: new Date('2025-07-15'),
            endDate: new Date('2025-07-17'),
        },
    });

    const musicFestival = await prisma.event.create({
        data: {
            name: 'Music Festival',
            startDate: new Date('2025-08-20'),
            endDate: new Date('2025-08-22'),
        },
    });

    // Seed Schedules
    await prisma.schedule.create({
        data: {
            startDate: new Date('2025-06-01'),
            endDate: new Date('2025-06-03'),
            userId: alice.id,
            eventId: techConference.id,
        },
    });

    await prisma.schedule.create({
        data: {
            startDate: new Date('2025-07-15'),
            endDate: new Date('2025-07-17'),
            userId: bob.id,
            eventId: artExpo.id,
        },
    });

    await prisma.schedule.create({
        data: {
            startDate: new Date('2025-08-20'),
            endDate: new Date('2025-08-22'),
            userId: carol.id,
            eventId: musicFestival.id,
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });