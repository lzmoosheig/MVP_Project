-- CreateEnum
CREATE TYPE "ScheduleStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REFUSED');

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "refusalReason" TEXT,
ADD COLUMN     "status" "ScheduleStatus" NOT NULL DEFAULT 'PENDING';
