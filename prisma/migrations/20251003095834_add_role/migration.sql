/*
  Warnings:

  - You are about to drop the column `role` on the `guest_book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "guest_book" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'GUEST';
