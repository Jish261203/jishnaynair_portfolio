-- CreateEnum
CREATE TYPE "Role" AS ENUM ('GUEST', 'AUTHOR');

-- AlterTable
ALTER TABLE "guest_book" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'GUEST';
