/*
  Warnings:

  - You are about to drop the column `order` on the `todos` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."todos_order_idx";

-- AlterTable
ALTER TABLE "todos" DROP COLUMN "order";
