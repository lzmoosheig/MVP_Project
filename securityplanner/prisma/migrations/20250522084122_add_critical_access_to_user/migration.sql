-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "meetHour" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "canAccessCriticalEvents" BOOLEAN NOT NULL DEFAULT false;
