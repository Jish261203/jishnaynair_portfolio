/*
  Warnings:

  - You are about to drop the column `userId` on the `todos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "todos" DROP COLUMN "userId";

-- CreateIndex
CREATE INDEX "todos_order_idx" ON "todos"("order");
