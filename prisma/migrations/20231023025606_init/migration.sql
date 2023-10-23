/*
  Warnings:

  - You are about to alter the column `name` on the `Board` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(30)`.
  - You are about to alter the column `slug` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(30)` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "Board" ALTER COLUMN "name" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "slug" SET DATA TYPE VARCHAR(20);
