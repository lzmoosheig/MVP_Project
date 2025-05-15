-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "city" TEXT,
ADD COLUMN     "contactName" TEXT,
ADD COLUMN     "contactPhone" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "eventType" TEXT,
ADD COLUMN     "instructions" TEXT,
ADD COLUMN     "isCritical" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "requiredAgents" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
