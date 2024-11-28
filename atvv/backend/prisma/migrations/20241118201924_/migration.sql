/*
  Warnings:

  - Made the column `genero` on table `cliente` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `cliente` MODIFY `genero` VARCHAR(191) NOT NULL;
